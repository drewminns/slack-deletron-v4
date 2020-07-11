import { selector, RecoilValueReadOnly, waitForAll } from 'recoil'

import { userDetailsState, UserDetailsState } from './atoms'
import { ChannelFetchResponse } from '../../shared'

export const isLoggedInSelector: RecoilValueReadOnly<boolean> = selector({
  key: 'isLoggedInSelector', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const userDetails: UserDetailsState = get(userDetailsState)
    return userDetails.token?.length > 0
  },
})

export const userNameSelector: RecoilValueReadOnly<string> = selector({
  key: 'userNameSelector', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const userDetails: UserDetailsState = get(userDetailsState)
    return userDetails.profile?.real_name || userDetails.profile?.display_name || ''
  },
})

export const userProfileSelector: RecoilValueReadOnly<string> = selector({
  key: 'userProfileSelector', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const userDetails: UserDetailsState = get(userDetailsState)
    return userDetails.profile?.image || ''
  },
})

export const channelsSelector: RecoilValueReadOnly<ChannelFetchResponse> = selector({
  key: 'channelsSelector', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const userDetails: UserDetailsState = get(userDetailsState)
    return userDetails.channels || {}
  },
})
