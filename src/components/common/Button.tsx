import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { device } from '../../styles'

import { ReactComponent as TailSpin } from '../../assets/tailSpin.svg'

type ButtonProps = {
  children: ReactNode
  color?: string
  icon?: ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = 'black',
  icon,
  isLoading = false,
}: ButtonProps) => (
  <ButtonEl color={color} onClick={onClick} isLoading={isLoading}>
    {icon && <Icon>{icon}</Icon>}
    {children}
    {isLoading && <LoadingIcon />}
  </ButtonEl>
)

Button.displayName = 'Button'

const ButtonEl = styled.button<{ isLoading: boolean }>`
  position: relative;
  appearance: none;
  border: none;
  padding: 8px 15px;
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

  ${device.sm`
    padding: 10px 30px;
  `}

  ${(props) =>
    props.isLoading &&
    css`
      ${device.sm`
    padding-right: 40px;
    `}
    `}

  &:focus {
    outline-color: var(--orange);
  }

  &:hover {
    opacity: 0.8;
  }
`

const Icon = styled.div`
  margin-right: 12px;
`

const LoadingIcon = styled(TailSpin)`
  position: absolute;
  right: 18px;
`
