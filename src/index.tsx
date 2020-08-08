import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { RecoilRoot } from 'recoil'
import { App } from './App'
import { GlobalStyle, theme } from './styles'

import * as Sentry from '@sentry/react'

const { SENTRY_CONFIG } = process.env || ''
Sentry.init({ dsn: SENTRY_CONFIG, environment: process.env.NODE_ENV })

render(
  <RecoilRoot>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root'),
)
