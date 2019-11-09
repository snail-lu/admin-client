/**
 * 封装各请求函数
 */

import ajax from "./ajax";
import jsonp from 'jsonp'; 
import { message } from "antd";

//登录
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST');

//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax('/category/add',{categoryName,parentId},'POST');

//获取分类
export const reqCategoryList = (parentId) => ajax('/category/list',{parentId},'POST');

//更新分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax('/category/update',{categoryId,categoryName},'POST');


//获取天气
export const reqWeather = (city) => {
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            if(!err && data.status==='success'){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather});
            }else{
                message.error('获取天气信息失败')
            }
        })
    })   
}

reqWeather('北京')