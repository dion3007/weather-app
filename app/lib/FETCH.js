import axios from 'axios'

const FETCH = axios.create({
  baseURL: 'https://api.apixu.com/v1/current.json?key=a3d2ff24a25f4436ab8165819192502&q=',
  timeout: 10000,
})

export default FETCH
