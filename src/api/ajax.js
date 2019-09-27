/**
 * 封装发送异步请求ajax
 * 这里多包了一层new Promise是为了在ajax里将请求异常的情况一起处理了，
 * 而不用每次外部调用的时候都使用try...catch再处理
 */
import axios from 'axios';
import {message} from 'antd';


export default function ajax(url,data={},type='GET'){
    // 3.将异步请求结果使用Promise包装返回
    return new Promise((resolve,reject)=>{
        let promise;

        //1.执行异步请求
        if(type==='GET'){
            promise = axios.get(url,{
                params: data
            });
        }else{
            promise = axios.post(url,data);
        }

        //2.处理请求结果
        promise.then(res=>{
            resolve(res.data);
        }).catch(e=>{
            message.error('请求出错了：'+e.message)
        })
    })
    
}