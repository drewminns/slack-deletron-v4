import React, { FC } from 'react'
import { FILE_TYPES } from '../Form'

type TypeInputListProps = {
  register: () => any
  types: any[]
}

export const TypeInputList: FC<TypeInputListProps> = ({ register, types }: TypeInputListProps) => (
  <div className="pb-2">
    {types.map((type) => (
      <label key={type[0]} htmlFor={type[0]}>
        <input type="checkbox" id={type[0]} ref={register} name={type[0]} />
        {type[1]}
      </label>
    ))}
  </div>
)

TypeInputList.displayName = 'Type Input List'
