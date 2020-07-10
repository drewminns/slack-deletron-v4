import { atom, RecoilState } from 'recoil'

import { UserProfile, FilteredChannels } from '../../shared'

export type UserDetailsState = {
  token: string
  profile: UserProfile
  channels: FilteredChannels[]
}

export const userDetailsState: RecoilState<UserDetailsState | any> = atom({
  key: 'userDetailsState', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
})
