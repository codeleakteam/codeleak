import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  @media screen and (max-width: 745px) {
    display: none;
  }
  ${props =>
    props.isResponsive &&
    css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `}
`

export const Anchor = styled.div`
  color: ${props => (props.isActive ? '#000' : 'white')};
`

export const ListItem = styled.li`
  display: inline-block;
  padding: 0 8px;
  font-size: 16px;
  vertical-align: middle;
  @media screen and (max-width: 745px) {
    margin-bottom: 16px;
    padding: 0;
  }
  &:last-of-type {
    padding-right: 0;
  }
`
