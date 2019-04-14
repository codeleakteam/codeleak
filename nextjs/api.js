import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const BASE_URL = publicRuntimeConfig.baseUrl

export const apiGet = {
  getIndex: () => {
    return axios.get(`${BASE_URL}/api/home`)
  },
}
