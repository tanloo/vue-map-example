<template>
  <div id="mapDiv" class="mapDiv" ref="mapDiv">
    <el-button
      id="clearBtn"
      type="danger"
      icon="el-icon-delete"
      @click.stop="claerMark"
      v-show="isClick"
    >清除标记</el-button>
  </div>
</template>
 
<script>
import BaiduMap from "../../utils/TMap";
import axios from "axios";

const addMark = (that, e) => {
  const T = that.T;
  let wd = "美食";
  let lat = e.lnglat.getLat();
  let lng = e.lnglat.getLng();
  let ps = 20;
  let pn = 1;
  axios
    .get("http://192.168.5.16:8888/search_poi", {
      params: {
        ps,
        pn,
        wd,
        lng,
        lat
      }
    })
    .then(function({ data }) {
      if (data.status === 1) {
        const customIcon = new T.Icon({
          iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
          iconSize: new T.Point(19, 27),
          iconAnchor: new T.Point(10, 25)
        });
        data.data.forEach(el => {
          let customMark = new that.T.Marker(new T.LngLat(el[5], el[6]), {
            icon: customIcon
          });
          that.map.addOverLay(customMark);
          customMark.addEventListener("click", function(e) {
            let markerInfoWin = new T.InfoWindow(el[1], {
              offset: new T.Point(0, -30)
            });
            that.map.openInfoWindow(markerInfoWin, e.lnglat);
          });
        });
      }
    });
  let mainMark = new that.T.Marker(new T.LngLat(lng, lat));
  that.map.addOverLay(mainMark);
  axios
    .get("http://192.168.5.16:8888/gis", {
      params: {
        auth_user: "freevip",
        longitude: lng,
        latitude: lat
      }
    })
    .then(({ data }) => {
      if (data.error === 0) {
        mainMark.addEventListener("click", function(e) {
          let markerInfoWin = new T.InfoWindow(
            data.data.zh0 + data.data.zh1 + data.data.zh2 + data.data.zh3,
            {
              offset: new T.Point(0, -30)
            }
          );
          that.map.openInfoWindow(markerInfoWin, e.lnglat);
        });
      }
    });
  that.map.removeEventListener("click");
  that.isClick = true;
};
export default {
  data() {
    return {
      zoom: "11",
      T: "",
      lay: "",
      map: "",
      isClick: false
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      BaiduMap.init()
        .then(T => {
          this.T = T;
          this.zoom = 12;
          let config = {
            projection: "EPSG:4326"
          };
          this.map = new T.Map(this.$refs.mapDiv, config); // 初始化地图对象
          this.map.centerAndZoom(new T.LngLat(121.47, 31.23), this.zoom); // 设置显示地图的中心点和级别
          this.map.addEventListener("click", addMark.bind(null, this));
        })
        .catch(error => {
          console.log(error);
        });
    },
    claerMark(e) {
      this.map.clearOverLays();
      this.map.closeInfoWindow();
      this.map.removeEventListener("click");
      this.map.addEventListener("click", addMark.bind(null, this));
      this.isClick = false;
    }
  }
};
</script>
 
<style scoped>
.mapDiv {
  width: 100%;
  height: 100%;
}
#clearBtn {
  z-index: 889;
  position: relative;
  float: right;
}
</style>