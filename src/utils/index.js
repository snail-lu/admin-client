export default class Utils{
    static getAdminRole(adminLevel){
        switch(adminLevel){
            case '0':
                return '普通员工'
            case '1':
                return '初级管理员'
            case '2':
                return '中级管理员'
            case '3':
                return '高级管理员'
            default:
                return '未知身份'
        }
    }
} 