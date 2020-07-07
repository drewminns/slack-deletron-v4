import { atom } from 'recoil'

export const token = atom({
  key: 'token', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

export const loggedIn = atom({
  key: 'loggedIn', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export const userProfile = atom({
  key: 'userProfile', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
})
