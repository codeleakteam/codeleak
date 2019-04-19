import React from 'react'

import classes from './index.scss'

const TwoSideLayout = ({ left, right }) => {
  return (
    <section className={classes.section__container}>
      <main className={classes.section__main}>{left}</main>
      <section className={classes.section__aside}>{right}</section>
    </section>
  )
}

export default TwoSideLayout
