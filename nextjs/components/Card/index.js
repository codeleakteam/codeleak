import styled, { css } from 'styled-components'

const Card = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.lightGrey};
  width: ${props => (!props.isComment ? '100%' : '60%')};
  align-self: ${props => (!props.isComment ? 'flex-start' : 'flex-end')};
  padding: ${props => (!props.isComment ? '1rem' : '0.65rem')};
  margin-bottom: ${props => (!props.isComment ? '0.5rem' : '0.1875rem')};
  border-radius: 8px;
  transition: all 0.1s ease-in-out;
  ${props =>
    props.isHoverable &&
    css`
      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
        border-color: rgba(0, 0, 0, 0.09);
      }
    `}
`

export default Card
