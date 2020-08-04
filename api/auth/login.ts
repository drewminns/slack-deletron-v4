import { NowRequest, NowResponse } from '@vercel/node'
import url from 'url'

const { CLIENT_ID, SCOPE, SLACK_API_URI, REDIRECT_URI } = process.env || ''

export default async (req: NowRequest, res: NowResponse) => {
  const redirect_url = url.format({
    pathname: SLACK_API_URI + '/authorize',
    query: { client_id: CLIENT_ID, user_scope: SCOPE, redirect_uri: REDIRECT_URI },
  })
  res.writeHead(302, { Location: redirect_url })
  res.end()
}
