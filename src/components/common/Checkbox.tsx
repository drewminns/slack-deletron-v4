import React, { FC } from 'react'
import styled from 'styled-components'
import { size } from 'polished'

type CheckboxProps = {
  label: string
  name: string
  handleClick: () => any
}

export const Checkbox: FC<CheckboxProps> = ({ label, name, handleClick }: CheckboxProps) => (
  <CheckboxContainer>
    <CheckboxInput type="checkbox" id={name} ref={handleClick} name={name} />
    <CheckboxLabel htmlFor={name}>{label}</CheckboxLabel>
  </CheckboxContainer>
)

const CheckboxContainer = styled.div`
  margin-bottom: 6px;
`

const CheckboxInput = styled.input`
  appearance: none;
  outline: none;
  vertical-align: middle;
  position: relative;
  margin: 0;
  cursor: pointer;
  display: inline-block;
  background-color: var(--black);
  border: 1px solid var(--white);
  transition: background 0.3s, border-color 0.3s;
  ${size(18)};

  &:focus {
    border-color: var(--orange);
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    border: 1px solid var(--black);
    height: 10px;
    width: 4px;
    left: 6px;
    top: 0px;
    border-left: 0;
    border-top: 0;
    transform: rotate(40deg);
    transition: border-color 0.3s;
  }

  &:checked {
    border: 1px solid var(--white);

    &:focus {
      border-color: var(--orange);
    }

    &:after {
      border-color: var(--white);
    }
  }
`

const CheckboxLabel = styled.label`
  margin-left: 5px;
  font-size: var(--fs);
  display: inline-block;
  padding: 4px 5px 6px;
  margin-top: 2px;
`

Checkbox.displayName = 'Checkbox'
