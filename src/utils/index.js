import { message } from 'antd';
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

    static getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
      
    static beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('只能上传 JPG/PNG 类型的图片!');
        }
        const isLt100K = file.size / 1024 / 1024 < 0.1;
        if (!isLt100K) {
          message.error('图片尺寸不能超过100KB!');
        }
        return isJpgOrPng && isLt100K;
    }
} 