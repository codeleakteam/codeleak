import React from 'react'
import Link from 'next/link'

import classes from './index.scss'

const techs = [
  {
    name: 'React',
    color: 'blue',
  },
  {
    name: 'Angular',
    color: 'red',
  },
  {
    name: 'Vue',
    color: 'green',
  },
  {
    name: 'Gatsby',
    color: 'purple',
  },
  {
    name: 'Next.js',
    color: 'green',
  },
  {
    name: 'Nuxt.js',
    color: 'black',
  },
  {
    name: 'React + TS',
    color: 'blue',
  },
]

const TechnologyStack = () => {
  return (
    <div className={classes.tech__container}>
      {techs.map(t => {
        return (
          <Link href="" key={t.name}>
            <a>
              <div className={classes.tech__box} style={{ backgroundColor: t.color }}>
                <span>{t.name}</span>
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default TechnologyStack
