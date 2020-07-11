import React, { FC, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { format, subDays, parseISO } from 'date-fns'

import { channelsSelector, userIdSelector, tokenSelector, fetchedFilesState, fetchedFilesErrorState } from '../state'

import { FilesListReponse } from '../../shared/interfaces'

import { DatePicker } from './form/DatePicker'
import { ChannelSelector } from './form/ChannelSelector'
import { TypeInputList } from './form/TypeInputList'
import { generateSearchParams } from '../utils'

export enum FILE_TYPES {
  images = 'Images',
  pdfs = 'PDF',
  gdocs = 'Google Docs',
  spaces = 'Posts',
  snippets = 'Snippets',
}

export const Form: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const channels = useRecoilValue(channelsSelector)
  const token = useRecoilValue(tokenSelector)
  const user = useRecoilValue(userIdSelector)
  const [fetchedFiles, setFetchedFiles] = useRecoilState(fetchedFilesState)
  const [fetchedFilesError, setFetchedFilesError] = useRecoilState(fetchedFilesErrorState)
  const { register, handleSubmit, watch } = useForm()

  const types = Object.entries(FILE_TYPES)
  const today = format(new Date(), 'yyyy-MM-dd')
  const watchedStartDate = watch('startDate') || format(subDays(parseISO(today), 7), 'yyyy-MM-dd')
  const watchedEndDate = watch('endDate') || today

  const onSubmit = async (data: any) => {
    const params = generateSearchParams(data, user, token)

    try {
      setIsLoading(true)
      const filesFetch = await fetch('https://slack.com/api/files.list?' + new URLSearchParams(params))
      const files: FilesListReponse = await filesFetch.json()
      setIsLoading(false)
      if (files.ok) {
        setFetchedFiles({
          files: files.files,
          paging: files.paging,
        })
      } else {
        setFetchedFilesError(files.error as string)
      }
    } catch (error) {
      setIsLoading(false)
      setFetchedFilesError(error)
    }
  }

  console.log(isLoading)
  return (
    <div>
      {isLoading && <p>Loading</p>}
      {fetchedFilesError.length > 0 && <p>{fetchedFilesError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ChannelSelector register={register} ims={channels.ims} channels={channels.channels} />
        <TypeInputList register={register} types={types} />
        <DatePicker register={register} today={today} endDateValue={watchedEndDate} startDateValue={watchedStartDate} />
        <input type="submit" />
      </form>
    </div>
  )
}

Form.displayName = 'Form'
