import { createGlobalStyle, css } from 'styled-components'
import { normalize, rem } from 'polished'

export const theme = {
  fontFamily: '"Inter", sans-serif',
  fontSize: '15px',
  fontSizeLG: '16px',
  fontSizeXXL: '56px',
  fontSizeXL: '42px',
  fontSizeSM: '14px',
  fontSizeXS: '12px',
  colors: {
    black: '#000000',
    orange: '#FF5F31',
    blue: '#00339B',
    white: '#ffffff',
    grey: '#E5E5E5',
  },
}

type breakPointTypes = {
  [key: string]: string
}

const breakpoints: breakPointTypes = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px',
}

export const device = (Object.keys(breakpoints) as Array<keyof typeof breakpoints>).reduce((acc, key) => {
  acc[key] = (style: string) => `@media (min-width: ${breakpoints[key]}) { ${style} }`
  return acc
  // eslint-disable-next-line @typescript-eslint/ban-types
}, {} as { [index: string]: Function })

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
    --fs-xs: ${rem(theme.fontSizeXS, 10)};
    --black: ${theme.colors.black};
    --orange: ${theme.colors.orange};
    --blue: ${theme.colors.blue};
    --white: ${theme.colors.white};
    --grey: ${theme.colors.grey};
  }

  html {
    font-size: 10px;
    font-size: 62.5%;
    min-height: -webkit-fill-available;
  }

  body {
    font-family: var(--font-family, ${theme.fontFamily});
    font-size: var(--fs, ${theme.fontSize});
    color: var(--color-black, ${theme.colors.black});
    line-height: 1.7;
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
`
