import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

class SignIn extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Wrapper>
        <Title>codeLeak</Title>
        <Description>An online-editor based question and answer platform for front-end developers</Description>
        <Socials>
          <StyledSocialButton type="primary" icon="google">
            Google
          </StyledSocialButton>
          <StyledSocialButton type="primary" icon="twitter">
            Twitter
          </StyledSocialButton>
        </Socials>

        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!', type: 'email' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
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
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <StyledLoginButton type="primary" htmlType="submit">
              Login
            </StyledLoginButton>
            <a href="">Forgot password</a>
          </Form.Item>
        </Form>
      </Wrapper>
    )
  }
}

const WrapperSignInForm = Form.create({ name: 'signin' })(SignIn)
const Wrapper = styled.div`
  max-width: 500px;
  width: 70%;
  margin: 0 auto;
`

const Socials = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
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
`

const StyledSocialButton = styled(Button)`
  margin-right: 1rem;
  max-width: 112px;
  margin-bottom: 8px;
  &:last-of-type {
    margin-right: 0;
  }
`

const StyledLoginButton = styled(Button)`
  width: 112px;
  margin-right: 1rem;
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`
export default WrapperSignInForm
