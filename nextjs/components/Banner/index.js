import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, Icon, Input, Button } from 'antd'
import Logo from '../Logo'

class Banner extends Component {
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
        <Container>
          <Heading>
            <StyledLogo />
            <Description>An online-editor based question and answer platform for front-end developers</Description>
            <Featuring>
              Featuring &nbsp;
              <a target="_blank" href="https://codesandbox.io/">
                CodeSandbox
              </a>{' '}
              and{' '}
              <a href="https://stackblitz.com/" target="_blank">
                StackBlitz
              </a>
            </Featuring>
          </Heading>
          <FormWrapper>
            <FormHeading>Get started</FormHeading>
            {/* <Socials>
              <Button type="primary" icon="google" className={classes['banner__socials-item']}>
                Google
              </Button>
              <Button type="primary" icon="twitter" className={classes['banner__socials-item']}>
                Twitter
              </Button>
            </Socials> */}

            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('displayName', {
                  rules: [{ required: true, message: 'Please input display name!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="text"
                    placeholder="Display name "
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!', type: 'email' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator(
                  'password',
                  {
                    rules: [{ required: true, message: 'Please input your password!' }],
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
                {getFieldDecorator(
                  'repeatPassword',
                  {
                    rules: [{ required: true, message: 'Please repeat your password!' }],
                  },
                  {
                    validator: this.compareToFirstPass,
                  }
                )(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Repeat password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </FormWrapper>
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: white;
  .ant-form-item {
    margin: 0 0 5px 0;
  }
`

const Container = styled.div`
  max-width: 940px;
  width: 90%;
  margin: 90px auto 16px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 740px) {
    flex-direction: column;
    margin-top: 80px;
  }
`

const StyledLogo = styled(Logo)`
  margin-bottom: 15px;
`

const Heading = styled.div`
  width: 70%;
  margin-top: 45px;
  @media screen and (max-width: 740px) {
    width: 100%;
    margin-top: 0;
  }
`

const Description = styled.p`
  font-size: 18px;
  line-height: 22px;
  width: 290px;
  display: inline-block;
  color: black;
  margin-bottom: 10px;
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`

const Featuring = styled.p`
  font-size: 14px;
  color: ${props => props.theme.darkGrey};
`
const FormWrapper = styled.div`
  width: 30%;
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`

const FormHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
`
const WrapperBannerForm = Form.create({ name: 'BannerForm' })(Banner)

export default WrapperBannerForm
