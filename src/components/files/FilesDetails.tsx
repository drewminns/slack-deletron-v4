import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { fetchedFilesState, fetchedPagesState, deleteFileSizeState } from '../../state'
import { useDeleteFiles } from '../../hooks/useDeleteFiles'

import { Title } from '../common/Title'
import { Button } from '../common/Button'

import { formatBytes } from '../../utils'

export const FilesDetails: FC = () => {
  const fetchedFiles = useRecoilValue(fetchedFilesState)
  const { total } = useRecoilValue(fetchedPagesState)
  const deletedFileSize = useRecoilValue(deleteFileSizeState)
  const { deleteAll } = useDeleteFiles(fetchedFiles)

  if (!Object.keys(fetchedFiles).length) {
    return null
  }

  const { amount, unit } = formatBytes(fetchedFiles.reduce((a: any, b: any) => a + b.size, 0))
  const deletedAmount = formatBytes(deletedFileSize)
  return (
    <Wrapper>
      <Container>
        <Separator>
          <Button onClick={() => {}}>Filters</Button>
        </Separator>
        <Title type="h3">All Files</Title>
      </Container>

      <Container>
        <SpacedTitle>
          <Title>
            {total} Files | Total Size: {`${amount}${unit}`}
          </Title>
        </SpacedTitle>

        <Separator>
          <Button color="blue" onClick={deleteAll}>
            Delete All
          </Button>
        </Separator>
        <Title>Total Deleted: {`${deletedAmount.amount}${deletedAmount.unit}`}</Title>
      </Container>
    </Wrapper>
  )
}

FilesDetails.displayName = 'Files Details'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36px 0;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Separator = styled.div`
  border-right: 1px solid var(--black);
  padding-right: 36px;
  margin-right: 36px;
`

const SpacedTitle = styled.div`
  margin-right: 36px;
`
