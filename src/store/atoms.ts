import { atom, RecoilState } from 'recoil'

import { UserProfile } from '../../shared'

export const token: RecoilState<string> = atom({
  key: 'token', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

export const userProfile: RecoilState<UserProfile | any> = atom({
  key: 'userProfile', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
})
