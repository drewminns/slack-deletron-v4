import React, { FC } from 'react'
import styled from 'styled-components'

import { Checkbox } from '../common/Checkbox'

type TypeInputListProps = {
  register: () => any
  types: any[]
}

export const TypeInputList: FC<TypeInputListProps> = ({ register, types }: TypeInputListProps) => (
  <>
    <Title>File Types</Title>
    {types.map((type) => (
      <Checkbox handleClick={register} name={type[0]} key={type[0]} label={type[1]} />
    ))}
  </>
)

TypeInputList.displayName = 'Type Input List'

const Title = styled.p`
  font-size: var(--fs);
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`
