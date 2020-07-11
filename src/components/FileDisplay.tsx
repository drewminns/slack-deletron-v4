import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { FileResponse } from '../../shared'
import { fetchedFilesState } from '../state'

export const FileDisplay: FC = () => {
  const [fetchedFiles] = useRecoilState(fetchedFilesState)

  if (!Object.keys(fetchedFiles).length) {
    return null
  }

  return (
    <main>
      <ul>
        {fetchedFiles.files.map((file: FileResponse) => (
          <li key={file.id}>{file.id}</li>
        ))}
      </ul>
    </main>
  )
}

FileDisplay.displayName = 'File Display Section'
