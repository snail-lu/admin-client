import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {reqWeather} from '../../api';
import {formateDate} from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menu_config';
import LinkButton from '../link-button/link-button';
import './top-nav.less';
import {Modal} from 'antd';

class TopNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            weather: '',
            dayPictureUrl:'',
            currentTime: '',
            title:''
        }
    }

    /**
     * 获取天气信息
     */
    getWeather = async (city) => {
        let weather = await reqWeather(city);
        this.setState({
            weather: weather.weather,
            dayPictureUrl: weather.dayPictureUrl
        });
    }
    /**
     * 获取并设置日期定时器
     */
    getDate = () => {
        this.timer = setInterval(()=>{
            const currentTime = formateDate(Date.now());
            this.setState({currentTime});
        },500)
    }

    /**
     * 获取标题
     */
    getTitle = () => {
        const path = this.props.location.pathname;
        let title = '';
        menuList.forEach((item)=>{
            if(item.key===path){
                title = item.title;
            }else if(item.children){
                let cItem = item.children.find(cItem=>{
                    return cItem.key===path;
                })
                if(cItem){
                    title = cItem.title;
                }
            }
        })
        return title;

    }

    /**
     * 退出登录
     */
    logout = () => {
        Modal.confirm({
            content: '确认退出？',
            okText: '确认',
            cancelText: '取消',
            onOk:() =>{
                storageUtils.removeUser();
                memoryUtils.user = {};
                this.props.history.replace('/login');
            }
        })
    }

    componentDidMount(){
        this.getWeather('上海');
        this.getDate();
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        const {weather,dayPictureUrl,currentTime} = this.state;
        const username = memoryUtils.user.username;

        const title = this.getTitle();
        return (
            <div className="top-nav">
                <div className="top-nav-top">
                    <span>欢迎{username}，</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="top-nav-bottom">
                    <div className='top-nav-bottom-l'>{title}</div>
                    <div className='top-nav-bottom-r'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl}/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TopNav);