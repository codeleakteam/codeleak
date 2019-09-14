import React from 'react'
import styled from 'styled-components'
import { Input, Button } from 'antd'

const UrlTab = ({ url, handleUrlChange, onAddLink }) => {
  return (
    <Wrapper>
      <StyledInput value={url} onChange={handleUrlChange} size="small" />
      <Button onClick={onAddLink} size="small">
        ADD LINK
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
`

const StyledInput = styled(Input)`
  width: 120px;
  margin-right: 8px;
`

export default UrlTab
