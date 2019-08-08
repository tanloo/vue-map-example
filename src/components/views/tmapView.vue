<template>
  <div id="mapDiv" class="mapDiv" ref="mapDiv">
    <el-button
      id="clearBtn"
      type="danger"
      icon="el-icon-delete"
      @click.stop="claerMark"
      v-show="hasPoints"
    >清除标记</el-button>
  </div>
</template>
 
<script>
import BaiduMap from "../../utils/TMap";
import axios from "axios";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      zoom: "11",
      T: "",
      lay: "",
      map: "",
      geocode: null,
      hasPoints: false
    };
  },
  computed: {
    ...mapState(["queryParams"])
  },
  mounted() {
    this.initMap();
  },
  methods: {
    ...mapActions(["setPOI", "setMainPoint"]),
    deliverMethod(e) {
      if (e.keyword == undefined && this.queryParams.keyword == "") {
        this.addMark({
          lat: e.lnglat.getLat(),
          lon: e.lnglat.getLng(),
          wd: "美食",
          ps: 20,
          pn: 1
        });
      } else {
        this.addMark({
          lat: e.lat || e.lnglat.getLat(),
          lon: e.lon || e.lnglat.getLng(),
          wd: e.keyword || this.queryParams.keyword,
          ps: e.num || this.queryParams.num,
          pn: 1
        });
      }
    },
    addMark({ lat, lon, wd, ps, pn }) {
      const that = this;
      const T = this.T;
      axios
        .get("http://192.168.5.16:9999/search_poi", {
          params: {
            ps,
            pn,
            wd,
            lng: lon,
            lat
          }
        })
        .then(function({ data }) {
          if (data.status === 1) {
            that.setPOI(data.data);
            const customIcon = new T.Icon({
              iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
              iconSize: new T.Point(19, 27),
              iconAnchor: new T.Point(10, 25)
            });
            data.data.forEach(el => {
              let customMark = new T.Marker(new T.LngLat(el[5], el[6]), {
                icon: customIcon
              });
              that.map.addOverLay(customMark);
              customMark.addEventListener("click", function(e) {
                let markerInfoWin = new T.InfoWindow(el[1], {
                  offset: new T.Point(0, -30)
                });
                that.map.openInfoWindow(
                  markerInfoWin,
                  new T.LngLat(el[5], el[6])
                );
              });
            });
          } else if (data.status === 2) {
            window.alert("该坐标点" + data.msg.toString());
          }
        })
        .catch(error => {
          window.alert("出现异常：" + error);
        });
      let mainMark = new that.T.Marker(new T.LngLat(lon, lat));
      that.map.addOverLay(mainMark);
      that.geocode.getLocation(new T.LngLat(lon, lat), searchResult => {
        if (searchResult.status === "0") {
          that.setMainPoint({
            addressComponent: searchResult.addressComponent,
            location: searchResult.location
          });
          let infoAddress = "";
          if (
            searchResult.formatted_address === "" ||
            searchResult.formatted_address == null
          ) {
            infoAddress =
              searchResult.addressComponent.nation +
              searchResult.addressComponent.province +
              searchResult.addressComponent.city +
              searchResult.addressComponent.city +
              searchResult.addressComponent.county +
              searchResult.addressComponent.address;
          } else {
            infoAddress = searchResult.formatted_address;
          }
          mainMark.addEventListener("click", function(e) {
            let markerInfoWin = new T.InfoWindow(infoAddress, {
              offset: new T.Point(0, -30)
            });
            that.map.openInfoWindow(markerInfoWin, new T.LngLat(lon, lat));
          });
        } else {
          window.alert("逆地理编码异常！");
        }
      });
      that.map.removeEventListener("click");
      that.hasPoints = true;
    },
    initMap() {
      BaiduMap.init()
        .then(T => {
          this.T = T;
          this.geocode = new T.Geocoder();
          this.zoom = 12;
          let config = {
            projection: "EPSG:4326"
          };
          this.map = new T.Map(this.$refs.mapDiv, config);
          this.map.centerAndZoom(new T.LngLat(121.47, 31.23), this.zoom);
          if (
            this.queryParams.keyword !== undefined &&
            this.queryParams.keyword !== ""
          ) {
            this.map.centerAndZoom(
              new T.LngLat(this.queryParams.lon, this.queryParams.lat),
              13
            );
            this.deliverMethod(this.queryParams);
          } else {
            this.map.addEventListener("click", this.deliverMethod);
          }
        })
        .catch(error => {
          window.alert("地图初始化异常：" + error);
        });
    },
    claerMark() {
      this.map.clearOverLays();
      this.map.closeInfoWindow();
      this.map.removeEventListener("click");
      this.map.addEventListener("click", this.deliverMethod);
      this.hasPoints = false;
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