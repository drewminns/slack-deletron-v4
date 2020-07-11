import React, { FC } from 'react'
import { format, subDays, addDays, parseISO } from 'date-fns'

type DatePickerProps = {
  today: string
  endDateValue: string
  startDateValue: string
  register: () => any
}

export const DatePicker: FC<DatePickerProps> = ({ today, register, endDateValue, startDateValue }: DatePickerProps) => (
  <>
    <div className="pb-2">
      <label htmlFor="startDate">From</label>
      <input
        type="date"
        defaultValue={startDateValue}
        max={format(subDays(parseISO(endDateValue), 1), 'yyyy-MM-dd')}
        name="startDate"
        id="startDate"
        ref={register}
      />
    </div>
    <div className="pb-2">
      <label htmlFor="endDate">Until</label>
      <input
        type="date"
        defaultValue={endDateValue}
        min={format(addDays(parseISO(startDateValue), 1), 'yyyy-MM-dd')}
        max={today}
        name="endDate"
        id="endDate"
        ref={register}
      />
    </div>
  </>
)

DatePicker.displayName = 'DatePicker'
