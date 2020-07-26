import React, { FC } from 'react'
import styled from 'styled-components'
import { format, subDays, addDays, parseISO } from 'date-fns'
import { rem } from 'polished'

import { Label } from '../common/Label'
import { Title } from '../common/Title'

type DatePickerProps = {
  today: string
  endDateValue: string
  startDateValue: string
  register: () => any
}

export const DatePicker: FC<DatePickerProps> = ({ today, register, endDateValue, startDateValue }: DatePickerProps) => (
  <>
    <Title>Date Range</Title>
    <DatePickerContainer>
      <Label forValue="startDate">From</Label>
      <DatePickerInput
        type="date"
        defaultValue={startDateValue}
        max={format(subDays(parseISO(endDateValue), 1), 'yyyy-MM-dd')}
        name="startDate"
        id="startDate"
        ref={register}
      />
    </DatePickerContainer>
    <DatePickerContainer>
      <Label forValue="endDate">Until</Label>
      <DatePickerInput
        type="date"
        defaultValue={endDateValue}
        min={format(addDays(parseISO(startDateValue), 1), 'yyyy-MM-dd')}
        max={today}
        name="endDate"
        id="endDate"
        ref={register}
      />
    </DatePickerContainer>
  </>
)

DatePicker.displayName = 'DatePicker'

const DatePickerText = styled.p`
  font-weight: 700;
  display: inline-block;
  text-transform: lowercase;
  font-size: var(--size-font);
  letter-spacing: 0.05em;
  padding: 4px 5px;
  background: var(--color-darker);
  color: var(--color-light);
  font-size: var(--size-font);
  margin: 0 0 ${rem(12, 10)};
`

const DatePickerContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  margin-bottom: 16px;

  label {
    margin-bottom: 0;
  }
`

const DatePickerInput = styled.input`
border 1px solid var(--color-darker);
border-radius: var(--br);
padding: 3px;
width: 100%;
letter-spacing: 0.05em;
font-size: var(--size-font-small);
`
