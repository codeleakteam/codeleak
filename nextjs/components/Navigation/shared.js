import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

export const Anchor = styled.a`
  color: ${props => (!props.isActive ? 'black' : props.theme.antBlue)};
  font-weight: 500;
`

export const ListItem = styled.li`
  display: block;
  padding: 0 1rem;
  font-size: 0.75rem;
  vertical-align: middle;
  text-transform: uppercase;
  @media screen and (max-width: 745px) {
    padding: 0;
    margin-left: 16px;
  }
  &:last-of-type {
    padding-right: 0;
  }
`
