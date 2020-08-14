import * as Sentry from '@sentry/react'
import React from 'react'
import styled from 'styled-components'

const SENTRY_CONFIG = process.env.SENTRY_CONFIG

if (SENTRY_CONFIG) {
  const config = {
    dsn: SENTRY_CONFIG,
    environment: process.env.NODE_ENV,
    release: process.env.NODE_ENV !== 'development' ? 'SlackDeletron@' + process.env.SENTRY_RELEASE : undefined,
  }

  Sentry.init(config)
} else {
  console.warn('Sentry not configured')
}

export const ErrorBoundary = ({ children }: any) => {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, componentStack, resetError }) => (
        <ErrorBody>
          <div>
            <p>
              There was an error in loading this page.{' '}
              <ErrorButton
                onClick={() => {
                  resetError()
                }}
              >
                Reload this page
              </ErrorButton>
            </p>
            <p>{error?.toString()}</p>
            <p>{componentStack}</p>
          </div>
        </ErrorBody>
      )}
      showDialog
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}

const ErrorBody = styled.div`
  padding: 25px;
`

const ErrorButton = styled.button`
  cursor: pointer;
  appearance: none;
  background: var(--black);
  color: var(--white);
  border: none;
  padding: 8px 15px;
`

export const captureMessage = Sentry.captureMessage
export const captureEvent = Sentry.captureEvent
export const captureException = Sentry.captureException
