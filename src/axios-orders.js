import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://test-cloud-f299f.firebaseio.com/'
})

export default instance
