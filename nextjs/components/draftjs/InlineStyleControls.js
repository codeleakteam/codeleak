import React from 'react'
import { Button, Input } from 'antd'

import classes from '../AddAnswer/index.scss'

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
  return <Button type={type} onMouseDown={onToggle} icon={props.icon} className={classes.answer__button} />
}

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className={classes.answer__buttons}>
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
    </div>
  )
}

export default InlineStyleControls
