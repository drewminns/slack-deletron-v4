import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

enum ElementTypes {
  p = 'p',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
}

type TitleProps = {
  children: ReactNode
  type?: keyof typeof ElementTypes
}

export const Title: FC<TitleProps> = ({ children, type = 'p' }: TitleProps) => {
  switch (type) {
    case 'h1':
      return <TitleH1>{children}</TitleH1>
    case 'h2':
      return <TitleH2>{children}</TitleH2>
    case 'h3':
      return <TitleH3>{children}</TitleH3>
    case 'h4':
      return <TitleH4>{children}</TitleH4>
    default:
      return <Titlep>{children}</Titlep>
  }
}

Title.displayName = 'Title'

const BaseStyles = `
  text-transform: uppercase;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  letter-spacing: 0.11em;
`

const TitleH1 = styled.h1`
  ${BaseStyles}
  font-size: var(--fs-xxl);
`
const TitleH2 = styled.h2`
  ${BaseStyles}
  font-size: var(--fs-xl);
`
const TitleH3 = styled.h3`
  ${BaseStyles}
  font-size: var(--fs-lg);
`
const TitleH4 = styled.h4`
  ${BaseStyles}
  font-size: var(--fs);
`
const Titlep = styled.p`
  ${BaseStyles}
  font-size: var(--fs);
`
