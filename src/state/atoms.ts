import { atom, RecoilState } from 'recoil'

import { UserProfile, FilteredChannels, IMResponse, FilesListReponse } from '../../shared'

export type UserDetailsState = {
  token: string
  profile: UserProfile
  channels: {
    channels: FilteredChannels[]
    ims: IMResponse[]
  }
}

export const userDetailsState: RecoilState<UserDetailsState | any> = atom({
  key: 'userDetailsState', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
})

export const fetchedFilesState: RecoilState<FilesListReponse | any> = atom({
  key: 'fetchedFiles',
  default: {},
})
