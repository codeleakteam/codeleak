import React from 'react'

import Comment from './comment'
import Eye from './eye'
import UpVote from './quoraUpVote'
import ReactIcon from './reactIcon'
import AngularIcon from './angularIcon'
import VueIcon from './vueIcon'

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
    default:
      return
  }
}

export default Icon
