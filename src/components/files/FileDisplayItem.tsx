import React, { FC, useEffect, useState } from 'react'
import { fromUnixTime, format } from 'date-fns'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'

import { ReactComponent as Trash } from '../../assets/trash.svg'
import { formatBytes } from '../../utils'
import { Button } from '../common/Button'
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
        <div style={{ flex: 1 }}>
          <ItemTitle>{file.name}</ItemTitle>
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
        <Button
          hideTextOnMobile
          isLoading={isDeleting}
          color={'orange'}
          icon={<Trash />}
          onClick={() => deleteFile(file.id, file.size)}
        >
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
  width: 100%;

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

const ItemTitle = styled.p`
  overflow: hidden;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  letter-spacing: 0.11em;
  font-size: var(--fs);
`

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  width: 85%;

  ${device.sm`
    width: 60%;
  `}
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
    flex: 0 0 100px;
  `}

  p {
    margin: 0;
    font-size: var(--fs);
    line-height: 1.3;

    ${device.sm`
      font-size: var(--fs-lg);
    `}
  }
`

const ItemDetails = styled.p`
  font-size: var(--fs-xs);
  margin: 0;
  line-height: 1.3;

  ${device.sm`
      font-size: var(--fs-sm);
      margin-top: 1em;
      margin-bottom: 0;
  `}
`

const ItemLink = styled.a`
  font-size: var(--fs-sm);
  color: var(--black);
  margin-right: 25px;
  display: none;
  text-align: center;
  line-height: 1.2;

  ${device.sm`
    display: block;
  `}
`

const ItemActions = styled.div`
  align-items: center;
  padding-left: 5px;

  ${device.sm`
    display: flex;
  `}

  ${device.md`
    display: flex;
  `}
`
