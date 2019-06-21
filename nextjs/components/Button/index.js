import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
  -webkit-appearance: button;
  border: 0;
  color: white;
  height: 100%;
  box-sizing: border-box;
  font-size: 25px;
  padding: 0 8px;
  cursor: pointer;
  border: 1px solid;
  ${props =>
    props.modifier === 'subscribe' &&
    css`
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      min-width: 153px;
      color: white;
      border-color: $clblue;
      background-color: $clblue;
      line-height: 16px;
      @media screen and (max-width: 940px) {
        width: 20%;
        font-size: 16px;
      }
      @media screen and (max-width: 740px) {
        min-width: 100px;
        width: 30%;
      }
    `}

  &:focus,
  &:active {
    outline: none;
  }
`
Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  modifier: PropTypes.string,
}

export default Button
