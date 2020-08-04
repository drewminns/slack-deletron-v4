import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { RecoilRoot } from 'recoil'
import { App } from './App'
import { GlobalStyle, theme } from './styles'

render(
  <RecoilRoot>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root'),
)
