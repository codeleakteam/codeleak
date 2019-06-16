import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input, Button } from 'antd'

const { TextArea } = Input

class AddComment extends Component {
  state = {
    commentVisible: false,
    commentText: '',
  }

  static propTypes = {
    objectId: PropTypes.number.isRequired,
    submitComment: PropTypes.func.isRequired,
  }

  showCommentField = () => {
    this.setState(state => {
      return {
        commentVisible: !state.commentVisible,
      }
    })
  }

  handleCommentText = e => {
    this.setState({ commentText: e.target.value })
  }

  cleanAfterSend = e => {
    this.setState({ commentVisible: false, commentText: '' })
  }

  render() {
    const { commentVisible } = this.state
    return (
      <Wrapper>
        <StyledButton default onClick={this.showCommentField}>
          Quick comment
        </StyledButton>
        {commentVisible && (
          <React.Fragment>
            <StyledTextArea placeholder="Add comment" onChange={this.handleCommentText} />
            <Button
              type="primary"
              onClick={() => {
                this.props.submitComment(this.props.objectId, 2, this.state.commentText)
                this.cleanAfterSend()
              }}
            >
              Send
            </Button>
          </React.Fragment>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`

const StyledTextArea = styled(TextArea)`
  margin-bottom: 8px;
`

const StyledButton = styled(Button)`
  margin: 8px 0;
`
export default AddComment
