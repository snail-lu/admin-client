const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home',
    },
    {
        title: '商品',
        key: '/products',
        icon: 'shopping',
        children: [
            {
                title: '商品管理',
                key: '/product',
                icon: 'tool'
            },
            {
                title: '商品分类',
                key: '/category',
                icon: 'bars'
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'user'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'team'
    },
    {
        title: '图表图案',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: '柱形图',
                key: '/bar',
                icon: 'bar-chart'
            },
            {
                title: '折线图',
                key: '/line',
                icon: 'line-chart'
            },
            {
                title: '饼图',
                key: '/pie',
                icon: 'pie-chart'
            }
        ]
    },

];

export default menuList;