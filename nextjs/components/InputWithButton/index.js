import React, { Component } from 'react'
import Button from '../Button'
import axios from 'axios'
import { apiPost } from '../../api'

import classes from './index.scss'

class InputWithButton extends Component {
  state = {
    email: '',
    valid: '',
  }

  handleEmail = e => {
    this.setState({ email: e.target.value })
  }

  handleSubmit = async e => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      this.setState({ valid: true })
      try {
        const res = await apiPost.subscribeMail(this.state.email)
      } catch (error) {
        this.setState({ valid: false })
      }
    } else {
      this.setState({ valid: false })
    }
  }

  handleEmailOnFocus = () => {
    if (this.state.valid === false) {
      this.setState({ valid: '' })
    }
  }

  render() {
    const { valid, email } = this.state

    return (
      <React.Fragment>
        {!valid && (
          <div className={classes.container}>
            <input
              type="email"
              placeholder="Enter your email here"
              className={classes.input}
              value={email}
              onChange={this.handleEmail}
              onFocus={this.handleEmailOnFocus}
            />
            <Button modifier="button--subscribe" onClick={this.handleSubmit} text="Get Early Access" />
          </div>
        )}
        {valid && (
          <span className={[classes.msg, classes['msg--success']].join(' ')}>Email is successfully submited!</span>
        )}
        {valid === false ? (
          <span className={[classes.msg, classes['msg--error']].join(' ')}>Email Address is not valid!</span>
        ) : null}
      </React.Fragment>
    )
  }
}

export default InputWithButton
