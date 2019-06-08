import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Logo from '../Logo'

import classes from './index.scss'

const Footer = () => {
  let copyrightDate = new Date().getFullYear()
  return (
    <Wrapper>
      <Container>
        <ul>
          <li>
            <Logo />
          </li>
          <li>codeLeak &copy; {copyrightDate}</li>
        </ul>
        <ul>
          <li>codeLeak</li>
          <li>
            <Link href="/">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>developers</li>
          <li>
            <Link href="/">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Jobs</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Tags</a>
            </Link>
          </li>
        </ul>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.dirtyWhite};
`

const Container = styled.footer`
  max-width: 940px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  @media screen and (max-width: 745px) {
    flex-direction: column;
  }
`

export default Footer
