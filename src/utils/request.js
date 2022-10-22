import axios from 'axios'
import router from "@/router";

import {serverIp} from "../../public/config";
import {serverHost} from "../../public/config";
import {apiVersion} from "../../public/config";

const request = axios.create({
    baseURL: `http://${serverIp}:${serverHost}/` + apiVersion,
    timeout: 300000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
// request.interceptors.request.use(config => {
//     config.headers['Content-Type'] = 'application/json;charset=utf-8';
//     let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
//     if (user) {
//         config.headers['token'] = user.token;  // 设置请求头
//     }
//
//     return config
// }, error => {
//     return Promise.reject(error)
// });

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 请求文件流 使用get请求下载并且接口返回正常的情况
        if (response.data.type === 'application/octet-stream') {
            // console.log('文件流');
            return response;
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 当权限验证不通过的时候给出提示
        if (res.code === '401') {
            // ElementUI.Message({
            //     message: res.msg,
            //     type: 'error'
            // });
            router.push("/login")
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

