import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'

export const INLINE_STYLES = [
  { icon: 'bold', style: 'BOLD' },
  { icon: 'italic', style: 'ITALIC' },
  { icon: 'underline', style: 'UNDERLINE' },
  { icon: 'code', style: 'CODE' },
]

const StyleButton = props => {
  const onToggle = e => {
    e.preventDefault()
    props.onToggle(props.style)
  }
  let type = ''
  if (props.active) {
    type += 'primary'
  }
  return <StyledButton type={type} onMouseDown={onToggle} icon={props.icon} />
}

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <Controls>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.icon}
          active={currentStyle.has(type.style)}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
      <StyleButton onToggle={props.openUrlTab} icon="link" active={props.addUrlOpen ? true : false} />
    </Controls>
  )
}

const Controls = styled.div`
  margin-bottom: 8px;
`

const StyledButton = styled(Button)`
  margin-right: 4px;
  &:last-of-type {
    margin-right: 0;
  }
`

InlineStyleControls.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func.isRequired,
  }),
  onToggle: PropTypes.func.isRequired,
}

export default InlineStyleControls
