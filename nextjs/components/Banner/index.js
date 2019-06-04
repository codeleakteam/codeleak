import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import Logo from '../Logo'

import classes from './index.scss'

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
      <div className={classes.banner}>
        <div className={classes.banner__container}>
          <div className={classes.banner__text}>
            <Logo />
            <p className={classes.banner__description}>
              An online-editor based question and answer platform for front-end developers
            </p>
          </div>
          <div className={classes.banner__form}>
            <h3 className={classes.form__heading}>Get started</h3>
            {/* <div className={classes.banner__socials}>
              <Button type="primary" icon="google" className={classes['banner__socials-item']}>
                Google
              </Button>
              <Button type="primary" icon="twitter" className={classes['banner__socials-item']}>
                Twitter
              </Button>
            </div> */}

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
                    type="password"
                    placeholder="Repeat password"
                  />
                )}
              </Form.Item>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className={['login-form-button', classes['btn--register']].join(' ')}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

const WrapperBannerForm = Form.create({ name: 'BannerForm' })(Banner)

export default WrapperBannerForm
