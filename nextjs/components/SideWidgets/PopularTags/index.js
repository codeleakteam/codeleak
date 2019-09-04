import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CustomIcon from '../../../assets/icons'
import _ from 'lodash'

const PopularTags = props => {
  return (
    <Wrapper {...props}>
      <Title>Popular tags</Title>
      <List>
        <TagWrapper>
          <Link href="/development">
            <a>React</a>
          </Link>
          <CustomIcon width="24px" height="24px" style={{ marginRight: '8px' }} name="react" />
        </TagWrapper>
        <TagWrapper>
          <Link href="/development">
            <a>Angular</a>
          </Link>

          <CustomIcon width="24px" height="24px" style={{ marginRight: '8px' }} name="angular" />
        </TagWrapper>
        <TagWrapper>
          <Link href="/development">
            <a>Vue</a>
          </Link>
          <CustomIcon width="24px" height="24px" style={{ marginRight: '8px' }} name="vue" />
        </TagWrapper>
        <TagWrapper>
          <Link href="/development">
            <a>Svelte</a>
          </Link>

          <CustomIcon width="24px" height="24px" style={{ marginRight: '8px' }} name="svelte" />
        </TagWrapper>
        <TagWrapper>
          <Link href="/development">
            <a>Ember</a>
          </Link>

          <CustomIcon width="24px" height="24px" style={{ marginRight: '8px' }} name="ember" />
        </TagWrapper>
      </List>
    </Wrapper>
  )
}

const TagWrapper = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  margin-bottom: 8px;
  background: ${props => props.theme.antTagGrey};
  border-radius: 5px;
  /* border-bottom: 1px solid ${props => props.theme.lightGrey}; */
`

PopularTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
}

const Wrapper = styled.div`
  background: white;
  padding: 0.9rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`

const Title = styled.h4`
  color: #000;
  font-weight: bold;
  font-size: 20px;
`

const List = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 4px;
  margin: -2px;
`
export default PopularTags
