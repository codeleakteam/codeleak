import axios from 'axios'
import Router from 'next/router'

const instance = axios.create({})

instance.interceptors.response.use(
  response => response,
  err => {
    if (err.response && err.response.status === 401) {
      console.log('[instance.interceptors.response] redirecting')
      try {
        Router.push('/sign_in')
      } catch (err) {
        console.log('serverside')
      }
    }
    return Promise.reject(err)
  }
)

export default instance
