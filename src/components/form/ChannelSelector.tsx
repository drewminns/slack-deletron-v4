import React, { FC } from 'react'
import styled from 'styled-components'

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
  border-radius: var(--br);
  padding: 5px;
  width: 100%;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  font-size: var(--size-font-small);
  border: 1px solid var(--color-purple);
  position: relative;

  &:focus,
  &:active {
    border: 1px solid var(--color-purple);
  }
`
