import { createGlobalStyle } from 'styled-components'
import { normalize, darken, lighten, rem } from 'polished'

export const theme = {
  fontFamily: '"Inter", sans-serif',
  fontSize: '14px',
  fontSizeLG: '16px',
  fontSizeXXL: '56px',
  fontSizeXL: '42px',
  fontSizeSM: '12px',
  colors: {
    black: '#000000',
    orange: '#FF5F31',
    blue: '#00339B',
    white: '#ffffff',
    grey: '#E5E5E5',
  },
}

export const GlobalStyle = createGlobalStyle`

  ${normalize()}

  * {
    box-sizing: border-box;
  }

  :root {
    --hs: 100px;
    --ff: ${theme.fontFamily};
    --fs: ${theme.fontSize};
    --fs-lg: ${rem(theme.fontSizeLG, 10)};
    --fs-xxl: ${rem(theme.fontSizeXXL, 10)};
    --fs-xl: ${rem(theme.fontSizeXL, 10)};
    --fs-sm: ${rem(theme.fontSizeSM, 10)};
    --black: ${theme.colors.black};
    --orange: ${theme.colors.orange};
    --blue: ${theme.colors.blue};
    --white: ${theme.colors.white};
    --grey: ${theme.colors.grey};
  }

  html {
    font-size: 10px;
    font-size: 62.5%;
  }

  body {
    font-family: var(--font-family, ${theme.fontFamily});
    font-size: var(--fs, ${theme.fontSize});
    color: var(--color-black, ${theme.colors.black});
    line-height: 1.24;
  }
`
