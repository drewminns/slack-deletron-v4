import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { format, subDays, addDays, parseISO } from 'date-fns'

import { channelsSelector } from '../state'
import { FilteredChannels, IMResponse } from '../../shared'

import { DatePicker } from './form/DatePicker'
import { ChannelSelector } from './form/ChannelSelector'
import { TypeInputList } from './form/TypeInputList'

export enum FILE_TYPES {
  images = 'Images',
  pdfs = 'PDF',
  gdocs = 'Google Docs',
  spaces = 'Posts',
  snippets = 'Snippets',
}

export const Form: FC = () => {
  const channels = useRecoilValue(channelsSelector)
  const { register, handleSubmit, watch, errors, setValue, control } = useForm()

  const types = Object.entries(FILE_TYPES)

  const today = format(new Date(), 'yyyy-MM-dd')
  const watchedStartDate = watch('startDate') || format(subDays(parseISO(today), 7), 'yyyy-MM-dd')
  const watchedEndDate = watch('endDate') || today

  const onSubmit = (data: any) => console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ChannelSelector register={register} ims={channels.ims} channels={channels.channels} />
        <TypeInputList register={register} types={types} />
        <DatePicker register={register} today={today} endDateValue={watchedEndDate} startDateValue={watchedStartDate} />
        <input type="submit" />
      </form>
      <DevTool control={control} />
    </div>
  )
}

Form.displayName = 'Form'
