import styled from 'styled-components'
import Card from '../Card'

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`

const Section = styled.div`
  margin-bottom: 40px;
`

const SectionHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;
`

const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
`

const StyledCard = styled(Card)`
  padding: 2rem;
<<<<<<< HEAD:components/Legal/shared.js
  @media screen and (max-width: 768px){
=======
  @media screen and (max-width: 768px) {
>>>>>>> documentation:components/Legal/shared.js
    padding: 1rem;
  }
`

const Ul = styled.ul`
  margin-left: 32px;
  font-size: 1rem;
  li {
    list-style-type: disc;
    margin-bottom: 8px;
  }
`

export { Title, Section, SectionHeading, Text, StyledCard, Ul }
