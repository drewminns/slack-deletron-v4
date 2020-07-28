import React, { FC } from 'react'
import { useDeleteFiles } from '../../hooks/useDeleteFiles'
import styled from 'styled-components'

import { FileResponse } from '../../../shared'

import { FileDisplayItem } from './FileDisplayItem'

type FileListProps = {
  files: FileResponse[]
}

export const FileList: FC<FileListProps> = ({ files }: FileListProps) => {
  const { deleteFile } = useDeleteFiles(files)

  return (
    <FileListWrapper>
      <FileListItems>
        <FileListList>
          {files.map((file) => (
            <FileDisplayItem key={file.id} file={file} handleDelete={deleteFile} />
          ))}
        </FileListList>
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
