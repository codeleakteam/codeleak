import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Input } from 'antd'
import Link from 'next/link'

const { TextArea } = Input

export default class PostCTAS extends React.Component {
  static propTypes = {
    // Not used yet
    postType: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    updateScore: PropTypes.func.isRequired,
    updatedScore: PropTypes.number,
    disableAnswerWithCode: PropTypes.bool.isRequired,
    object: PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string,
    }),
  }

  static defaultProps = {
    disableAnswerWithCode: false,
  }

  state = {
    isCommentVisible: false,
    commentValue: '',
  }
  toggleCommentVisibility = () =>
    this.setState(prevState => ({
      ...prevState,
      isCommentVisible: !prevState.isCommentVisible,
    }))

  handleCommentInputChange = e => this.setState({ commentValue: e.target.value })

  render() {
    const { id, score, updatedScore, object } = this.props
    return (
      <Column>
        <Row>
          <div>
            <VoteButton onClick={() => this.props.updateScore('true', id, 1)}>
              <VoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
              <CounterValue>{updatedScore ? updatedScore : score}</CounterValue>
            </VoteButton>
            <VoteButton onClick={() => this.props.updateScore('false', id, 1)}>
              <DownvoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
            </VoteButton>
          </div>
          <RightSide>
            {!this.props.disableAnswerWithCode && (
              <Link href={`/question/${object.id}/${object.slug}/answer`}>
                <Button type="primary">Answer with code</Button>
              </Link>
            )}
            <StyledToggleQuickCommentButton default onClick={this.toggleCommentVisibility}>
              {!this.state.isCommentVisible ? 'Quick comment' : 'Close'}
            </StyledToggleQuickCommentButton>
          </RightSide>
        </Row>
        {this.state.isCommentVisible && (
          <Column>
            <StyledTextArea placeholder="Add comment" onChange={this.handleCommentInputChange} />
            <StyledSendAnswerButton
              type="primary"
              onClick={() => {
                this.props.submitComment(this.props.id, 1, this.state.commentValue)
                this.toggleCommentVisibility()
              }}
            >
              Send your comment
            </StyledSendAnswerButton>
          </Column>
        )}
      </Column>
    )
  }
}

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
`
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const VoteButton = styled.button`
  padding: 0.25rem 0.75rem;
  border: 1px solid #e0e0e0;
  background: 0 0;
  border-radius: 1000px;
  cursor: pointer;
  line-height: 1;
  margin-right: 0.5rem;
  outline: 0;
`
const CounterValue = styled.span`
  color: #4d4d4d;
  font-weight: bold;
`
const VoteIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 7px;
`
const DownvoteIcon = styled(VoteIcon)`
  transform: rotate(180deg);
  margin: 0;
`
const RightSide = styled.div`
  margin-right: -5px;
`

const StyledTextArea = styled(TextArea)`
  margin-bottom: 8px;
`

const StyledToggleQuickCommentButton = styled(Button)`
  margin: 8px 5px;
`

const StyledSendAnswerButton = styled(Button)`
  width: 100%;
`
