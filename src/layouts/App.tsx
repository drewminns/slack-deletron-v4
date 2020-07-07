import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import { Navigation } from './Navigation'

export const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Navigation />
    </RecoilRoot>
  )
}

App.displayName = 'App'
