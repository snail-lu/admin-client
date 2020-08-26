/**
 * 封装各请求函数
 */

import request from "../utils/request";
import jsonp from 'jsonp'; 
import { message } from "antd";

const apiBase = '/services';

//登录
export const reqLogin = (username,password) => request(apiBase+'/admin/login',{username,password},'POST');

//注册
export const reqRegister = (username,password,adminLevel,email,avatar) => request(apiBase+'/admin/register',{username,password,adminLevel,email,avatar},'POST');

//添加分类
export const reqAddCategory = (categoryName,parentId) => request(apiBase+'/category/add',{categoryName,parentId},'POST');

//获取分类
export const reqCategoryList = (parentId) => request(apiBase+'/category/list',{parentId},'POST');

//更新分类
export const reqUpdateCategory = (categoryId,categoryName) => request(apiBase+'/category/update',{categoryId,categoryName},'POST');

//获取管理员列表
export const reqAdminList = () => request(apiBase+'/admin/list',{},'POST');

//删除管理员
export const reqDeleteAdmin = (id) => request(apiBase+'/admin/delete',{id},'POST');

//修改管理员信息
export const reqUpdateAdmin = ({_id,username,email,adminLevel,avatar}) => request(apiBase+'/admin/update',{_id,username,email,adminLevel,avatar},'POST');

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

//新增配置
export const addConfig = (configName,configKey,configValue,configSorts) => request(apiBase+'/config/add',{configName,configKey,configValue,configSorts},'POST');

//修改配置
export const saveConfig = (id,configName,configKey,configValue,configSorts,reviser) => request(apiBase+'/config/edit',{id,configName,configKey,configValue,configSorts,reviser},'POST');

//配置列表
export const reqConfigList = () => request(apiBase+'/config/list',{},'POST');

//获取配置信息
export const getConfigInfo = (id) => request(apiBase+'/config/detail',{ id }, 'POST');

//文章列表
export const reqArticlesList = () => request(apiBase+'/articles/list',{},'POST');

//文章详情
export const reqArticleInfo = (id) => request(apiBase+'/articles/detail',{ id },'POST');

//新增文章
export const addArticle = (title,author,content) => request(apiBase+'/articles/add', {title,author,content},'POST');

export const saveArticle = (id, title, author, content) => request(apiBase+'/articles/save', { id, title, author, content }, 'POST');


reqWeather('北京')