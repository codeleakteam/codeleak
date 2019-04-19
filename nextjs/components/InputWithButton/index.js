import React, { Component } from 'react'
import Button from '../Button'
import _ from 'lodash'
import { apiPost } from '../../api'
import classes from './index.scss'

class InputWithButton extends Component {
  state = {
    email: '',
    hasErr: false,
    errMsg: '',
    success: false,
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value })
  }

  handleSubmit = async e => {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.state.email
      )
    ) {
      try {
        const res = await apiPost.subscribeMail(this.state.email)
        let email = _.get(res, 'data.email', null)
        if (!email) throw new Error('Internal server error')
        // Server either returns a string or an array on res.data.email
        // Array means there are validation errors and string means everything is OK
        let passedServerValidation = true
        if (Array.isArray(email) && email.length > 0) {
          passedServerValidation = false
          email[0] = email[0].charAt(0).toUpperCase() + email[0].slice(1)
        }
        this.setState({
          hasErr: !passedServerValidation,
          errMsg: !passedServerValidation ? email[0] : '',
          success: passedServerValidation,
        })
      } catch (error) {
        console.error(error)
        // Success false in case they reenter another email address
        this.setState({ hasErr: true, success: false })
      }
    } else {
      // Success false in case they reenter another email address
      this.setState({ hasErr: true, errMsg: 'Email address is invalid. Pleaase try again!', success: false })
    }
  }

  handleEmailOnFocus = () => {
    if (this.state.valid === false) {
      this.setState({ valid: '' })
    }
  }

  render() {
    const { success, hasErr, errMsg, email } = this.state

    return (
      <React.Fragment>
        <div className={classes.container}>
          <input
            type="email"
            placeholder="Enter your email here"
            className={classes.input}
            value={email}
            onChange={this.handleEmailChange}
            onFocus={this.handleEmailOnFocus}
          />
          <Button modifier="button--subscribe" onClick={this.handleSubmit} text="Get Early Access" />
        </div>
        {success && (
          <span className={[classes.msg, classes['msg--success']].join(' ')}>Email is successfully submited!</span>
        )}
        {hasErr && <span className={[classes.msg, classes['msg--error']].join(' ')}>{errMsg}</span>}
      </React.Fragment>
    )
  }
}

export default InputWithButton
