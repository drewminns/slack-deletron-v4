import React, { FC, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useRecoilValue } from 'recoil'

import useFetchFiles from '../../hooks/useFetchFiles'

import { FileResponse } from '../../../shared'
import { formState, fetchedFilesState, fetchedPagesState } from '../../state'

import { FileDisplayItem } from './FileDisplayItem'
import { Button } from '../common/Button'

type FilesListProps = {
  isDeleting: boolean
}

export const FileList: FC<FilesListProps> = ({ isDeleting }: FilesListProps) => {
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
      <FileListList isDeleting={isDeleting}>
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
      {isDeleting && (
        <DeletingBackground>
          <DeletingText aria-live="assertive">Deleting {fetchedFiles.length} Files</DeletingText>
        </DeletingBackground>
      )}
    </>
  )
}

FileList.displayName = 'File List Section'

const FileListList = styled.ul<{ isDeleting: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
  ${(props) =>
    props.isDeleting &&
    css`
      user-select: none;
      pointer-events: none;
    `}
`
const DeletingBackground = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
`

const DeletingText = styled.p`
  margin: auto;
  text-transform: uppercase;
  font-size: var(--fs-lg);
  font-weight: 400;
  letter-spacing: 0.11em;
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
