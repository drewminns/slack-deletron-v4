import { NowRequest, NowResponse } from '@vercel/node'
import url from 'url'

const { CLIENT_ID, SLACK_OAUTH_URI, SCOPE } = process.env || ''

export default async (req: NowRequest, res: NowResponse) => {
  const redirect_url = url.format({
    pathname: 'https://slack.com/oauth/v2/authorize',
    query: { client_id: CLIENT_ID, scope: SCOPE },
  })
  res.writeHead(302, { Location: redirect_url })
  res.end()
}
