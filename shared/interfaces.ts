export interface JWT {
  token: string
  userId: string
  iat: number
}

export interface Profile {
  title: string
  phone: string
  skype: string
  real_name: string
  real_name_normalized: string
  display_name: string
  display_name_normalized: string
  status_text: string
  status_emoji: string
  status_expiration: number
  avatar_hash: string
  image_original: string
  first_name: string
  last_name: string
  image_24: string
  image_32: string
  image_48: string
  image_72: string
  image_192: string
  image_512: string
  image_1024: string
  status_text_canonical: string
  team: string
  is_custom_image: boolean
}

export interface User {
  ok: boolean
  error?: boolean
  user: {
    id: string
    team_id: string
    name?: string
    deleted?: boolean
    color?: string
    real_name?: string
    tz?: string
    tz_label?: string
    tz_offset?: number
    profile: Profile
    is_admin: boolean
    is_owner: boolean
    is_primary_owner: boolean
    is_restricted: boolean
    is_ultra_restricted: boolean
    is_bot: boolean
    is_app_user: boolean
    updated: Date
    has_2fa: boolean
    two_factor_type?: string
    enterprise_user: unknown
  }
}

export interface UserProfile {
  userId: string
  name?: string
  real_name: string
  display_name: string
  image: string
  is_admin: boolean
  is_owner: boolean
}

export interface UserResponse {
  success: boolean
  id: string
  real_name?: string
  admin: boolean
  updated: Date
  team_id: string
  display_name: string
  avatar_original: string
  avatar_512: string
  avatar_72: string
  first_name: string
  last_name: string
}

export interface User {
  ok: boolean
  error?: boolean
  user: {
    id: string
    team_id: string
    name?: string
    deleted?: boolean
    color?: string
    real_name?: string
    tz?: string
    tz_label?: string
    tz_offset?: number
    profile: Profile
    is_admin: boolean
    is_owner: boolean
    is_primary_owner: boolean
    is_restricted: boolean
    is_ultra_restricted: boolean
    is_bot: boolean
    is_app_user: boolean
    updated: Date
    has_2fa: boolean
    two_factor_type?: string
    enterprise_user: unknown
  }
}

export interface ChannelResponse {
  id: string
  name: string
  is_channel: boolean
  is_group: boolean
  is_im: boolean
  created: number
  creator: string
  is_archived: boolean
  is_general: boolean
  unlinked: number
  name_normalized: string
  is_shared: boolean
  is_ext_shared: boolean
  is_org_shared: boolean
  pending_shared: []
  is_pending_ext_shared?: boolean
  is_member: boolean
  is_private: boolean
  is_mpim: boolean
  previous_names?: []
  num_members: number
  topic: ChannelDetails
  purpose: ChannelDetails
  user?: string
}

export interface ChannelDetails {
  value?: string
  creator: string
  last_set: number
}

export interface IM {
  id: string
  is_org_shared: boolean
  created: number
  is_im: boolean
  user: string
  is_open?: boolean
  is_user_deleted?: boolean
  num_members: number
  priority: number
}

export interface IMResponse {
  id: string
  created: number
  is_archived: boolean
  is_im: boolean
  is_org_shared: boolean
  user: string
  is_user_deleted: boolean
  priority: number
  user_name?: string
}

export interface ConversationsList {
  ok: boolean
  channels: IMResponse[] | ChannelResponse[]
  error?: boolean
  response_metadata: {
    next_cursor: string
  }
}

export interface ChannelFetchResponse {
  channels: ChannelResponse[]
  ims: IMResponse[]
}

export interface FilteredChannels {
  id: string
  name: string
  is_channel: boolean
  is_group: boolean
  is_archived: boolean
  is_private: boolean
  creator: string
  created: number
}

export interface UserDetailsResponse {
  ok: boolean
  data: {
    channels: FilteredChannels
    profile: UserProfile
  }
}
