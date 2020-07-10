import { NowRequest, NowResponse } from '@vercel/node'
import url from 'url'
import fetch from 'node-fetch'

import { issueJWT } from '../../utils'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SLACK_OAUTH_URI, CLIENT_URL } = process.env || ''

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

  try {
    const slackOAuthFetch = await fetch(uri)
    const slackOAuthFetchResponse = await slackOAuthFetch.json()
    if (!slackOAuthFetchResponse.ok) {
      res.status(401).json({ ok: false, error: slackOAuthFetchResponse.error })
      return
    }

    const token = issueJWT(slackOAuthFetchResponse.access_token, slackOAuthFetchResponse.authed_user.id)
    const redirectPath = url.format({
      pathname: 'http://localhost:3000',
      query: {
        token,
      },
    })
    res.writeHead(302, { Location: redirectPath })
    res.end()
  } catch (err) {
    res.status(500).json({ ok: false, error: err })
    return
  }
}
