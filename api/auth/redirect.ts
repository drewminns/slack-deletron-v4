import { NowRequest, NowResponse } from '@vercel/node'
import url from 'url'
import fetch from 'cross-fetch'
import Sentry from '@sentry/node'

import { issueJWT, captureException, captureMessage } from '../../shared'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REDIRECT_ROOT } = process.env || ''

const generateSlackOAuthURI = (code: string): string => {
  return url.format({
    pathname: 'https://slack.com/api/oauth.v2.access',
    query: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    },
  })
}

export default async (req: NowRequest, res: NowResponse) => {
  const slack_code = req.query.code as string
  const uri: string = generateSlackOAuthURI(slack_code)

  if (req.query.error) {
    const redirectPath = url.format({
      pathname: REDIRECT_ROOT,
      query: {
        error: req.query.error,
      },
    })
    res.writeHead(302, { Location: redirectPath })
    res.end()
  } else {
    try {
      const slackOAuthFetch = await fetch(uri)
      const slackOAuthFetchResponse = await slackOAuthFetch.json()
      if (!slackOAuthFetchResponse.ok) {
        captureMessage(`api/redirect.ts :: slackOAuthFetchResponse not ok - ${slackOAuthFetchResponse}`)
        res.status(401).json({ ok: false, error: slackOAuthFetchResponse.error })
        return
      }
      const token = issueJWT(slackOAuthFetchResponse.authed_user.access_token, slackOAuthFetchResponse.authed_user.id)
      const redirectPath = url.format({
        pathname: REDIRECT_ROOT,
        query: {
          token,
        },
      })
      res.writeHead(302, { Location: redirectPath })
      res.end()
    } catch (err) {
      captureException(err)
      res.status(500).json({ ok: false, error: err })
      return
    }
  }
}
