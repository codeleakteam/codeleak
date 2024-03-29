import React, { Component } from 'react'
import Head from 'next/head'
import cookie from 'js-cookie'
import { Alert, Form, Icon, Input, Button, Spin } from 'antd'
import _ from 'lodash'
import styled from 'styled-components'
import Card from '../components/Card'
import Logo from '../components/Logo'
import { apiPost } from '../api'
import { login } from '../helpers/functions/auth'

class SignIn extends Component {
  state = {
    errors: [],
    loading: false,
  }
  componentDidMount() {
    cookie.remove('codeleakUser')
    cookie.remove('codeleakAuthToken')
  }

  login = async ({ email, password }) => {
    try {
      this.setState({ loading: true })
      const res = await apiPost.login({ email, password })
      const token = _.get(res, 'data.token', null)
      const user = _.get(res, 'data.user', null)
      if (!token || !user) throw new Error('Token or user null or undefined')

      login({ user, token })
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = Object.values(err.response.data)
        this.setState({ loading: false, errors })
      } else {
        this.setState({ loading: false, errors: ['Internal server error. Please try again!'] })
      }

      console.error('[login]', { err })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <StyledCard>
        <Wrapper>
          <Head>
            <title>Sign In</title>
          </Head>
          <StyledLogo type="long" />
          <Description>An online-editor based question and answer platform for developers</Description>
          {/* <Socials>
          <StyledSocialButton type="primary" icon="google">
            Google
          </StyledSocialButton>
          <StyledSocialButton type="primary" icon="twitter">
            Twitter
          </StyledSocialButton>
        </Socials> */}
          {!this.state.loading && this.state.errors.length > 0 && (
            <React.Fragment>
              {this.state.errors.map((err, i) => (
                <Alert style={{ marginBottom: '8px' }} message={err[i]} key={i} type="error" showIcon />
              ))}
            </React.Fragment>
          )}

          {this.state.loading && (
            <SpinWrapper>
              <Spin size="large" />
            </SpinWrapper>
          )}

          {!this.state.loading && (
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('email', {
                  validateTrigger: ['onBlur', 'onSubmit'],
                  rules: [{ required: true, message: 'Please enter a valid email address!', type: 'email' }],
                })(
                  <StyledInput
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator(
                  'password',
                  {
                    rules: [{ required: true, message: 'Please enter your password!' }],
                  },
                  {
                    validator: this.compareToNextPass,
                  }
                )(
                  <StyledInput
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <StyledLoginButton size="large" type="primary" htmlType="submit">
                  Login
                </StyledLoginButton>
                {/* <a href="">Forgot password</a> */}
              </Form.Item>
            </Form>
          )}
        </Wrapper>
      </StyledCard>
    )
  }
}

const StyledCard = styled(Card)`
  width: 750px;
  margin: 0 auto;
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`

const StyledInput = styled(Input)`
  width: 100%;
`

const StyledLogo = styled(Logo)`
  text-align: center;
  margin-bottom: 24px;
`

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    max-width: auto;
  }
`

// const Socials = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   margin-bottom: 1rem;
// `

const SpinWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Description = styled.p`
  font-size: 1rem;
  color: black;
  margin-bottom: 24px;
  text-align: center;
  @media screen and (max-width: 740px) {
    font-size: 0.9rem;
  }
`

// const StyledSocialButton = styled(Button)`
//   margin-right: 1rem;
//   max-width: 112px;
//   margin-bottom: 8px;
//   &:last-of-type {
//     margin-right: 0;
//   }
// `

const StyledLoginButton = styled(Button)`
  width: 112px;
  margin-right: 1rem;
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`

const WrapperSignInForm = Form.create({ name: 'signin' })(SignIn)
export default WrapperSignInForm
