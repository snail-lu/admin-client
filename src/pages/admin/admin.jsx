import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

/**
 * 后台 管理的路由组件
 */
class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        if(!user || !user._id){
            return <Redirect to='/' />
        }
        return (
            <div>
                Hello {user.username}
            </div>
        );
    }
}

export default Admin;