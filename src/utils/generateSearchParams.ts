import { parseISO, getUnixTime, addDays } from 'date-fns'

export const generateSearchParams = (formdata: any, user: string, token: string) => {
  let types = ''
  const params: any = { token, count: '50', show_files_hidden_by_limit: true, user }
  for (const [key, value] of Object.entries(formdata)) {
    if (key === 'channels' && value !== 'ALL') {
      params.channel = formdata.channels
    } else if (value === true && key !== 'displayDate') {
      types += `${key},`
    } else if (key === 'startDate') {
      params.ts_from = getUnixTime(parseISO(value as string))
    } else if (key === 'endDate') {
      params.ts_to = getUnixTime(addDays(parseISO(value as string), 1))
    }
  }

  if (types.length) {
    types = types.substring(0, types.length - 1)
  }

  return new URLSearchParams({ ...params, types })
}
