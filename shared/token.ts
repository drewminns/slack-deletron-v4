import { NowRequest, NowResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'

import { JWT } from '.'

const { TOKEN_KEY } = process.env || ''

if (!TOKEN_KEY) {
  throw new Error()
}
export const issueJWT = (token: JWT['token'], user: JWT['userId']) => {
  return jwt.sign({ token, user }, TOKEN_KEY)
}

export const verifyToken = (fn: any) => (req: NowRequest, res: NowResponse): void => {
  const tokenRequest = req.headers.authorization
  if (tokenRequest) {
    let token = ''
    if (tokenRequest.startsWith('Bearer ')) {
      token = tokenRequest.slice(7, tokenRequest.length)
    }

    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({
            success: false,
            message: 'Token is not valid',
          })
          .end()
        return
      } else {
        return fn(req, res, decoded)
      }
    })
  } else {
    res
      .status(401)
      .json({
        success: false,
        message: 'Token is not valid',
      })
      .end()
    return
  }
}
