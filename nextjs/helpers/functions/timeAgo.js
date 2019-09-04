import moment from 'moment'

let timeAgo = time => {
  return moment(time).fromNow()
}

export default timeAgo
