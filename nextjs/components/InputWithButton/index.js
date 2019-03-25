import React, { Component } from 'react'
import Button from '../Button'
import './styles/index.scss'

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
        return (
            <React.Fragment>
                <div className="early-access__container">
                    <input
                        type="email"
                        placeholder="Enter your email here"
                        className="early-access__input"
                        value={this.state.email}
                        onChange={e => this.handleEmail(e)}
                    />
                    <Button
                        className="button--green button--subscribe"
                        onClick={this.handleSubmit}
                        text="Get Early Access"
                    />
                </div>
                {this.state.valid && (
                    <span className="early-access-msg early-access-msg--success">Email is successfully submited!</span>
                )}
                {this.state.valid === false ? (
                    <span className="early-access-msg early-access-msg--error">Email Address is not valid!</span>
                ) : null}
            </React.Fragment>
        )
    }
}

export default InputWithButton
