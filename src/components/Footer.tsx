import React, { FC } from 'react'
import styled from 'styled-components'
import { getYear } from 'date-fns'

import { ReactComponent as Twitter } from '../assets/twitter.svg'

type AboutProps = {
  handleAboutVisibility: (val: boolean) => void
}

export const Footer: FC<AboutProps> = ({ handleAboutVisibility }: AboutProps) => (
  <FooterEl>
    <FooterSection>
      <FooterCopy onClick={() => handleAboutVisibility(true)}>Questions?</FooterCopy>
      <FooterCopy>
        <a href="https://twitter.com/intent/tweet?text=Manage%20Slack%20files%20easier%20with%20the%20Slack%20Deletron.%20https://slackdeletron.com&via=drewisthe">
          <Twitter /> Share Slack Deletron
        </a>
      </FooterCopy>
    </FooterSection>
    <FooterSection>
      <FooterCopy>
        &#169; {getYear(new Date())}{' '}
        <a href="https://drewminns.com" rel="noreferrer noopener">
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
  padding: 5px 25px 5px;
`

const FooterSection = styled.div`
  display: flex;
`

const FooterCopy = styled.p`
  font-size: var(--fs-sm);
  margin-right: var(--fs);

  a {
    color: inherit;
  }
`
