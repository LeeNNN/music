import { commonData } from "../common/js/config.js";
import axios from "axios";

//定义请求歌手列表接口
const getSingerList= ()=>{
    const url= `/v8/fcg-bin/v8.fcg`;
    const data= Object.assign({},commonData,{
        hostUin: 0,
        needNewCode: 0,
        platform: "yqq.json",
        page: "list",
        channel: "singer",
        key: "all_all_all",
        pagesize: 80,
        pagenum: 1
    });
    return axios.get(url,{
        params: data
    }).then(res =>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        console.log(err)
    })
}

export {
    getSingerList
}