import React from 'react'
import Link from 'next/link'
import { Menu, Dropdown, Icon } from 'antd'

import classes from './index.scss'

const mainTechs = [
  {
    name: 'Basic',
    color: 'white',
    url: '/',
  },
  {
    name: 'React',
    color: '#61dafb',
    url: '/',
  },
  {
    name: 'Angular',
    color: '#dc0030',
    url: '/',
  },
  {
    name: 'Vue',
    color: '#41b883',
    url: '/',
  },
]
const otherTechs = [
  {
    name: 'Gatsby',
    color: '#653298',
    url: '/',
  },
  {
    name: 'Next.js',
    color: '#fefefe',
    url: '/',
  },
  {
    name: 'Nuxt.js',
    color: '#3a7f6f',
    url: '/',
  },
  {
    name: 'Preact',
    color: '#ac77db',
    url: '/',
  },
  {
    name: 'Reason',
    color: '#dc4a38',
    url: '/',
  },
  {
    name: 'React + TS',
    color: '#61dafb',
    url: '/',
  },
]

const renderOtherTechs = (
  <div>
    {otherTechs.map(t => {
      return (
        <Link href={t.url}>
          <a className={[classes.tech__box, classes['tech__box--dropdown']].join(' ')}>
            <div>
              <span style={{ color: t.color }}>{t.name}</span>
            </div>
          </a>
        </Link>
      )
    })}
  </div>
)

const TechnologyStack = () => {
  return (
    <div className={classes.tech__container}>
      {mainTechs.map(t => {
        return (
          <Link href={t.url} key={t.name}>
            <a className={classes.tech__box}>
              <div>
                <span style={{ color: t.color }}>{t.name}</span>
              </div>
            </a>
          </Link>
        )
      })}
      <Dropdown overlay={renderOtherTechs}>
        <div className={classes.tech__box}>
          <span style={{ color: 'white' }}>Other techs</span>
        </div>
      </Dropdown>
    </div>
  )
}

export default TechnologyStack
