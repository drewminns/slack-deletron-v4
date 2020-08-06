import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { device } from '../../styles'
import useFetchFiles from '../../hooks/useFetchFiles'

import { fetchedFilesState, deleteFileSizeState, fetchedPagesState, userDetailsState, formState } from '../../state'
import { ReactComponent as Filter } from '../../assets/filter.svg'
import { ReactComponent as Close } from '../../assets/close.svg'

import { Button } from '../common/Button'

import { formatBytes } from '../../utils'

type FilesDetailsProps = {
  toggleFormVisibility: (val: boolean) => void
  isDeleting: boolean
  handleDeleteAll: () => Promise<void>
}

export const FilesDetails: FC<FilesDetailsProps> = ({
  toggleFormVisibility,
  handleDeleteAll,
  isDeleting,
}: FilesDetailsProps) => {
  const { fetchFiles } = useFetchFiles()
  const fetchedFiles = useRecoilValue(fetchedFilesState)
  const deletedFileSize = useRecoilValue(deleteFileSizeState)
  const { channels } = useRecoilValue(userDetailsState)
  const { total } = useRecoilValue(fetchedPagesState)
  const formData = useRecoilValue(formState)

  const { amount, unit } = formatBytes(fetchedFiles.reduce((a: any, b: any) => a + b.size, 0))
  const deletedAmount = formatBytes(deletedFileSize)

  const handleFilters = () => {
    if (formData) {
      const fileGroup: string[] = []

      if (formData.images) {
        fileGroup.push('Images')
      }

      if (formData.gdocs) {
        fileGroup.push('Google Docs')
      }

      if (formData.pdfs) {
        fileGroup.push('PDFs')
      }

      if (formData.snippets) {
        fileGroup.push('Snippets')
      }

      if (formData.spaces) {
        fileGroup.push('Spaces')
      }

      const channelList = channels.channels.concat(channels.ims)
      const channelName = channelList.filter((el: any) => el.id === formData.channels)[0]

      const date = formData.startDate ? `from ${formData.startDate} to ${formData.endDate}` : ''

      return (
        <>
          <DetailText>{`All ${fileGroup.join(', ')} ${
            channelName ? `in ${channelName.name || channelName.user_name}` : ''
          } ${date}`}</DetailText>
          <MiniButton onClick={() => fetchFiles()}>
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
            Filters {formData && <Count>{Object.values(formData).filter((form) => form).length}</Count>}
          </Button>
        </Separator>
        {handleFilters()}
      </ContainerLeft>

      <ContainerRight>
        {fetchedFiles.length > 0 && (
          <>
            <SpacedTitle>
              <DetailText>
                {fetchedFiles.length} Files {fetchedFiles.length !== total ? `of ${total}` : ''} | Total Size:{' '}
                {`${amount}${unit}`}
              </DetailText>
            </SpacedTitle>

            {fetchedFiles.length && (
              <Separator>
                <Button color="blue" onClick={handleDeleteAll} isLoading={isDeleting}>
                  Delete {fetchedFiles.length} Files
                </Button>
              </Separator>
            )}
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
  padding: 15px 10px;
  border-top: 1px solid var(--grey);

  ${device.sm`
    border-top: none;
    padding: 20px 25px 20px;
  `}
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
  ${device.sm`
  border-right: 1px solid var(--black);
    padding-right: 25px;
    margin-right: 25px;
  `}
`

const SpacedTitle = styled.div`
  margin-right: 36px;
  display: none;

  ${device.lg`
    display: block;
  `}
`

const DetailText = styled.p`
  font-size: var(--fs-sm);
  letter-spacing: 0.05em;
  line-height: 1.2;
  margin-left: 5px;
  display: none;

  ${device.sm`
    margin-left: 0;
    display: block;
  `}
`

const MiniButton = styled.button`
  appearance: none;
  color: var(--white);
  font-size: var(--fs-sm);
  background-color: var(--black);
  margin-left: 10px;
  border-radius: 50px;
  padding: 2px 6px 3px 6px;
  border: none;
  line-height: 1.1;
`

const Total = styled.p`
  text-transform: uppercase;
  line-height: 1.2;
  margin: 0;
  letter-spacing: 0.11em;
  font-size: var(--fs-sm);
  display: none;

  ${device.sm`
    display: block;
  `}
`

const Count = styled.span`
  background-color: var(--white);
  border-radius: 50%;
  padding: 1px 4px 1px 5px;
  color: var(--black);
  margin-left: 5px;

  ${device.sm`
    display: none;
  `}
`
