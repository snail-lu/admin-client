/**
 * 格式化日期
 */
export function formateDate(time){
    if(!time){return ''};
    let date = new Date(time);
    let hours = date.getHours()>'9'?date.getHours():'0'+date.gerHours();
    let minutes = date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes();
    let seconds = date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() 
            + ' ' + hours + ':' + minutes + ':' + seconds;
}