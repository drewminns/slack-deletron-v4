import React from 'react'
import styled, { css } from 'styled-components'

type ButtonProps = {
  children: string
  color?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, color = 'black' }: ButtonProps) => (
  <ButtonEl color={color} onClick={onClick}>
    {children}
  </ButtonEl>
)

Button.displayName = 'Button'

const ButtonEl = styled.button`
  appearance: none;
  border: none;
  padding: 14px 40px;
  text-transform: uppercase;
  color: var(--white);
  border-radius: 50px;
  letter-spacing: 0.1em;
  font-size: var(--fs-sm);
  letter-spacing: 0.11em;
  ${(props) =>
    props.color &&
    css`
      background-color: var(--${props.color});
    `}

  &:hover {
    opacity: 0.8;
  }
`
