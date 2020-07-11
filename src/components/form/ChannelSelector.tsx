import React, { FC } from 'react'

import { FilteredChannels, IMResponse } from '../../../shared'

type ChannelSelectorProps = {
  register: () => any
  ims: IMResponse[]
  channels: FilteredChannels[]
}

export const ChannelSelector: FC<ChannelSelectorProps> = ({ register, ims, channels }: ChannelSelectorProps) => (
  <div className="pb-2">
    <label htmlFor="channels" className="block">
      Channel
    </label>
    <select name="channels" id="channels" ref={register}>
      <option>All Files</option>
      <optgroup label="Channels">
        {channels.map((channel) => (
          <option key={channel.id}>{channel.name}</option>
        ))}
      </optgroup>
      <optgroup label="Direct Messages">
        {ims.map((im) => (
          <option key={im.id}>{im.user_name}</option>
        ))}
      </optgroup>
    </select>
  </div>
)

ChannelSelector.displayName = 'Channel Selector'
