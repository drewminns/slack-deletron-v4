import React, { FC } from 'react'
import { fromUnixTime, format } from 'date-fns'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { formatBytes } from '../../utils'
import { queuedFilesState } from '../../state'
import { Button } from '../common/Button'
import { Title } from '../common/Title'

import { FileResponse } from '../../../shared'

type FileDisplayItemProps = {
  file: FileResponse
  handleDelete?: (id: string, size: number) => void
}

export const FileDisplayItem: FC<FileDisplayItemProps> = ({ file, handleDelete }: FileDisplayItemProps) => {
  const [queuedFiles, setQueuedFiles] = useRecoilState(queuedFilesState)
  const filetyperegex = /(pdf|jpeg|gif|mp4|png)/gi

  return (
    <ItemWrapper>
      <ItemInfo>
        <Title type="h2">{file.name}</Title>
        <p>Created: {format(fromUnixTime(file.created), 'MMMM dd, yyyy - HH:mm')}</p>
        <ItemDetails>
          <p>Size: {formatBytes(file.size)}</p>
          <p>Type: {file.filetype}</p>
        </ItemDetails>
      </ItemInfo>
      <ItemActions>
        {filetyperegex.test(file.mimetype) == true && (
          <a href={file.url_private} target="_blank" rel="noopener noreferrer" className="inline-block mb-2">
            View File
          </a>
        )}
        <a href={file.url_private_download} download className="inline-block mb-2">
          Download File
        </a>
        {handleDelete && (
          <>
            <Button handleClick={() => handleDelete(file.id, file.size)}>Delete File</Button>
            <Button handleClick={() => setQueuedFiles([...queuedFiles, file])}>Add To Queue</Button>
          </>
        )}
      </ItemActions>
    </ItemWrapper>
  )
}

FileDisplayItem.displayName = 'File Display Item'

const ItemWrapper = styled.div`
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ItemInfo = styled.div``
const ItemDetails = styled.div`
  display: flex;
`
const ItemActions = styled.div``
