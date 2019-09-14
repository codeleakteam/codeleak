import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import InputWithButton from '../../components/InputWithButton'
import Logo from '../../components/Logo'

const Landing = () => {
  return (
    <div>
      <Head>
        <title>codeLeak</title>
      </Head>
      <Banner>
        <InnerWrapper>
          <Logo size={42} />
          <Description>An online-editor based question and answer platform for developers</Description>
          <InputWithButton />
        </InnerWrapper>
      </Banner>
    </div>
  )
}

const Banner = styled.section`
  display: flex;
  justify-content: space-between;
  color: $black;
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  @media screen and (max-width: 940px) {
    padding: 150px 0 0;
  }
`

const InnerWrapper = styled.h3`
  color: white;
  font-size: 28px;
  line-height: 33px;
  font-weight: 300;
  margin-bottom: 10px;
  @media screen and (max-width: 740px) {
    font-size: 22px;
    line-height: 25px;
  }
`

const Description = styled.div`
  width: 70%;
  @media screen and (max-width: 940px) {
    width: 100%;
  }
`
export default Landing
