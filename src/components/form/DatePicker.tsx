import React, { FC } from 'react'
import styled from 'styled-components'
import { format, subDays, addDays, parseISO } from 'date-fns'

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
      <Label htmlFor="startDate">From</Label>
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
      <Label htmlFor="endDate">Until</Label>
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

const DatePickerContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 16px;

  label {
    margin-bottom: 0;
  }
`

const Label = styled.label`
  margin-right: 11px;
  font-size: var(--fs);
  display: inline-block;
  width: 40px;
`

const DatePickerInput = styled.input`
border 1px solid var(--white);
color: var(--white);
background-color: var(--black);
padding: 5px 10px;
width: 100%;
letter-spacing: 0.11em;
font-size: var(--fs);
`

const Title = styled.p`
  font-size: var(--fs);
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`
