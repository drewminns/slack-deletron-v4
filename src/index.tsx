import React from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import { App } from './layouts'

import './styles.css'

render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root'),
)
