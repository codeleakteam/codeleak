import React from 'react'
import Link from 'next/link'
import { Dropdown, Icon } from 'antd'
import CustomIcon from '../../assets/icons/index'

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
    icon: <CustomIcon name="react" height="30px" fill="#1d2022" />,
  },
  {
    name: 'Angular',
    color: '#dc0030',
    url: '/',
    icon: <CustomIcon name="angular" height="30px" />,
  },
  {
    name: 'Vue',
    color: '#41b883',
    url: '/',
    icon: <CustomIcon name="vue" height="30px" />,
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
  {
    name: 'Ember',
    color: '#e04e39',
    url: '/',
  },
  {
    name: 'CxJS',
    color: '#0184e7',
    url: '/',
  },
  {
    name: 'Apollo',
    color: '#e535ab',
    url: '/',
  },
  {
    name: 'Nest',
    color: '#e0234e',
    url: '/',
  },
]

const renderOtherTechs = (
  <div>
    {otherTechs.map(t => {
      return (
        <Link href={t.url} key={t.url + t.color + t.name}>
          <a className={[classes.tech__box, classes['tech__box--dropdown']].join(' ')}>
            <span style={{ color: t.color }}>{t.name}</span>
          </a>
        </Link>
      )
    })}
  </div>
)

const TechnologyStack = () => {
  return (
    <React.Fragment>
      <div className={classes.tech__container}>
        {mainTechs.map(t => {
          return (
            <Link href={t.url} key={t.name}>
              <a className={classes.tech__box}>
                <span style={{ color: t.color }}>{t.name}</span>
                {t.icon}
              </a>
            </Link>
          )
        })}
      </div>
      <Dropdown overlay={renderOtherTechs} trigger={['click']} placement="bottomLeft">
        <div className={[classes.tech__box, classes['tech__box--more']].join(' ')}>
          <span style={{ color: 'white' }}>More</span>
          <Icon type="more" style={{ marginLeft: 'auto' }} />
        </div>
      </Dropdown>
    </React.Fragment>
  )
}

export default TechnologyStack
