import * as Sentry from '@sentry/node'
const SENTRY_CONFIG = process.env.SENTRY_CONFIG

if (SENTRY_CONFIG) {
  Sentry.init({
    dsn: SENTRY_CONFIG,
    environment: process.env.NODE_ENV,
  })
} else {
  console.log('Sentry not configured')
}

export const captureMessage = Sentry.captureMessage
export const captureException = Sentry.captureException
