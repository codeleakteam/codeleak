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

const Icon = props => {
  switch (props.name) {
    case 'comment':
      return <Comment {...props} />
    case 'eye':
      return <Eye {...props} />
    case 'upvote':
      return <UpVote {...props} />
    case 'react':
      return <ReactIcon {...props} />
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
    default:
      return
  }
}

export default Icon
