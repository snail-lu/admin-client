import store from 'store';
const USER_KEY = 'user_key';
export default {
    /**
     * 保存
     */
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user));  //原生用法
        store.set(USER_KEY,user);              //使用store库
    },

    /**
     * 读取
     */
    getUser(user){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}'); 
        return store.get(USER_KEY) || {};

    },

    /**
     * 删除
     */
    removeUser(){
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    }
}