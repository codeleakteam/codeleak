import styled from 'styled-components'

const Card = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.lightGrey};
  width: ${props => (!props.isComment ? '100%' : '60%')};
  align-self: ${props => (!props.isComment ? 'flex-start' : 'flex-end')};
  padding: ${props => (!props.isComment ? '1rem' : '0.65rem')};
  margin-bottom: ${props => (!props.isComment ? '0.5rem' : '0.1875rem')};
  border-radius: 8px;
`

export default Card
