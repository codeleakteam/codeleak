import React, { Component } from 'react'
import _ from 'lodash'
import Head from 'next/head'
import { Alert, Form, Icon, Input, Spin, Button } from 'antd'
import styled from 'styled-components'
import { apiPost } from '../api'
import { login } from '../helpers/functions/auth'
import Router from 'next/router'
import Card from '../components/Card'
import Logo from '../components/Logo'

class SignUp extends Component {
  state = {
    errors: [],
    loading: false,
  }

  register = async ({ username, email, password }) => {
    try {
      this.setState({ loading: true })
      const res = await apiPost.register({ username, email, password })
      const token = _.get(res, 'data.token', null)
      const user = _.get(res, 'data.user', null)
      login({ user, token })
      Router.push('/profile/edit')
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = Object.values(err.response.data)
        this.setState({ loading: false, errors })
      } else {
        this.setState({ loading: false, errors: ['Internal server error. Please try again!'] })
      }
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.register(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <StyledCard>
        <Wrapper>
          <Head>
            <title>Sign up</title>
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
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please enter your username!' }],
                })(
                  <StyledInput
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="text"
                    placeholder="Username"
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please enter your email!', type: 'email' }],
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
                {getFieldDecorator(
                  'repeatPassword',
                  {
                    rules: [{ required: true, message: 'Please repeat your password!' }],
                  },
                  {
                    validator: this.compareToFirstPass,
                  }
                )(
                  <StyledInput
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    size="large"
                    type="password"
                    placeholder="Repeat password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <StyledRegisterButton type="primary" size="large" htmlType="submit">
                  Register
                </StyledRegisterButton>
              </Form.Item>
            </Form>
          )}
        </Wrapper>
      </StyledCard>
    )
  }
}

const StyledInput = styled(Input)`
  width: 100%;
`

const WrapperSignUpForm = Form.create({ name: 'signup' })(SignUp)
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
//   margin-bottom: 16px;
// `

const StyledCard = styled(Card)`
  width: 750px;
  margin: 0 auto;
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`

const StyledLogo = styled(Logo)`
  text-align: center;
  margin-bottom: 24px;
`

const Description = styled.p`
  font-size: 1rem;
  line-height: 22px;
  color: black;
  margin-bottom: 24px;
  text-align: center;
  @media screen and (max-width: 740px) {
    font-size: 0.9rem;
  }
`

const SpinWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

// const StyledSocialButton = styled(Button)`
//   margin-right: 1rem;
//   max-width: 112px;
//   margin-bottom: 8px;
//   &:last-of-type {
//     margin-right: 0;
//   }
// `

const StyledRegisterButton = styled(Button)`
  width: 100%;
`
export default WrapperSignUpForm
