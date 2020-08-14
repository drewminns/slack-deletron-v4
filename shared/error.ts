import * as Sentry from '@sentry/node'
const { SENTRY_CONFIG } = process.env || ''

Sentry.init({
  dsn: SENTRY_CONFIG,
})

export const captureMessage = Sentry.captureMessage
export const captureException = Sentry.captureException
