import React from 'react'
import styled from 'styled-components'

type ButtonProps = {
  children: string
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({ children, handleClick }: ButtonProps) => (
  <ButtonEl onClick={handleClick}>{children}</ButtonEl>
)

Button.displayName = 'Button'

const ButtonEl = styled.button`
  appearance: none;
  border: none;
  padding: 10px 20px;
  background-color: var(--color-purple);
  color: var(--color-white);
`
