import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import Card from '../Card'
import CustomIcon from '../../assets/icons/index'

class TemplateList extends Component {
  static propTypes = {
    setTemplate: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Wrapper>
        <List>
          {templates.map(t => {
            return (
              <Link href={t.url} key={t.name}>
                <StyledCard isHoverable={true} onClick={this.props.setTemplate.bind(this, t)}>
                  {t.icons &&
                    t.icons.map((ic, i) => (
                      <IconWrapper>
                        <CustomIcon height="37px" width="37px" name={ic} />
                      </IconWrapper>
                    ))}
                  <TechName style={{ color: t.color }}>{t.name}</TechName>
                </StyledCard>
              </Link>
            )
          })}
        </List>
      </Wrapper>
    )
  }
}

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const TechName = styled.span``
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  margin: 0 0.2rem 0 0;
  &:last-of-type {
    margin: 0 0.75rem 0 0;
  }
`

const templates = [
  {
    name: 'HTML + SASS(CSS) + jQuery',
    color: 'black',
    url: 'https://codesandbox.io/s/github/codesandbox-app/static-template',
    icons: ['jquery'],
  },
  {
    name: 'Vanilla TypeScript',
    color: '#007ACC',
    url: 'https://codesandbox.io/s/new',
    icons: ['typescript'],
  },
  {
    name: 'React',
    color: '#61dafb',
    url: 'https://codesandbox.io/s/new',
    icons: ['react'],
  },
  {
    name: 'Preact',
    color: '#ac77db',
    url: 'https://codesandbox.io/s/preact',
    icons: ['preact'],
  },
  {
    name: 'React + TypeScript',
    color: '#61dafb',
    url: 'https://codesandbox.io/s/new',
    icons: ['react'],
    stackBlitzTemplate: 'create-react-app',
    dependencies: {},
    fs: {
      '/public/index.html': `
          <div>LMAO</div>
        `,
      '/src/index.js': `
        console.log("boo")
      `,
    },
  },
  {
    name: 'Next.js',
    color: 'black',
    url: 'https://codesandbox.io/s/github/zeit/next.js/tree/master/examples/hello-world',
    icons: ['nextjs'],
  },
  {
    name: 'Gatsby',
    color: '#653298',
    url: 'https://codesandbox.io/s/github/gatsbyjs/gatsby-starter-default',
    icons: ['gatsby'],
  },
  {
    name: 'Angular',
    color: '#dc0030',
    url: 'https://codesandbox.io/s/angular',
    icons: ['angular'],
  },
  {
    name: 'Svelte',
    color: '#FF3E00',
    url: 'https://codesandbox.io/s/svelte',
    icons: ['svelte'],
  },
  {
    name: 'Vue',
    color: '#41b883',
    url: 'https://codesandbox.io/s/vue',
    icons: ['vue'],
  },
  {
    name: 'Nuxt.js',
    color: '#3a7f6f',
    url: 'https://codesandbox.io/s/github/nuxt/codesandbox-nuxt',
    icons: ['nuxtjs'],
  },
  {
    name: 'Ember',
    color: '#e04e39',
    url: 'https://codesandbox.io/s/github/mike-north/ember-new-output',
    icons: ['ember'],
  },
  {
    name: 'CxJS',
    color: '#0184e7',
    url: 'https://codesandbox.io/s/github/codaxy/cxjs-codesandbox-template',
    icons: ['cxjs'],
  },
  {
    name: 'ReasonML',
    color: '#dc4a38',
    url: 'https://codesandbox.io/s/reason',
    icons: ['reasonml'],
  },
  {
    name: 'Dojo',
    color: '#d3471c',
    url: 'https://codesandbox.io/s/dojo',
    icons: ['dojo'],
  },
]

const Wrapper = styled.div`
  padding: 25px 0;
`
const List = styled.div`
  display: grid;
  gap: 1rem 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
`

export default TemplateList
