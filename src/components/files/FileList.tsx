import React, { FC } from 'react'
import styled from 'styled-components'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'

import useDeleteFiles from '../../hooks/useDeleteFiles'
import useFetchFiles from '../../hooks/useFetchFiles'

import { FileResponse } from '../../../shared'
import { formState, fetchedFilesState, fetchedPagesState } from '../../state'

import { FileDisplayItem } from './FileDisplayItem'

export const FileList: FC = () => {
  const { fetchFiles } = useFetchFiles()

  const formData = useRecoilValue(formState)
  const fetchedFiles = useRecoilValue(fetchedFilesState)
  const { pages, page } = useRecoilValue(fetchedPagesState)
  const { deleteFile } = useDeleteFiles(fetchedFiles)

  const handlePrevButton = () => {
    fetchFiles(formData, page - 1)
  }

  const handleNextButton = () => {
    fetchFiles(formData, page + 1)
  }

  return (
    <FileListWrapper>
      <FileListItems>
        <FileListList>
          {fetchedFiles.map((file: FileResponse) => (
            <FileDisplayItem key={file.id} file={file} handleDelete={deleteFile} />
          ))}
        </FileListList>
        {pages > 1 ? (
          <>
            <button disabled={page <= 1} onClick={handlePrevButton}>
              Prev Page
            </button>
            <p>
              {page}/{pages}
            </p>
            <button disabled={page === pages} onClick={handleNextButton}>
              Next Page
            </button>
          </>
        ) : null}
      </FileListItems>
    </FileListWrapper>
  )
}

FileList.displayName = 'File List Section'

const FileListWrapper = styled.div`
  flex: 1;
`
const FileListItems = styled.div``

const FileListList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`
