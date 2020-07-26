import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { fetchedFilesState, deleteFileSizeState } from '../../state'
import { useDeleteFiles } from '../../hooks/useDeleteFiles'

import { formatBytes } from '../../utils'

export const FileDetails: FC = () => {
  const [fetchedFiles] = useRecoilState(fetchedFilesState)
  const [deletedFileSize] = useRecoilState(deleteFileSizeState)
  const { deleteAll, deleteFile, isLoading } = useDeleteFiles(fetchedFiles)

  if (!Object.keys(fetchedFiles).length) {
    return null
  }

  const sizeTotal = formatBytes(fetchedFiles.reduce((a: any, b: any) => a + b.size, 0))

  return (
    <FileDetailsWrapper>
      <FileDetailsTitle>Fetched Files</FileDetailsTitle>
      <FileDetailsTotal>Total Fetched Size: {sizeTotal}</FileDetailsTotal>
      <FileDetailsSaved>Saved: {formatBytes(deletedFileSize)}</FileDetailsSaved>
    </FileDetailsWrapper>
  )
}

FileDetails.displayName = 'File Details'

const FileDetailsWrapper = styled.div``

const FileDetailsTitle = styled.h2`
  color: var(--color-purple);
  margin: 0;
  margin-bottom: 1rem;
  font-size: 2.2rem;
`

const FileDetailsTotal = styled.p`
  margin: 0;
`

const FileDetailsSaved = styled.p`
  margin: 0;
`
