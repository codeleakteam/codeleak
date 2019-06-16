import styled from 'styled-components'

const Card = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.darkGrey};
  padding: 1rem;
  margin-bottom: 16px;
  border-radius: 8px;
`

export default Card
