import React, { FC } from 'react'
import styled from 'styled-components'

enum ElementTypes {
  p = 'p',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
}

type TitleProps = {
  children: string
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

const TitleH1 = styled.h1`
  color: var(--color-darker);
`
const TitleH2 = styled.h2`
  color: var(--color-darker);
`
const TitleH3 = styled.h3`
  color: var(--color-darker);
`
const TitleH4 = styled.h4`
  color: var(--color-darker);
`
const Titlep = styled.p`
  font-weight: 700;
  color: var(--color-darker);
`
