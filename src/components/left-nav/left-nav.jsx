import React, { Component } from 'react';
import './left-nav.less';
import { Link, withRouter } from 'react-router-dom';

import { Menu, Icon,} from 'antd';
import menuList from '../../config/menu_config';

const { SubMenu } = Menu;

class LeftNav extends Component {
    constructor(props){
        super(props);
        this.menuNodes = this.getMenuNodes_reduce(menuList);
    }
    /**
     * 动态生成导航标签
     * map()+递归
     */
    getMenuNodes = (list) => {
         //得到当前页面的路由路径
         const path = this.props.location.pathname;
        return list.map((item,index)=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => cItem.key===path);
                //如果存在，说明当前的item的子列表需要展开
                if(cItem){
                    
                    this.openKey = item.key;
                }
                return(
                    <SubMenu 
                        key={item.key} 
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu> 
                )
            }
        })
    }

    /**
     * 动态生成导航标签
     */
    getMenuNodes_reduce = (list) => {

        //得到当前页面的路由路径
        const path = this.props.location.pathname;

        return list.reduce((pre,item)=>{
            if(!item.children){
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => cItem.key===path);
                //如果存在，说明当前的item的子列表需要展开
                if(cItem){
                    this.openKey = item.key;
                }
                pre.push(
                    <SubMenu 
                        key={item.key} 
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu> 
                )
            }
            return pre;
        },[])
    }

    render() {
        // this.menuNodes = this.getMenuNodes_reduce(menuList);
        //得到当前页面的路由路径
        const path = this.props.location.pathname;
        return (
            <div className="left-nav">
                <Link to="/admin" className="left-nav-header">
                    <Icon type="codepen" style={{ fontSize: '26px', color: 'white' }}/>
                    {
                        this.props.collapsed ? null : <h1>后台管理</h1>
                    }
                </Link>
                {/* defaultSelectedKeys可用于根据路由路径选中对应的导航标签 */}
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    >
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}
/**
 * WithRouter高阶组件
 * 包装非路由组件，返回一个新的组件
 * 新的组件将具有非路由组件所没有的history/location/match   3个属性
 */
export default withRouter(LeftNav);