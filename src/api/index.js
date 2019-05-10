import axios from 'axios';
import Qs from 'qs';

axios.defaults.baseURL = 'http://localhost:8000';
//是否允许跨域，并且携带cookie
axios.defaults.withCredentials = true;
//所有post和input请求被拦截，把主体data数据转换为X-WWW-URLENCODE格式传给服务器，Qs.stringify就是干这事的
axios.defaults.transformRequest = (data = {}) => Qs.stringify(data);
//响应拦截器，我们只获取相应主体的内容，传给then
axios.interceptors.response.use(result => result.data);

export default axios;