import React, { Component } from 'react'

import './styles/index.scss'

class InputWithButton extends Component {
    state = {
        email: '',
        valid: '',
    }
    handleEmail = e => {
        this.setState({ email: e.target.value })
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
            this.setState({ valid: true })
        } else {
            this.setState({ valid: false })
        }
    }
    submitEmail = () => {
        alert(this.state.email)
    }
    render() {
        return (
            <React.Fragment>
                <div className="early-access__container">
                    <input
                        type="email"
                        placeholder="Enter your email here"
                        className="early-access__input"
                        onChange={this.handleEmail}
                        value={this.state.email}
                    />
                    <button className="early-access__button" onClick={this.submitEmail}>
                        Get Early Access
                    </button>
                </div>
                {!this.state.valid && this.state.email && (
                    <span className="early-access__msg">Email Address is not valid!</span>
                )}
            </React.Fragment>
        )
    }
}

export default InputWithButton
