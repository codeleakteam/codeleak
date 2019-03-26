import React, { Component } from 'react'
import Button from '../Button'

import classes from './index.scss'

class InputWithButton extends Component {
  state = {
    email: '',
    valid: '',
  }

  handleEmail = e => {
    this.setState({ email: e.target.value })
  }

  handleSubmit = e => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      this.setState({ valid: true })
    } else {
      this.setState({ valid: false })
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
              onChange={e => this.handleEmail(e)}
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
