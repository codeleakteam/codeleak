import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

// import classes from '../styles/signupAndSignIn/index.scss'

class SignIn extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className={classes.container}>
        <h2 className={classes.heading}>codeLeak</h2>
        <p className={classes.description}>
          An online-editor based question and answer platform for front-end developers
        </p>
        <div className={classes.container__socials}>
          <Button type="primary" className={classes.socials__link} icon="google">
            Google
          </Button>
          <Button type="primary" className={classes.socials__link} icon="twitter">
            Twitter
          </Button>
        </div>

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
            <Button type="primary" htmlType="submit" className={['login-form-button', classes['btn--login']].join(' ')}>
              Login
            </Button>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrapperSignInForm = Form.create({ name: 'signin' })(SignIn)

export default WrapperSignInForm
