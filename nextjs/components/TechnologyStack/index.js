import React, { Component } from 'react'
import Link from 'next/link'
import { Dropdown, Icon } from 'antd'
import CustomIcon from '../../assets/icons/index'

import classes from './index.scss'

const mainTechs = [
  {
    name: 'Basic',
    color: 'white',
    url: 'https://codesandbox.io/s/github/codesandbox-app/static-template',
  },
  {
    name: 'React',
    color: '#61dafb',
    url: 'https://codesandbox.io/s/new',
    icon: <CustomIcon name="react" height="30px" fill="#1d2022" />,
  },
  {
    name: 'Angular',
    color: '#dc0030',
    url: 'https://codesandbox.io/s/angular',
    icon: <CustomIcon name="angular" height="30px" />,
  },
  {
    name: 'Vue',
    color: '#41b883',
    url: 'https://codesandbox.io/s/vue',
    icon: <CustomIcon name="vue" height="30px" />,
  },
]
const otherTechs = [
  {
    name: 'Gatsby',
    color: '#653298',
    url: 'https://codesandbox.io/s/github/gatsbyjs/gatsby-starter-default',
  },
  {
    name: 'Next.js',
    color: '#fefefe',
    url: 'https://codesandbox.io/s/github/zeit/next.js/tree/master/examples/hello-world',
  },
  {
    name: 'Nuxt.js',
    color: '#3a7f6f',
    url: 'https://codesandbox.io/s/github/nuxt/codesandbox-nuxt',
  },
  {
    name: 'Preact',
    color: '#ac77db',
    url: 'https://codesandbox.io/s/preact',
  },
  {
    name: 'Reason',
    color: '#dc4a38',
    url: 'https://codesandbox.io/s/reason',
  },
  {
    name: 'React + TS',
    color: '#61dafb',
    url: 'https://codesandbox.io/s/react-ts',
  },
  {
    name: 'Ember',
    color: '#e04e39',
    url: 'https://codesandbox.io/s/github/mike-north/ember-new-output',
  },
  {
    name: 'CxJS',
    color: '#0184e7',
    url: 'https://codesandbox.io/s/github/codaxy/cxjs-codesandbox-template',
  },
  {
    name: 'Apollo',
    color: '#e535ab',
    url: 'https://codesandbox.io/s/apollo-server',
  },
  {
    name: 'Nest',
    color: '#e0234e',
    url: 'https://codesandbox.io/s/github/nestjs/typescript-starter',
  },
]

class TechnologyStack extends Component {
  state = {
    otherTechVisible: false,
  }

  handleOtherTech = () => {
    this.setState(state => ({ otherTechVisible: !state.otherTechVisible }))
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.tech__container}>
          {mainTechs.map(t => {
            return (
              <Link href={t.url} key={t.name}>
                <a className={classes.tech__box} target="_blank">
                  <span style={{ color: t.color }}>{t.name}</span>
                  {t.icon}
                </a>
              </Link>
            )
          })}
        </div>
        <div className={[classes.tech__box, classes['tech__box--more']].join(' ')} onClick={this.handleOtherTech}>
          <span style={{ color: 'white' }}>More</span>
          <Icon type="more" style={{ marginLeft: 'auto' }} />
        </div>
        <div className={classes['other-tech__container']}>
          {this.state.otherTechVisible &&
            otherTechs.map(t => {
              return (
                <Link href={t.url} key={t.url + t.color + t.name}>
                  <a className={[classes.tech__box, classes['tech__box--dropdown']].join(' ')}>
                    <span style={{ color: t.color }}>{t.name}</span>
                  </a>
                </Link>
              )
            })}
        </div>
      </React.Fragment>
    )
  }
}

export default TechnologyStack
