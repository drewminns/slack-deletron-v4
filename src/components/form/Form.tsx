import React, { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm } from 'react-hook-form'
import { format, subDays, parseISO } from 'date-fns'
import styled from 'styled-components'

import { userDetailsState } from '../../state'
import { ReactComponent as Close } from '../../assets/close.svg'

import { FormState } from '../Files'
import { DatePicker } from './DatePicker'
import { ChannelSelector } from './ChannelSelector'
import { TypeInputList } from './TypeInputList'
import { Title } from '../common/Title'

export enum FILE_TYPES {
  images = 'Images',
  pdfs = 'PDF',
  gdocs = 'Google Docs',
  spaces = 'Posts',
  snippets = 'Snippets',
}

type FormProps = {
  handleForm: (data?: any) => Promise<void>
  handleFilterToggle: (val: boolean) => void
  formState: FormState
}

export const Form: FC<FormProps> = ({ handleForm, handleFilterToggle, formState }: FormProps) => {
  const userDetails = useRecoilValue(userDetailsState)
  const { register, handleSubmit, watch } = useForm({
    defaultValues: formState,
  })

  const today = format(new Date(), 'yyyy-MM-dd')
  const watchedStartDate = watch('startDate') || format(subDays(parseISO(today), 7), 'yyyy-MM-dd')
  const watchedEndDate = watch('endDate') || today

  const onSubmit = (data: any) => {
    handleForm(data)
    handleFilterToggle(false)
  }

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleFilterToggle(false)
  }

  const onDown = (ev: any) => {
    if (ev.keyCode === 27) {
      handleFilterToggle(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onDown)
    return () => window.removeEventListener('keydown', onDown)
  })

  return (
    <FormWrapper>
      <FormContainer>
        <Title type="h3">Filter Slack Files</Title>
        <FormEl onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <ChannelSelector
              register={register}
              ims={userDetails.channels.ims}
              channels={userDetails.channels.channels}
            />
          </FormRow>
          <FormRow>
            <TypeInputList register={register} types={Object.entries(FILE_TYPES)} />
          </FormRow>
          <FormRow>
            <DatePicker
              register={register}
              today={today}
              endDateValue={watchedEndDate}
              startDateValue={watchedStartDate}
            />
          </FormRow>
          <FormRow>
            <FormButton type="submit" value="Apply Filters" />
          </FormRow>
        </FormEl>
        <FormClose onClick={handleToggle}>
          <FormCloseText>Close</FormCloseText>
          <Close />
        </FormClose>
      </FormContainer>
    </FormWrapper>
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
  padding: 70px 45px;
  position: relative;
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
  padding: 14px 40px;
  text-transform: uppercase;
  color: var(--black);
  border-radius: 50px;
  letter-spacing: 0.1em;
  font-size: var(--fs-sm);
  letter-spacing: 0.11em;
  display: flex;
  align-items: center;
  background-color: var(--white);

  &:hover {
    opacity: 0.8;
  }
`

const FormClose = styled.button`
  appearance: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  background: none;
  border: 0;
  color: var(--white);

  &:focus,
  &:active {
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
