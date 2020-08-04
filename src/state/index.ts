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

export const applicationNoticeState: RecoilState<any> = atom({
  key: 'applicationNoticeState',
  default: { value: '', active: false, type: 'none' },
})

export const deleteFileSizeState: RecoilState<number> = atom({
  key: 'deleteFileSizeState',
  default: 0,
})

export const formState: RecoilState<FormState | any> = atom({
  key: 'formState',
  default: {},
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
