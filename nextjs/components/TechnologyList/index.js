import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Icon } from 'antd'
import CustomIcon from '../../assets/icons/index'

class TechnologyStack extends Component {
  render() {
    return (
      <React.Fragment>
        <TechList>
          {mainTechs.map(t => {
            return (
              <Link href={t.url} key={t.name}>
                <TechBox target="_blank">
                  <span style={{ color: t.color }}>{t.name}</span>
                  {t.icon}
                </TechBox>
              </Link>
            )
          })}
        </TechList>

        <OtherTechnologies>
          {otherTechs.map(t => {
            return (
              <Link href={t.url} key={t.url + t.color + t.name}>
                <DropDownTechBox>
                  <span style={{ color: t.color }}>{t.name}</span>
                </DropDownTechBox>
              </Link>
            )
          })}
        </OtherTechnologies>
      </React.Fragment>
    )
  }
}

const mainTechs = [
  {
    name: 'Vanilla JS / jQuery',
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

const TechList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`

const TechBox = styled.a`
  position: relative;
  font-weight: bold;
  letter-spacing:0.2px;
  margin:0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  padding: 8px;
  color: white;
  background-color: ${props => props.theme.nextBlack};
  border-radius: 4px;
  cursor: pointer;
  @media screen and (max-width: 940px) {
    width: 33%;
    flex: auto;
  }
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`

const DropDownTechBox = styled(TechBox)`
  display: inline-block;
  margin: 0;
  flex: auto;
`

const ShowMoreButton = styled(TechBox)`
  display: flex;
  justify-content: space-between;
  width: 80px;
  align-items: center;

  @media screen and (max-width: 940px) {
    width: calc(50% - 8px);
  }
  @media screen and (max-width: 740px) {
    width: calc(100% - 8px);
  }
`
const OtherTechnologies = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
export default TechnologyStack
