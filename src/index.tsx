import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { RecoilRoot } from 'recoil'
import { App } from './App'
import { GlobalStyle, theme } from './styles'

import { ErrorBoundary } from './Errors'

render(
  <RecoilRoot>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root'),
)
