import React from 'react'

import Comment from './comment'
import Eye from './eye'
import UpVote from './quoraUpVote'
import ReactIcon from './reactIcon'
import AngularIcon from './angularIcon'
import VueIcon from './vueIcon'
import CommentsIcon from './commentsIcon'
import WebsiteIcon from './websiteIcon'
import TwitterIcon from './twitterIcon'
import GithubIcon from './githubIcon'
import EmailIcon from './emailIcon'
import LocationIcon from './locationIcon'
import JobIcon from './jobIcon'
import HtmlIcon from './htmlIcon'
import SassIcon from './sassIcon'
import JQueryIcon from './jqueryIcon'
import GatsbyIcon from './gatsbyIcon'
import NextjsIcon from './nextjsIcon'
import TypescriptIcon from './typescriptIcon'
import NuxtjsIcon from './nuxtjsIcon'
import EmberIcon from './emberIcon'
import PreactIcon from './preactIcon'
import SvelteIcon from './svelteIcon'
import CxjsIcon from './cxjsIcon'
import ReasonmlIcon from './reasonmlIcon'
import DojoIcon from './dojoIcon'

const Icon = props => {
  switch (props.name) {
    case 'comment':
      return <Comment {...props} />
    case 'eye':
      return <Eye {...props} />
    case 'upvote':
      return <UpVote {...props} />
    case 'react':
      return <ReactIcon {...props} fill="white" />
    case 'angular':
      return <AngularIcon {...props} />
    case 'vue':
      return <VueIcon {...props} />
    case 'comments':
      return <CommentsIcon {...props} />
    case 'website':
      return <WebsiteIcon {...props} />
    case 'twitter':
      return <TwitterIcon {...props} />
    case 'github':
      return <GithubIcon {...props} />
    case 'email':
      return <EmailIcon {...props} />
    case 'location':
      return <LocationIcon {...props} />
    case 'job':
      return <JobIcon {...props} />
    case 'html':
      return <HtmlIcon {...props} />
    case 'sass':
      return <SassIcon {...props} />
    case 'jquery':
      return <JQueryIcon {...props} />
    case 'gatsby':
      return <GatsbyIcon {...props} />
    case 'nextjs':
      return <NextjsIcon {...props} />
    case 'typescript':
      return <TypescriptIcon {...props} />
    case 'nuxtjs':
      return <NuxtjsIcon {...props} />
    case 'ember':
      return <EmberIcon {...props} />
    case 'preact':
      return <PreactIcon {...props} />
    case 'svelte':
      return <SvelteIcon {...props} />
    case 'cxjs':
      return <CxjsIcon {...props} />
    case 'reasonml':
      return <ReasonmlIcon {...props} />
    case 'dojo':
      return <DojoIcon {...props} />
    default:
      return
  }
}

export default Icon
