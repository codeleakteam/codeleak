import axios from 'axios'
import Router from 'next/router'

const instance = axios.create({})

instance.interceptors.response.use(
  response => response,
  err => {
    if (err.response && err.response.status === 401) {
      try {
        Router.push('/sign_in')
      } catch (err) {}
    }
    return Promise.reject(err)
  }
)

export default instance
