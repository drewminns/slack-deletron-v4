import React from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { App } from './App'
import { GlobalStyle } from './styles'

render(
  <RecoilRoot>
    <GlobalStyle />
    <App />
  </RecoilRoot>,
  document.getElementById('root'),
)
