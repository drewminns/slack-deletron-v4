import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { format, subDays, parseISO } from 'date-fns'
import styled from 'styled-components'
import { rem, cssVar, transitions } from 'polished'

import { fetchedFilesState, fetchedPagesState, applicationErrorState, userDetailsState } from '../../state'
import { FilesListReponse } from '../../../shared/interfaces'

import { DatePicker } from './DatePicker'
import { ChannelSelector } from './ChannelSelector'
import { TypeInputList } from './TypeInputList'
import { Button } from '../common/Button'
import { Checkbox } from '../common/Checkbox'
import { generateSearchParams } from '../../utils'

export enum FILE_TYPES {
  images = 'Images',
  pdfs = 'PDF',
  gdocs = 'Google Docs',
  spaces = 'Posts',
  snippets = 'Snippets',
}

export const Form: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedFiles, setFetchedFiles] = useRecoilState(fetchedFilesState)
  const [fetchedPaging, setFetchedPages] = useRecoilState(fetchedPagesState)
  const [userDetails] = useRecoilState(userDetailsState)
  const [applicationError, setApplicationError] = useRecoilState(applicationErrorState)
  const { register, handleSubmit, watch } = useForm()

  const types = Object.entries(FILE_TYPES)
  const today = format(new Date(), 'yyyy-MM-dd')
  const watchedStartDate = watch('startDate') || format(subDays(parseISO(today), 7), 'yyyy-MM-dd')
  const watchedEndDate = watch('endDate') || today
  const useDateRange = watch('displayDate')

  const onSubmit = async (data: any) => {
    const params = generateSearchParams(data, userDetails.profile.userId, userDetails.token)

    try {
      setIsLoading(true)
      const filesFetch = await fetch('https://slack.com/api/files.list?' + new URLSearchParams(params))
      const files: FilesListReponse = await filesFetch.json()
      setIsLoading(false)
      if (files.ok) {
        setFetchedFiles(files.files)
        setFetchedPages(files.paging)
      } else {
        setApplicationError({ active: true, value: files.error as string })
      }
    } catch (error) {
      setIsLoading(false)
      setApplicationError({ active: true, value: error })
    }
  }

  return (
    <FormWrapper>
      {applicationError.active && <p>{applicationError.value}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <ChannelSelector
            register={register}
            ims={userDetails.channels.ims}
            channels={userDetails.channels.channels}
          />
        </FormRow>
        <FormRow>
          <TypeInputList register={register} types={types} />
        </FormRow>
        <FormRow>
          <Checkbox label="Use Date Range?" name="displayDate" handleClick={register} />
          {useDateRange && (
            <DatePicker
              register={register}
              today={today}
              endDateValue={watchedEndDate}
              startDateValue={watchedStartDate}
            />
          )}
        </FormRow>
        <FormRow>
          <Button handleClick={onSubmit}>Submit</Button>
          {isLoading && <p>Loading</p>}
        </FormRow>
      </form>
    </FormWrapper>
  )
}

Form.displayName = 'Form'

const FormWrapper = styled.div``

const FormRow = styled.div`
  margin-bottom: ${(props) => rem(24, cssVar(props.theme.fontSize, true))};
`
