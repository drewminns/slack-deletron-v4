import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'

import useFetchFiles from '../../hooks/useFetchFiles'

import { FileResponse } from '../../../shared'
import { formState, fetchedFilesState, fetchedPagesState } from '../../state'

import { FileDisplayItem } from './FileDisplayItem'
import { Button } from '../common/Button'

export const FileList: FC = () => {
  const { fetchFiles } = useFetchFiles()

  const formData = useRecoilValue(formState)
  const fetchedFiles = useRecoilValue(fetchedFilesState)
  const { pages, page } = useRecoilValue(fetchedPagesState)

  const handlePrevButton = () => {
    fetchFiles(formData, page - 1)
  }

  const handleNextButton = () => {
    fetchFiles(formData, page + 1)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <>
      <FileListList>
        {fetchedFiles.map((file: FileResponse) => (
          <FileDisplayItem key={file.id} file={file} />
        ))}
      </FileListList>
      {pages > 1 ? (
        <PaginateContainer>
          <Button disabled={page <= 1} onClick={handlePrevButton}>
            Prev Page
          </Button>
          <p>
            {page}/{pages}
          </p>
          <Button disabled={page === pages} onClick={handleNextButton}>
            Next Page
          </Button>
        </PaginateContainer>
      ) : null}
    </>
  )
}

FileList.displayName = 'File List Section'

const FileListList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`

const PaginateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
  position: sticky;
  top: 0;
  width: 100%;

  & > * {
    margin-left: 10px;
  }
`
