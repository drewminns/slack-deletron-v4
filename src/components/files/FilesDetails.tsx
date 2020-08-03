import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { fetchedFilesState, fetchedPagesState, deleteFileSizeState, FormState, userDetailsState } from '../../state'
import { useDeleteFiles } from '../../hooks/useDeleteFiles'
import { ReactComponent as Filter } from '../../assets/filter.svg'
import { ReactComponent as Close } from '../../assets/close.svg'

import { Button } from '../common/Button'

import { formatBytes } from '../../utils'

type FilesDetailsProps = {
  clearFilters: () => Promise<void>
  toggleFormVisibility: (val: boolean) => void
  formState: FormState
  hasFiles: boolean
}

export const FilesDetails: FC<FilesDetailsProps> = ({
  toggleFormVisibility,
  formState,
  clearFilters,
  hasFiles,
}: FilesDetailsProps) => {
  const fetchedFiles = useRecoilValue(fetchedFilesState)
  const { total } = useRecoilValue(fetchedPagesState)
  const deletedFileSize = useRecoilValue(deleteFileSizeState)
  const { deleteAll } = useDeleteFiles(fetchedFiles)
  const { channels } = useRecoilValue(userDetailsState)

  const { amount, unit } = formatBytes(fetchedFiles.reduce((a: any, b: any) => a + b.size, 0))
  const deletedAmount = formatBytes(deletedFileSize)

  const handleFilters = () => {
    if (formState) {
      const fileGroup: string[] = []

      if (formState.images) {
        fileGroup.push('Images')
      }

      if (formState.gdocs) {
        fileGroup.push('Google Docs')
      }

      if (formState.pdfs) {
        fileGroup.push('PDFs')
      }

      if (formState.snippets) {
        fileGroup.push('Snippets')
      }

      if (formState.spaces) {
        fileGroup.push('Spaces')
      }

      const channelList = channels.channels.concat(channels.ims)
      const channelName = channelList.filter((el: any) => el.id === formState.channels)[0]

      return (
        <>
          <DetailText>{`All ${fileGroup.join(', ')} ${
            channelName ? `in ${channelName.name || channelName.user_name}` : ''
          } from ${formState.startDate} to ${formState.endDate}`}</DetailText>
          <MiniButton onClick={() => clearFilters()}>
            <Close />
          </MiniButton>
        </>
      )
    } else {
      return <DetailText>All Files</DetailText>
    }
  }

  return (
    <Wrapper>
      <ContainerLeft>
        <Separator>
          <Button onClick={() => toggleFormVisibility(true)} icon={<Filter />}>
            Filters
          </Button>
        </Separator>
        {handleFilters()}
      </ContainerLeft>

      <ContainerRight>
        {hasFiles && (
          <>
            <SpacedTitle>
              <DetailText>
                {total} Files | Total Size: {`${amount}${unit}`}
              </DetailText>
            </SpacedTitle>

            <Separator>
              <Button color="blue" onClick={deleteAll}>
                Delete All
              </Button>
            </Separator>
          </>
        )}

        <Total>Total Deleted: {`${deletedAmount.amount}${deletedAmount.unit}`}</Total>
      </ContainerRight>
    </Wrapper>
  )
}

FilesDetails.displayName = 'Files Details'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px 20px;
`

const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
`

const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Separator = styled.div`
  border-right: 1px solid var(--black);
  padding-right: 25px;
  margin-right: 25px;
`

const SpacedTitle = styled.div`
  margin-right: 36px;
`

const DetailText = styled.p`
  font-size: var(--fs-sm);
  letter-spacing: 0.05em;
`

const MiniButton = styled.button`
  appearance: none;
  color: var(--white);
  font-size: var(--fs-sm);
  background-color: var(--black);
  margin-left: 10px;
  border-radius: 50px;
  padding: 2px 6px 3px;
  border: none;
`

const Total = styled.p`
  text-transform: uppercase;
  line-height: 1.2;
  margin: 0;
  letter-spacing: 0.11em;
  font-size: var(--fs-sm);
`
