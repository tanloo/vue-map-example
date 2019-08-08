<template>
  <el-form ref="form" :model="form" label-position="left" :rules="rules">
    <el-form-item label="查询关键词" prop="keyword">
      <el-input v-model.trim="form.keyword"></el-input>
    </el-form-item>
    <el-form-item label="经度" prop="lon">
      <el-input v-model="form.lon" @change="onLonChange"></el-input>
    </el-form-item>
    <el-form-item label="纬度" prop="lat">
      <el-input v-model="form.lat" @change="onLatChange"></el-input>
    </el-form-item>
    <el-form-item label="查询数量">
      <el-select v-model="form.num" placeholder="请选择查询数量(默认10)">
        <el-option label="10" value="10"></el-option>
        <el-option label="20" value="20"></el-option>
        <el-option label="30" value="30"></el-option>
        <el-option label="40" value="40"></el-option>
        <el-option label="50" value="50"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="handleSave">保存参数</el-button>
      <el-button type="primary" @click="handleQuery">立即查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import TMapUtil from "../utils/TMap";
import store from "../store";
import funnyapi from "../api/funnyapi";

export default {
  mounted() {
    this.initT();
    if (this.mainPoint !== null && this.mainPoint !== undefined) {
      this.form.lon = this.mainPoint.location.lon;
      this.form.lat = this.mainPoint.location.lat;
    }
    this.resetParams();
  },
  data() {
    const checkFloat = (rule, value, callback) => {
      if (typeof value !== "number") {
        return callback(new Error("请输入数字值"));
      }
      callback();
    };
    return {
      T: null,
      geocode: null,
      form: {
        keyword: "美食",
        lon: 121.48926,
        lat: 31.23149,
        num: 20
      },
      rules: {
        keyword: [{ required: true, message: "关键词不能为空" }],
        lon: [
          { required: true, message: "关键词不能为空" },
          { validator: checkFloat, trigger: "blur" }
        ],
        lat: [
          { required: true, message: "关键词不能为空" },
          { validator: checkFloat, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      mainPoint: state => state.points.mainPoint
    })
  },
  methods: {
    ...mapActions(["setPOI", "setMainPoint", "setParams", "resetParams"]),
    initT() {
      TMapUtil.init()
        .then(T => {
          this.T = T;
          this.geocode = new T.Geocoder();
        })
        .catch(error => {
          window.alert("地图初始化异常：" + error);
        });
    },
    onLonChange(e) {
      if (!Number.isNaN(Number(e))) {
        this.form.lon = Number(e);
      }
    },
    onLatChange(e) {
      if (!Number.isNaN(Number(e))) {
        this.form.lat = Number(e);
      }
    },
    handleSave() {
      this.setParams({
        keyword: this.form.keyword,
        lon: this.form.lon,
        lat: this.form.lat,
        num: this.form.num
      });
    },
    handleQuery() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const that = this;
          funnyapi.search_poi(
            {
              ps: this.form.num,
              pn: 1,
              wd: this.form.keyword,
              lng: this.form.lon,
              lat: this.form.lat
            },
            data => {
              if (data.status === 1) {
                that.setPOI(data.data);
              } else if (data.status === 2) {
                window.alert("该坐标点" + data.msg.toString());
              }
            }
          );
         /*  axios
            .get("http://192.168.5.16:9999/search_poi", {
              params: {
                ps: this.form.num,
                pn: 1,
                wd: this.form.keyword,
                lng: this.form.lon,
                lat: this.form.lat
              }
            })
            .then(function({ data }) {
              if (data.status === 1) {
                that.setPOI(data.data);
              } else if (data.status === 2) {
                window.alert("该坐标点" + data.msg.toString());
              }
            })
            .catch(error => {
              window.alert("出现异常：" + error);
            }); */
          that.geocode.getLocation(
            new T.LngLat(this.form.lon, this.form.lat),
            searchResult => {
              if (searchResult.status === "0") {
                that.setMainPoint({
                  addressComponent: searchResult.addressComponent,
                  location: searchResult.location
                });
              } else {
                window.alert("逆地理编码异常！");
              }
            }
          );
        } else {
          window.alert("检查输入合法性！");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
