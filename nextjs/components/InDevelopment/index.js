import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Result, Button } from 'antd'

export default function() {
  return (
    <Wrapper>
      <Result
        status="500"
        title="We are still developing this page"
        subTitle="Please stay tuned"
        extra={
          <Link href="/">
            <a>
              <Button type="primary">Back Home</Button>
            </a>
          </Link>
        }
      />
      ,
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-result-icon {
    text-align: center;
  }
  .ant-result-image {
    width: 250px;
    height: 295px;
    margin: 0 auto 24px auto;
  }
  .ant-result-title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }
  .ant-result-subtitle {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 32px;
  }
  .ant-result-extra {
    text-align: center;
  }
`
