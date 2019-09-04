import React, { Component } from 'react'
import { Input, Button } from 'antd'
import PropTypes from 'prop-types'

import classes from './index.scss'

const { TextArea } = Input

class AddComment extends Component {
  state = {
    commentVisible: false,
    commentText: '',
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
    const { commentVisible, commentText } = this.state
    const { submitComment, objectId } = this.props
    return (
      <div className={classes.comment__container}>
        <Button default onClick={this.showCommentField} className={classes.comment__button}>
          Quick comment
        </Button>
        {commentVisible && (
          <React.Fragment>
            <TextArea className={classes.comment__text} placeholder="Add comment" onChange={this.handleCommentText} />
            <Button
              type="primary"
              onClick={() => {
                submitComment(objectId, 1, commentText)
                this.cleanAfterSend()
              }}
            >
              Send
            </Button>
          </React.Fragment>
        )}
      </div>
    )
  }
}

AddComment.propTypes = {
  submitComment: PropTypes.func.isRequired,
  objectId: PropTypes.number.isRequired,
}

export default AddComment
