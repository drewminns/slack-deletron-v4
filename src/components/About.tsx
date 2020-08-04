import React, { FC } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import FocusLock from 'react-focus-lock'

import { device } from '../styles'
import { ReactComponent as Close } from '../assets/close.svg'
import { Title } from './common/Title'

type AboutProps = {
  handleAboutVisibility: (val: boolean) => void
}

export const About: FC<AboutProps> = ({ handleAboutVisibility }: AboutProps) => (
  <FocusLock>
    <GlobalStyled />
    <AboutWrapper>
      <AboutClose onClick={() => handleAboutVisibility(false)} data-autofocus>
        <AboutCloseText>Close</AboutCloseText>
        <Close />
      </AboutClose>
      <AboutContent>
        <Title type="h3">What is Slack Deletron?</Title>
        <p>
          Slack Deletron is a tool that allows users to search and delete files from your Slack account. Using the
          available Slack API tools, the Deletron stores nothing but an identifier to log in. All files are pulled
          directly from Slack itself.
        </p>
        <Title type="h3">Why make this thing?</Title>
        <p>
          Free Slack accounts have a limit of files that the space can host. After a while, old messages are deleted in
          place of file storage. Deleting files through Slack is a highly manual process, so using the Slack API, this
          app helps users bulk delete files.
        </p>
        <Title type="h3">Who made this?</Title>
        <p>
          <a href="https://drewminns.com" rel="noopener">
            Drew Minns
          </a>{' '}
          is a developer from Toronto, Canada. You can find his work on{' '}
          <a href="https://github.com/drewminns" rel="noreferrer noopener">
            Github
          </a>{' '}
          and you can find him on{' '}
          <a href="https://twitter.com/drewisthe" rel="noreferrer noopener">
            Twitter
          </a>
          .
        </p>
      </AboutContent>
    </AboutWrapper>
  </FocusLock>
)

About.displayName = 'About'

const GlobalStyled = createGlobalStyle`
  body {
    overflow-y: hidden
  }
`

const AboutWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--black);
  z-index: 300;
  color: var(--white);
  display: flex;
  align-items: center;
  overflow-y: auto;
`

const AboutClose = styled.button`
  appearance: none;
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px;
  background: none;
  border: 0;
  color: var(--white);

  &:focus,
  &:active {
    border: none;
  }
`
const AboutCloseText = styled.span`
  text-transform: uppercase;
  font-size: var(--fs-sm);
  letter-spacing: 0.11em;
  display: inline-block;
  margin-right: 7px;
`

const AboutContent = styled.div`
  padding: 30px;
  margin: auto;

  ${device.sm`
    width: 75%;
  `}

  a {
    color: var(--white);
  }

  p + p:last-of-type {
    margin-bottom: var(--fs-xl);
  }
`
