import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reqWeather } from '../../services';
import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menu_config';
import LinkButton from '../link-button/link-button';
import './top-nav.less';
import { Modal, Avatar, Divider, Menu, Dropdown, Icon, Row, Col } from 'antd';

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
                let pattern = null;
                item.children.forEach(cItem=>{
                    pattern = new RegExp(cItem.key,"g");
                    if(pattern.test(path)){
                        title = cItem.title;
                    }
                    // return cItem.key==='/menus'
                })
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
        // this.getDate();
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        const { weather } = this.state;
        const avatar = memoryUtils.user.avatar;
        // const title = this.getTitle();
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <span>首页</span>
                </Menu.Item>
                <Menu.Item key="1">
                    <span onClick={this.logout}>退出登录</span>
                </Menu.Item>
            </Menu>
        );
        return (
                <Row type="flex" justify="end" align="middle">
                    <span>{weather}</span>
                    <Divider type="vertical" />
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div>
                            <Avatar icon='user' src={avatar} />
                            <Icon type="down" />
                        </div>
                    </Dropdown>
                    {/*<LinkButton onClick={this.logout}>退出</LinkButton>*/}
                </Row>
        );
    }
}

export default withRouter(TopNav);