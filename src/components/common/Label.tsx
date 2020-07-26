import React, { SFC } from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

type LabelProps = {
  children: string
  forValue: string
}

export const Label: SFC<LabelProps> = ({ children, forValue }: LabelProps) => (
  <LabelWrap htmlFor={forValue}>{children}</LabelWrap>
)

const LabelWrap = styled.label`
  display: inline-block;
  letter-spacing: 0.05em;
  padding: 4px 5px;
  color: var(--color-darker);
  font-weight: 700;
  font-size: var(--size-font-small);
  margin-bottom: ${rem(8, 10)};
`

Label.displayName = 'Label'
