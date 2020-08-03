import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

type ButtonProps = {
  children: ReactNode
  color?: string
  icon?: ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, color = 'black', icon }: ButtonProps) => (
  <ButtonEl color={color} onClick={onClick}>
    {icon && <Icon>{icon}</Icon>}
    {children}
  </ButtonEl>
)

Button.displayName = 'Button'

const ButtonEl = styled.button`
  appearance: none;
  border: none;
  padding: 10px 30px;
  text-transform: uppercase;
  color: ${(props) => (props.color === 'white' ? 'var(--black)' : 'var(--white)')};
  border-radius: 50px;
  letter-spacing: 0.1em;
  font-size: var(--fs-xs);
  letter-spacing: 0.11em;
  display: flex;
  align-items: center;
  ${(props) =>
    props.color &&
    css`
      background-color: var(--${props.color});
    `}

  &:hover {
    opacity: 0.8;
  }
`

const Icon = styled.div`
  margin-right: 12px;
`
