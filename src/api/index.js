/**
 * 封装各请求函数
 */

import ajax from "./ajax";
import jsonp from 'jsonp'; 
import { message } from "antd";

const apiBase = '/api';

//登录
export const reqLogin = (username,password) => ajax(apiBase+'/admin/login',{username,password},'POST');

//注册
export const reqRegister = (username,password,adminLevel,email,avatar) => ajax(apiBase+'/admin/register',{username,password,adminLevel,email,avatar},'POST');

//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax(apiBase+'/category/add',{categoryName,parentId},'POST');

//获取分类
export const reqCategoryList = (parentId) => ajax(apiBase+'/category/list',{parentId},'POST');

//更新分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax(apiBase+'/category/update',{categoryId,categoryName},'POST');

//获取管理员列表
export const reqAdminList = () => ajax(apiBase+'/admin/list',{},'POST');

//删除管理员
export const reqDeleteAdmin = (id) => ajax(apiBase+'/admin/delete',{id},'POST');

//修改管理员信息
export const reqUpdateAdmin = ({_id,username,email,adminLevel,avatar}) => ajax(apiBase+'/admin/update',{_id,username,email,adminLevel,avatar},'POST');

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
export const addConfig = (configName,configKey,configValue,configSorts) => ajax(apiBase+'/config/add',{configName,configKey,configValue,configSorts},'POST');

//修改配置
export const saveConfig = (id,configName,configKey,configValue,configSorts,reviser) => ajax(apiBase+'/config/edit',{id,configName,configKey,configValue,configSorts,reviser},'POST');

//配置列表
export const reqConfigList = () => ajax(apiBase+'/config/list',{},'POST');

//获取配置信息
export const getConfigInfo = (id) => ajax(apiBase+'/config/detail',{ id }, 'POST');

//文章列表
export const reqArticlesList = () => ajax(apiBase+'/articles/list',{},'POST');

//文章详情
export const reqArticleInfo = (id) => ajax(apiBase+'/articles/detail',{ id },'POST');

//新增文章
export const addArticle = (title,author,content) => ajax(apiBase+'/articles/add', {title,author,content},'POST');

export const saveArticle = (id, title, author, content) => ajax(apiBase+'/articles/save', { id, title, author, content }, 'POST');


reqWeather('北京')