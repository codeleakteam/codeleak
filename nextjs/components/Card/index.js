import React from 'react'
import classes from './index.scss'

export default function Card({ children }) {
  return <div className={classes.card}>{children}</div>
}
