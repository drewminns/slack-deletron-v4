import React, { FC, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useResetRecoilState } from 'recoil'

import { applicationNoticeState } from '../../state'

enum type {
  success = 'success',
  error = 'success',
}

type BannerProps = {
  value: string
  type: type
}

export const Banner: FC<BannerProps> = ({ value, type }: BannerProps) => {
  const resetApplicationNotice = useResetRecoilState(applicationNoticeState)

  useEffect(() => {
    const timer = setTimeout(() => {
      resetApplicationNotice()
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Wrapper role="alert" type={type}>
      {value}
    </Wrapper>
  )
}

Banner.displayName = 'Banner'

const Wrapper = styled.div<{ type: string }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 200;
  text-align: center;
  padding: 10px;
  color: var(--white);
  font-size: var(--fs);
  animation: 1s linear 3s slideUp 1;
  background ${(props) => (props.type === 'success' ? css`var(--black)` : css`var(--orange)`)};

  @keyframes slideUp {
    from {
      top: 0;
    }
    to {
      top: -50%;
    }
  }
`
