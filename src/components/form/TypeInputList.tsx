import React, { FC } from 'react'

import { Checkbox } from '../common/Checkbox'
import { Title } from '../common/Title'

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
