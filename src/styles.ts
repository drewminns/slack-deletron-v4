import { createGlobalStyle } from 'styled-components'
import { normalize, darken, lighten } from 'polished'

export const theme = {
  fontFamily: '"Inter", sans-serif',
  br: '4px',
  fontSize: '15px',
  fontSizeSmall: '12px',
  itemSpace: '8px',
  light: {
    colors: {
      light: '#F6F9FC',
      white: '#FFFFFF',
      lilac: '#8B79F1',
      green: '#76A48C',
      blue: '#017BFF',
      yellow: '#FEDC0A',
      orange: '#EB200C',
      pink: '#FB97B5',
      purple: '#2727FE',
      black: '#1D1D1D',
      grey: '#babcbf',
      darker: '#2f2f2f',
    },
  },
}

export const GlobalStyle = createGlobalStyle`

  ${normalize()}

  * {
    box-sizing: border-box;
  }

  :root {
    --hs: 100px;
    --br: ${theme.br};
    --item-space: ${theme.itemSpace};
    --size-font: ${theme.fontSize};
    --size-font-small: ${theme.fontSizeSmall};
    --color-light: ${theme.light.colors.light};
    --color-white: ${theme.light.colors.white};
    --color-lilac: ${theme.light.colors.lilac};
    --color-green: ${theme.light.colors.green};
    --color-blue: ${theme.light.colors.blue};
    --color-yellow: ${theme.light.colors.yellow};
    --color-orange: ${theme.light.colors.orange};
    --color-pink: ${theme.light.colors.pink};
    --color-purple: ${theme.light.colors.purple};
    --color-purple-dark: ${darken(0.5, theme.light.colors.purple)};
    --color-purple-light: ${lighten(0.08, theme.light.colors.purple)};
    --color-black: ${theme.light.colors.black};
    --color-grey: ${theme.light.colors.grey};
    --color-darker: ${theme.light.colors.darker};
    --font-family: ${theme.fontFamily};
    --border-radius: ${theme.br};
  }

  html {
    font-size: 10px;
    font-size: 62.5%;
  }

  body {
    font-family: var(--font-family, ${theme.fontFamily});
    font-size: var(--size-font-small, ${theme.fontSizeSmall});
    color: var(--color-black, ${theme.light.colors.black});
    background-color: var(--color-light);
  }
`
