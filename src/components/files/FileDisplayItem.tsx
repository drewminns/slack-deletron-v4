import React, { FC, useEffect, useState } from 'react'
import { fromUnixTime, format } from 'date-fns'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'

import { ReactComponent as Close } from '../../assets/close.svg'
import { formatBytes } from '../../utils'
import { Button } from '../common/Button'
import { Title } from '../common/Title'
import { userDetailsState } from '../../state'
import { device } from '../../styles'

import useDeleteFiles from '../../hooks/useDeleteFiles'

import { FileResponse } from '../../../shared'

type FileDisplayItemProps = {
  file: FileResponse
}

export const FileDisplayItem: FC<FileDisplayItemProps> = ({ file }: FileDisplayItemProps) => {
  const [channel, setChannel] = useState({ isChannel: false, name: '' })
  const { channels } = useRecoilValue(userDetailsState)
  const { deleteFile, isDeleting } = useDeleteFiles()
  const filetyperegex = /(pdf|jpeg|gif|mp4|png)/gi

  useEffect(() => {
    const channel = file.channels[0]
    const im = file.ims[0]
    if (channel) {
      for (const i in channels.channels) {
        if (channels.channels[i].id === channel) {
          setChannel({ isChannel: true, name: channels.channels[i].name })
          break
        }
      }
    } else if (im) {
      for (const i in channels.ims) {
        if (channels.ims[i].id === im) {
          setChannel({ isChannel: false, name: channels.ims[i].user_name })
          break
        }
      }
    } else {
      setChannel({ isChannel: false, name: 'Multiple Users' })
    }
  }, [])

  const { amount, unit } = formatBytes(file.size)

  return (
    <ItemEl>
      <ItemContent>
        <ItemSize>
          <p>{amount}</p>
          <p>{unit}</p>
        </ItemSize>
        <div>
          <Title type="p">{file.name}</Title>
          <ItemDetails>
            {channel.isChannel ? 'Posted' : 'Shared'} {format(fromUnixTime(file.created), 'MMMM dd, yyyy - HH:mm')}{' '}
            {channel.isChannel ? `in #${channel.name}` : `with ${channel.name}`}
          </ItemDetails>
        </div>
      </ItemContent>
      <ItemActions>
        {filetyperegex.test(file.mimetype) == true && (
          <ItemLink href={file.url_private} target="_blank" rel="noopener noreferrer">
            View File
          </ItemLink>
        )}
        <ItemLink href={file.url_private_download} download>
          Download File
        </ItemLink>
        <Button isLoading={isDeleting} color={'orange'} icon={<Close />} onClick={() => deleteFile(file.id, file.size)}>
          Delete File
        </Button>
      </ItemActions>
    </ItemEl>
  )
}

FileDisplayItem.displayName = 'File Display Item'

const ItemEl = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  position: relative;

  ${device.sm`
    padding: 0 40px 15px;
  `}

  &:after {
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    bottom: 0;
    height: 1px;
    background-color: var(--grey);

    ${device.sm`
      width: 90%;
      left: 5%;
    `}
  }

  &:last-child {
    &:after {
      display: none;
    }
  }
`

const ItemContent = styled.div`
  display: flex;
  align-items: center;
`

const ItemSize = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 55px;
  margin-right: 10px;
  border-right: 1px solid var(--black);
  padding-right: 10px;

  ${device.sm`
    padding: 10px 30px 10px 0;
    margin-right: 30px;
    width: 100px;
  `}

  p {
    margin: 0;
    font-size: var(--fs);

    ${device.sm`
      font-size: var(--fs-lg);
    `}
  }
`

const ItemDetails = styled.p`
  font-size: var(--fs-sm);
  margin: 0;

  ${device.sm`
      margin-top: 1em;
      margin-bottom: 0;
  `}
`

const ItemLink = styled.a`
  font-size: var(--fs-sm);
  color: var(--black);
  margin-right: 25px;
`

const ItemActions = styled.div`
  display: none;
  align-items: center;

  ${device.sm`
    display: block;
  `}

  ${device.md`
    display: flex;
  `}
`
