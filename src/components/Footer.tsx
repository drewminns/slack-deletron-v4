import React, { FC } from 'react'
import styled from 'styled-components'
import { getYear } from 'date-fns'

import { device } from '../styles'

import { ReactComponent as Twitter } from '../assets/twitter.svg'

type AboutProps = {
  handleAboutVisibility: (val: boolean) => void
}

export const Footer: FC<AboutProps> = ({ handleAboutVisibility }: AboutProps) => (
  <FooterEl>
    <FooterSection>
      <FooterCopy>
        <FooterButton onClick={() => handleAboutVisibility(true)}>What is this?</FooterButton>
      </FooterCopy>
      <FooterCopy>
        <a href="https://twitter.com/intent/tweet?text=Manage%20Slack%20files%20easier%20with%20the%20Slack%20Deletron.%20https://slackdeletron.com&via=drewisthe">
          <Twitter /> Share Slack Deletron
        </a>
      </FooterCopy>
    </FooterSection>
    <FooterSection>
      <FooterCopy>
        &#169; {getYear(new Date())}{' '}
        <a href="https://drewminns.com" rel="noopener">
          Drew Minns
        </a>
      </FooterCopy>
    </FooterSection>
  </FooterEl>
)

Footer.displayName = 'Footer'

const FooterEl = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--grey);
  padding: 5px 10px 10px;
  flex-direction: column;

  ${device.sm`
    flex-direction: row;
    padding: 5px 25px 5px;
  `}
`

const FooterSection = styled.div`
  display: flex;
  align-items: center;
`

const FooterCopy = styled.p`
  font-size: var(--fs-sm);
  margin: 5px var(--fs) 5px 0;

  a {
    color: inherit;

    &:focus {
      outline-color: var(--orange);
    }
  }
`

const FooterButton = styled.button`
  background-color: var(--black);
  color: var(--white);
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.11em;
  padding: 8px 13px;
  border-radius: 50px;
  border: none;

  &:focus {
    outline-color: var(--orange);
  }

  &:hover {
    opacity: 0.8;
  }
`
