const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home',
    },
    {
        title: '配置管理',
        key: '/settings',
        icon: 'tool',
        children: [
            {
                title: '菜单配置',
                key: '/menus',
                icon: 'table'
            },
            {
                title: '分类配置',
                key: '/classification',
                icon: 'tool'
            },
            {
                title: '活动配置',
                key: '/activities',
                icon: 'transaction'
            }
        ]
    },
    {
        title: '内容管理',
        key: 'contents',
        icon: 'tool',
        children: [
            {
                title: '商品管理',
                key: '/product',
                icon: 'tool'
            },
            {
                title: '评论管理',
                key: '/comment',
                icon: 'tool'
            }
        ]
    },
    {
        title: '用户管理',
        key: 'users',
        icon: 'user',
        children: [
            {
                title: '商城用户管理',
                key: '/user',
                icon: 'user'
            },
            {
                title: '后台用户管理',
                key: '/role',
                icon: 'team'
            }
        ]
    },
    {
        title: '报表数据',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: '商品数据报表',
                key: '/bar',
                icon: 'bar-chart'
            },
            {
                title: '用户数据报表',
                key: '/line',
                icon: 'line-chart'
            },
            {
                title: '销售数据报表',
                key: '/pie',
                icon: 'pie-chart'
            }
        ]
    },

];

export default menuList;