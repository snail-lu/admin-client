import React from 'react';
import { Icon } from 'antd';
/*   
 * 登录和注册页共用框架
 */
const LoginLayout = (props) => {
    return (
        <div className="login">
            <header className='login-header'>
                <Icon type="codepen" style={{ fontSize: '30px', color: 'white' }} />
                <h1>后台管理系统</h1>
            </header>
            { props.children }
        </div>
    )
}

export default LoginLayout;