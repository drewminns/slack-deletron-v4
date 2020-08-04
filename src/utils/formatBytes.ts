export function formatBytes(bytes: number, decimals = 2): { amount: number; unit: string } {
  if (bytes === 0) return { amount: 0, unit: 'B' }

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return { amount: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), unit: sizes[i] }
}
