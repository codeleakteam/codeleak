import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  @media screen and (max-width: 750px) {
    display: none;
    ${props =>
      props.isResponsive &&
      css`
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
  }
`

export const Anchor = styled.a`
  color: ${props => (props.isActive ? props.theme.antBlue : 'grey')};
`

export const ListItem = styled.li`
  display: inline-block;
  padding: 0 1rem;
  font-size: 1rem;
  vertical-align: middle;
  @media screen and (max-width: 745px) {
    margin-bottom: 1rem;
    padding: 0;
  }
  &:last-of-type {
    padding-right: 0;
  }
`
