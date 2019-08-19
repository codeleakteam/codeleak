import React, { Component } from 'react'
import _ from 'lodash'
import Head from 'next/head'
import { Alert, Form, Icon, Input, Spin, Button } from 'antd'
import styled from 'styled-components'
import { apiPost } from '../api'
import { login } from '../helpers/functions/auth'

class SignUp extends Component {
  state = {
    errors: [],
    loading: false,
  }

  register = async ({ fullName, email, password }) => {
    try {
      this.setState({ loading: true })
      const res = await apiPost.register({ fullName, email, password })
      const token = _.get(res, 'data.token', null)
      const user = _.get(res, 'data.user', null)
      login({ user, token })
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
      <Wrapper>
        <Head>
          <title>Sign up</title>
        </Head>
        <Title>codeLeak</Title>
        <Description>An online-editor based question and answer platform for front-end developers</Description>
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
              {getFieldDecorator('fullName', {
                rules: [{ required: true, message: 'Please input display name!' }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Full name"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!', type: 'email' }],
              })(
                <Input
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
                  rules: [{ required: true, message: 'Please input your Password!' }],
                },
                {
                  validator: this.compareToNextPass,
                }
              )(
                <Input
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
                  rules: [{ required: true, message: 'Please repeat your Password!' }],
                },
                {
                  validator: this.compareToFirstPass,
                }
              )(
                <Input
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
    )
  }
}

const WrapperSignUpForm = Form.create({ name: 'signup' })(SignUp)
const Wrapper = styled.div`
  max-width: 500px;
  width: 70%;
  margin: 0 auto;
`

const Socials = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
`

const Title = styled.h2`
  font-size: 44px;
  line-height: 76px;
  text-align: center;
  color: black;
`

const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: black;
  margin-bottom: 16px;
`

const SpinWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

const StyledSocialButton = styled(Button)`
  margin-right: 1rem;
  max-width: 112px;
  margin-bottom: 8px;
  &:last-of-type {
    margin-right: 0;
  }
`

const StyledRegisterButton = styled(Button)`
  width: 100%;
`
export default WrapperSignUpForm
