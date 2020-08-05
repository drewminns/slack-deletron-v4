import React, { FC } from 'react'
import styled from 'styled-components'
import chevronUrl from '../../assets/chevron.svg'

import { FilteredChannels, IMResponse } from '../../../shared'
import { Label } from '../common/Label'

type ChannelSelectorProps = {
  register: () => any
  ims: IMResponse[]
  channels: FilteredChannels[]
}

export const ChannelSelector: FC<ChannelSelectorProps> = ({ register, ims, channels }: ChannelSelectorProps) => (
  <>
    <Label forValue="channels">Channel</Label>
    <ChannelSelect name="channels" id="channels" ref={register}>
      <option value="ALL">All Files</option>
      <optgroup label="Channels">
        {channels.map((channel) => (
          <option key={channel.id} value={channel.id}>
            {channel.name}
          </option>
        ))}
      </optgroup>
      <optgroup label="Direct Messages">
        {ims.map((im) => (
          <option key={im.id} value={im.user}>
            {im.user_name}
          </option>
        ))}
      </optgroup>
    </ChannelSelect>
  </>
)

ChannelSelector.displayName = 'Channel Selector'

const ChannelSelect = styled.select`
  appearance: none;
  padding: 7px 15px 7px 10px;
  width: 100%;
  letter-spacing: 0.11em;
  font-size: var(--fs);
  color: var(--white);
  background-color: var(--black);
  border: 1px solid var(--white);
  position: relative;
  background-image: url(${chevronUrl});
  background-repeat: no-repeat;
  background-position: 96% center;
  outline: none;

  &:focus,
  &:active {
    font-size: 16px;
    border: 1px solid var(--orange);
  }
`
