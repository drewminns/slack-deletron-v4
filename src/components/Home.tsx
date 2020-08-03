import React, { FC } from 'react'
import styled from 'styled-components'

import { Logo } from './common/Logo'

export const Home: FC = () => (
  <HomeWrapper>
    <HomeContent>
      <Logo />
      <HomeSlogan>
        <LineBreak>Search</LineBreak> <LineBreak>Manage</LineBreak> <LineBreak>Delete</LineBreak>{' '}
      </HomeSlogan>
      <HomeCopy>
        <LineBreak>Delete Slack Files from your workspace using the Slack API.</LineBreak>{' '}
        <LineBreak>Security and privacy are the goal.</LineBreak>
      </HomeCopy>
      <HomeLink href="/api/auth/login">Login with Slack</HomeLink>
    </HomeContent>
  </HomeWrapper>
)

Home.displayName = 'Home'

const LineBreak = styled.span`
  display: block;
`

const HomeWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`
const HomeContent = styled.div`
  margin: auto;
  text-align: center;
`

const HomeSlogan = styled.h2`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: var(--fs-xxl);
  margin: 0;
  line-height: 120%;
  margin: 30px 0 40px;
`

const HomeCopy = styled.p`
  font-size: var(--fs);
  margin-bottom: 40px;
`

const HomeLink = styled.a`
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  font-size: var(--fs-sm);
  background-color: var(--orange);
  color: var(--white);
  padding: 16px 40px;
  border-radius: 50px;
  letter-spacing: 0.1em;
`