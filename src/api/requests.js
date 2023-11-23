import axios from 'axios'

const requests = axios.create({
      // 基础路径，发送请求时，路径中会出现api
      baseURL: 'http://localhost:5000',
      // timeout: 5000
})

requests.interceptors.request.use((config) => {
      // console.log(config.url,config.headers,config.params);
      //config ：配置对象，对象里面有一个属性很重要，headers请求头 
      return config
})

requests.interceptors.response.use((res) => {
      // 成功的回调
      return res.data
}, (error) => {
      // 失败的回调
      return Promise.reject(error);
})
export default requests