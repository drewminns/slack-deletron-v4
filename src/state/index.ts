import { atom, RecoilState } from 'recoil'

import { UserProfile, FilteredChannels, IMResponse, FilesListReponse, FileResponse } from '../../shared'

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
  key: 'fetchedFilesState',
  default: [],
})

export const fetchedPagesState: RecoilState<FilesListReponse | any> = atom({
  key: 'fetchedPagesFiles',
  default: {},
})

export const fetchedFilesErrorState: RecoilState<string> = atom({
  key: 'fetchedFilesErrorState',
  default: '',
})

export const applicationErrorState: RecoilState<any> = atom({
  key: 'applicationErrorState',
  default: { value: '', active: false },
})

export const deleteFileSizeState: RecoilState<number> = atom({
  key: 'deleteFileSizeState',
  default: 0,
})

export type FormState = {
  channels: string
  endDate: string
  gdocs: boolean
  images: boolean
  pdfs: boolean
  snippets: boolean
  spaces: boolean
  startDate: string
}
