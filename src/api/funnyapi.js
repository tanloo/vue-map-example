import axios from "axios";

export default {
    search_poi(params, fun) {
        axios.get("http://192.168.5.16:9999/search_poi", {
            params
        }).then(({
            data
        }) => {
            fun(data);
        }).catch(error => {
            window.alert("接口出现异常：" + error);
        });
    },
    gis(fun, params) {
        axios.get("http://192.168.5.16:9999/gis", {
            params
        }).then(({
            data
        }) => {
            fun(data);
        }).catch(error => {
            window.alert("接口出现异常：" + error);
        });
    }
}