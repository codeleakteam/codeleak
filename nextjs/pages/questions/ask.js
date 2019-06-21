import React, { Component } from 'react'
import styled from 'styled-components'
import TwoSideLayout from '../../components/TwoSideLayout'
import AskQuestion from '../../components/AskQuestion'
import AskGuide from '../../components/SideWidgets/AskGuide'

class Ask extends Component {
	render() {
		return (
			<div>
				<Title>Ask a question</Title>
				<TwoSideLayout mainSectionElement={<AskQuestion />} rightSectionElement={<AskGuide />} />
			</div>
		)
	}
}

const Title = styled.h3`
	font-size: 1.6rem;
	font-weight: bold;
`

export default Ask
