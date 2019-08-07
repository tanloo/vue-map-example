import axios from "axios";

const axios_get = (url, params, callback) => {
    axios.get(url, {
        params
    }).then(({
        data
    }) => {
        if (data.status === 1 || data.error === 0) {
            callback(data.data);
        } else {
            window.alert("接口出现异常！");
        }
    }).catch(function (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    });
}

export default {
    search_poi(fun, params) {
        axios.get("http://192.168.5.16:8888/search_poi", {
            params
        }).then(({
            data
        }) => {
            fun(data.data);
        });
        //axios_get("http://192.168.5.16:8888/search_poi", params, fun);
    },
    gis(fun, params) {
        axios_get("http://192.168.5.16:8888/gis", params, fun);
    }
}