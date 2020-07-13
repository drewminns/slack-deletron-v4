import React, { FC } from 'react'
import { fromUnixTime, format } from 'date-fns'
import { useRecoilState } from 'recoil'

import { formatBytes } from '../../utils'
import { queuedFilesState } from '../../state/atoms'

import { FileResponse } from '../../../shared'

type FileDisplayItemProps = {
  file: FileResponse
  handleDelete?: (id: string, size: number) => void
}

export const FileDisplayItem: FC<FileDisplayItemProps> = ({ file, handleDelete }: FileDisplayItemProps) => {
  const [queuedFiles, setQueuedFiles] = useRecoilState(queuedFilesState)
  const filetyperegex = /(pdf|jpeg|gif|mp4)/gi

  return (
    <div className="border-b-2 pb-2 mb-2 border-black">
      <p>{file.title}</p>
      <p>Created: {format(fromUnixTime(file.created), 'MMMM dd, yyyy - HH:mm')}</p>
      <p>Size: {formatBytes(file.size)}</p>
      <p>Type: {file.filetype}</p>
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
          <button onClick={() => handleDelete(file.id, file.size)} className="inline-block mb-2">
            Delete File
          </button>
          <button onClick={() => setQueuedFiles([...queuedFiles, file])}>Add To Queue</button>
        </>
      )}
    </div>
  )
}
