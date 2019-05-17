import React, { Component } from 'react'
import { Button, Icon, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import Comment from '../Comment'
import timeAgo from '../../helpers/functions/timeAgo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { convertFromRaw, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import classes from './index.scss'

class Answer extends Component {
  // console.log(EditorState.createWithContent(convertFromRaw(JSON.parse(answer.description))))
  state = {
    editorState: null,
  }

  componentDidMount() {
    let testinjo = JSON.parse(this.props.answer.description)
    if (this.props.answer) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(testinjo)),
      })
    }
  }

  createAnswerFromHtml = () => {
    let editorState = this.state.editorState
    let html = stateToHTML(editorState.getCurrentContent())
    return {
      __html: html,
    }
  }

  render() {
    const { answer } = this.props
    const { editorState } = this.state

    // console.log(this.props.answer.description)

    const answerOptions = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={classes.answer__container}>
        <div className={classes.answer__info}>
          <div className={classes.answer__detail}>
            <Link href="/">
              <div className={classes.answer__avatar}>
                <img
                  src={answer.author.avatar}
                  alt={answer.author.username}
                  className={classes['answer__avatar-img']}
                />
              </div>
            </Link>
            <span className={classes.answer__rep}>{answer.score}</span>
          </div>
          <div className={classes['answer__user-info']}>
            <Link href="/">
              <a>
                <span className={classes.answer__user}>{answer.author.username}</span>
              </a>
            </Link>

            <span className={classes.answer__time}>{timeAgo(answer.created_at)}</span>
          </div>
        </div>
        <div className={classes['answer__tags-wrapper']}>
          <div>
            <Link href="/">
              <Button type="primary">Open in editor</Button>
            </Link>
          </div>
        </div>
        {editorState && <div className={classes.answer__text} dangerouslySetInnerHTML={this.createAnswerFromHtml()} />}
        <div className={classes.answer__controls}>
          <Button className={classes.answer__upvote} type="primary">
            Upvote
            <FontAwesomeIcon icon="angle-up" className={classes.answer__arrow} />
          </Button>
          <Button className={classes.answer__downvote}>Downvote</Button>
          <Dropdown overlay={answerOptions}>
            <Icon type="more" style={{ fontSize: '30px' }} />
          </Dropdown>
        </div>
        {answer.comments.map(comment => (
          <Comment />
        ))}
      </div>
    )
  }
}

export default Answer
