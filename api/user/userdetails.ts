import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'cross-fetch'

import {
  User,
  ConversationsList,
  ChannelResponse,
  FilteredChannels,
  UserProfile,
  verifyToken,
  IMResponse,
  captureException,
  captureMessage,
} from '../../shared'

function filterChannels(channels: ChannelResponse[]): FilteredChannels[] {
  return channels.map(({ id, name, is_channel, user, is_group, is_archived, is_private, created, creator, is_im }) => ({
    id,
    name,
    is_channel,
    is_archived,
    is_group,
    is_private,
    created,
    creator,
    is_im,
    user,
  }))
}

function cleanProfile(profile: User['user']): UserProfile {
  return {
    userId: profile.id,
    name: profile.name,
    real_name: profile.profile.real_name_normalized,
    display_name: profile.profile.display_name_normalized,
    image: profile.profile.image_72,
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
        captureMessage(
          `api/userDetails.ts :: profiledata or channelsdata is not ok - profileData: ${JSON.stringify(
            profileData,
          )} | channelsData: ${JSON.stringify(channelsData)}`,
        )
        res.status(401).json({ ok: false, error: 'Error Fetching User details' })
        return
      }

      const channelsList: ChannelResponse[] = []
      const IMList: IMResponse[] = []
      const channels = filterChannels(channelsData.channels as ChannelResponse[])
      channels.forEach((channel: any) => {
        if (channel.is_channel) {
          channelsList.push(channel)
        } else {
          IMList.push(channel)
        }
      })

      const fetchedIMNames = await IMList.map(async (channel) => {
        const userRequest = await fetch(
          'https://slack.com/api/users.info?' + new URLSearchParams({ token, user: channel.user }),
        )
        const userInfo: User = await userRequest.json()
        if (userInfo.ok) {
          return {
            ...channel,
            user_name: userInfo.user.real_name,
          }
        }
      })

      const profile = cleanProfile(profileData.user)
      Promise.all(fetchedIMNames)
        .then((fetchImResultNames) => {
          const cleanIMResults = fetchImResultNames.filter((imresult) => imresult)
          res
            .status(200)
            .json({ ok: true, data: { token, channels: { channels: channelsList, ims: cleanIMResults }, profile } })
        })
        .catch((error) => {
          captureException(error)
          res.status(401).json({ ok: false, error })
        })
    })
  } catch (error) {
    captureException(error)
    res.status(401).json({ ok: false, error })
  }
})
