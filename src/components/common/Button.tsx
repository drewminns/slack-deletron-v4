import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { device } from '../../styles'

import { ReactComponent as TailSpin } from '../../assets/tailspin.svg'

type ButtonProps = {
  children: ReactNode
  color?: string
  icon?: ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
  hideTextOnMobile?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = 'black',
  icon,
  isLoading = false,
  hideTextOnMobile = false,
  disabled = false,
}: ButtonProps) => (
  <ButtonEl color={color} onClick={onClick} isLoading={isLoading} disabled={disabled}>
    {icon && <Icon hideTextOnMobile={hideTextOnMobile}>{icon}</Icon>}
    <ButtonText hideTextOnMobile={hideTextOnMobile}>{children}</ButtonText>
    {isLoading && <LoadingIcon />}
  </ButtonEl>
)

Button.displayName = 'Button'

const ButtonText = styled.span<{ hideTextOnMobile: boolean }>`
  ${(props) =>
    props.hideTextOnMobile &&
    css`
      display: none;
      ${device.sm`
        display: block;
      `}
    `}
`

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

  &:disabled {
    opacity: 0.5;
    &:hover {
      opacity: 0.5;
    }
  }

  &:focus {
    outline-color: var(--orange);
  }

  &:hover {
    opacity: 0.8;
  }
`

const Icon = styled.div<{ hideTextOnMobile: boolean }>`
  ${(props) =>
    props.hideTextOnMobile
      ? css`
          margin-right: 0;
          ${device.sm`
        margin-right: 12px;
      `}
        `
      : css`
          margin-right: 12px;
        `}
`

const LoadingIcon = styled(TailSpin)`
  position: absolute;
  right: 18px;
`
