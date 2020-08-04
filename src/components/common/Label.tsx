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
  letter-spacing: 0.11em;
  padding: 4px 5px 0 0;
  color: var(--color-darker);
  font-weight: 700;
  text-transform: uppercase;
  font-size: var(--fs);
  margin-bottom: ${rem(16, 10)};
`

Label.displayName = 'Label'
