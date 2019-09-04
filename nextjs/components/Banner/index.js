import React, { Component } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { Button } from 'antd'

class Banner extends Component {
  render() {
    return (
      <Wrapper>
        <Container>
          <AnimatedLeftSection />
        </Container>
      </Wrapper>
    )
  }
}

const AnimatedLeftSection = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })
  return (
    <LeftSection {...props}>
      <Title>codeleak</Title>
      <Headline>
        <LaptopEmoji>💻</LaptopEmoji>&nbsp; A whole new experience of asking and answering code-related questions
      </Headline>
      <div>
        <Button icon="play-circle" type="primary">
          watch demo
        </Button>
      </div>
    </LeftSection>
  )
}

const Wrapper = styled.div`
  color: white;
  height: 380px;
  overflow: hidden;
  .ant-form-item {
    margin: 0 0 5px 0;
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 8px;
  @media screen and (max-width: 740px) {
    flex-direction: column;
    margin-top: 80px;
  }
`

const LeftSection = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45%;
  margin: 0 auto;
  text-align: center;
  @media screen and (max-width: 740px) {
    width: 100%;
    margin-top: 0;
    text-align: center;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16px;
`

const Headline = styled.p`
  font-size: 1.2rem;
  color: #314659;
  margin-bottom: 16px;
`

const LaptopEmoji = styled.span`
  @media screen and (max-width: 740px) {
    display: none;
  }
`

export default Banner
