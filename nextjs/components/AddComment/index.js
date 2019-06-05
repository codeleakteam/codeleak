import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { apiPost } from '../../api'

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
    const { commentVisible } = this.state
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
                this.props.submitComment(this.props.objectId, 2, this.state.commentText)
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

export default AddComment
