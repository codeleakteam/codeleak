import React, { Component } from 'react'
import styled from 'styled-components'
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
        <Wrapper>
          <Input
            type="email"
            placeholder="Enter your email here"
            value={email}
            onChange={this.handleEmailChange}
            onFocus={this.handleEmailOnFocus}
          />
          <Button modifier="subscribe" onClick={this.handleSubmit} text="Get Early Access" />
        </Wrapper>
        {success && <SuccessMessage>Email is successfully submited!</SuccessMessage>}
        {hasErr && <ErrorMessage>{errMsg}</ErrorMessage>}
      </React.Fragment>
    )
  }
}

const Input = styled.input`
  border: 1px solid $clblue;
  font-size: 25px;
  padding: 0 16px;
  height: 100%;
  box-sizing: border-box;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  flex: 1;
  width: 100%;
  @media screen and (max-width: 940px) {
    width: 80%;
    font-size: 22px;
    padding: 0 15px;
  }
  @media screen and (max-width: 740px) {
    padding: 0 8px;
    font-size: 16px;
  }
  &::placeholder {
    color: $black;
    font-size: 25px;
    @media screen and (max-width: 940px) {
      font-size: 22px;
    }
    @media screen and (max-width: 740px) {
      font-size: 16px;
    }
  }
  &:focus,
  &:active {
    outline: none;
  }
`
const Message = styled.span`
  font-weight: 700;
  display: block;
  padding: 4px 0;
  font-size: 16px;
`

const SuccessMessage = styled(Message)`
  color: #bae637;
`

const ErrorMessage = styled(Message)`
  color: #ff4d4f;
`

export default InputWithButton
