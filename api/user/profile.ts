import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'

import { User, UserResponse, verifyToken } from '../../shared'

export default verifyToken(async (req: NowRequest, res: NowResponse, userToken: { user: string; token: string }) => {
  try {
    const { token, user } = userToken
    const params = new URLSearchParams({ token, user })
    const profileRequest = await fetch('https://slack.com/api/users.info?' + params)

    const profile: User = await profileRequest.json()

    if (!profile.ok) {
      res.status(401).json({ ok: false, error: profile.error })
      return
    }

    const userProfile = profile.user
    const userResponse: UserResponse = {
      success: true,
      id: userProfile.id,
      real_name: userProfile.real_name,
      admin: userProfile.is_admin,
      updated: userProfile.updated,
      team_id: userProfile.team_id,
      display_name: userProfile.profile.display_name,
      avatar_original: userProfile.profile.image_original,
      avatar_512: userProfile.profile.image_512,
      avatar_72: userProfile.profile.image_72,
      first_name: userProfile.profile.first_name,
      last_name: userProfile.profile.last_name,
    }

    res.status(200).json({ ok: true, data: userResponse })
  } catch (error) {
    res.status(401).json({ ok: false, error })
  }
})
