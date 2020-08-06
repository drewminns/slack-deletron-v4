import React, { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { format, subDays, parseISO } from 'date-fns'
import styled from 'styled-components'
import FocusLock from 'react-focus-lock'

import { device } from '../../styles'
import { userDetailsState } from '../../state'
import { ReactComponent as Close } from '../../assets/close.svg'

import { formState } from '../../state'
import { DatePicker } from './DatePicker'
import { ChannelSelector } from './ChannelSelector'
import { TypeInputList } from './TypeInputList'
import { Title, Checkbox } from '../common'

export enum FILE_TYPES {
  images = 'Images',
  pdfs = 'PDF',
  gdocs = 'Google Docs',
  spaces = 'Posts',
  snippets = 'Snippets',
}

type FormProps = {
  handleFormSubmit: (data?: any) => Promise<void>
  toggleFormVisibility: (val: boolean) => void
}

export const Form: FC<FormProps> = ({ handleFormSubmit, toggleFormVisibility }: FormProps) => {
  const { channels } = useRecoilValue(userDetailsState)
  const formData = useRecoilValue(formState)
  const { register, handleSubmit, watch } = useForm({
    defaultValues: formData,
  })

  const today = format(new Date(), 'yyyy-MM-dd')
  const watchedDate = watch('show-date')
  const watchedStartDate = watch('startDate') || format(subDays(parseISO(today), 7), 'yyyy-MM-dd')
  const watchedEndDate = watch('endDate') || today

  const onSubmit = (data: any) => {
    handleFormSubmit(data)
    toggleFormVisibility(false)
  }

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    toggleFormVisibility(false)
  }

  const onDown = (ev: any) => {
    if (ev.keyCode === 27) {
      toggleFormVisibility(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onDown)
    return () => window.removeEventListener('keydown', onDown)
  })

  return (
    <FocusLock>
      <FormWrapper>
        <FormContainer>
          <Title type="h3">Filter Slack Files</Title>
          <FormEl onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <ChannelSelector register={register} ims={channels.ims} channels={channels.channels} />
            </FormRow>
            <FormRow>
              <TypeInputList register={register} types={Object.entries(FILE_TYPES)} />
            </FormRow>
            <FormRow>
              <Checkbox handleClick={register} name="show-date" label="Use Date Range" />
              {watchedDate && (
                <DatePicker
                  register={register}
                  today={today}
                  endDateValue={watchedEndDate}
                  startDateValue={watchedStartDate}
                />
              )}
            </FormRow>
            <FormRow>
              <FormButton type="submit" value="Apply Filters" />
            </FormRow>
          </FormEl>
          <FormClose onClick={handleToggle} data-autofocus>
            <FormCloseText>Close</FormCloseText>
            <Close />
          </FormClose>
        </FormContainer>
      </FormWrapper>
    </FocusLock>
  )
}

Form.displayName = 'Form'

const FormWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
  width: 100%;
  height: 100%;
  z-index: 200;
`

const FormContainer = styled.div`
  background-color: var(--black);
  max-width: 450px;
  color: var(--white);
  height: 100%;
  padding: 50px 30px;
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ${device.sm`
    padding: 70px 45px;
  `}
`

const FormEl = styled.form`
  margin-top: 24px;
`

const FormRow = styled.div`
  margin-bottom: 32px;
`

const FormButton = styled.input`
  appearance: none;
  border: none;
  padding: 10px 30px;
  text-transform: uppercase;
  color: var(--black);
  border-radius: 50px;
  letter-spacing: 0.1em;
  font-size: var(--fs-xs);
  letter-spacing: 0.11em;
  display: flex;
  align-items: center;
  background-color: var(--white);

  &:focus {
    outline-color: var(--orange);
  }

  &:hover {
    opacity: 0.8;
  }
`

const FormClose = styled.button`
  appearance: none;
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px;
  background: none;
  border: 0;
  color: var(--white);

  &:focus,
  &:active {
    outline-color: var(--orange);
    border: none;
  }
`

const FormCloseText = styled.span`
  text-transform: uppercase;
  font-size: var(--fs-sm);
  letter-spacing: 0.11em;
  display: inline-block;
  margin-right: 7px;
`
