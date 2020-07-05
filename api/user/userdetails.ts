import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'

import { verifyToken } from '../utils'
import { User, ConversationsList, ChannelResponse, FilteredChannels, UserProfile } from '../../shared'

function filterChannels(channels: ChannelResponse[]): FilteredChannels[] {
  return channels.map(({ id, name, is_channel, is_group, is_archived, is_private, created, creator }) => ({
    id,
    name,
    is_channel,
    is_archived,
    is_group,
    is_private,
    created,
    creator,
  }))
}

function cleanProfile(profile: User['user']): UserProfile {
  return {
    userId: profile.id,
    name: profile.name,
    real_name: profile.profile.real_name_normalized,
    display_name: profile.profile.display_name_normalized,
    image: profile.profile.image_1024,
    is_admin: profile.is_admin,
    is_owner: profile.is_owner,
  }
}

export default verifyToken(async (req: NowRequest, res: NowResponse, userToken: { user: string; token: string }) => {
  try {
    const { token, user } = userToken

    const profileRequest = await fetch('https://slack.com/api/users.info?' + new URLSearchParams({ token, user }))
    const channelsRequest = await fetch(
      'https://slack.com/api/conversations.list?' +
        new URLSearchParams({ token, types: 'public_channel,private_channel,im, mpim' }),
    )

    Promise.all([profileRequest, channelsRequest]).then(async ([profileResponse, channelResponse]) => {
      const channelsData: ConversationsList = await channelResponse.json()
      const profileData: User = await profileResponse.json()

      if (!profileData.ok || !channelsData.ok) {
        res.status(401).json({ ok: false, error: 'Error Fetching User details' })
        return
      }

      const channels = filterChannels(channelsData.channels as ChannelResponse[])
      const profile = cleanProfile(profileData.user)

      res.status(200).json({ ok: true, data: { channels, profile } })
    })
  } catch (error) {
    res.status(401).json({ ok: false, error })
  }
})
