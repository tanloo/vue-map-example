<template>
  <div id="mapid">
    <el-button
      id="clearBtn"
      type="danger"
      icon="el-icon-delete"
      @click.stop="clearMark"
      v-show="hasPoints"
    >清除标记</el-button>
  </div>
</template>

<script>
import TMapUtil from "../../../utils/TMap";
import LMapUtil from "../../../utils/Leaflet";
import { mapActions, mapState } from "vuex";
import funnyapi from "../../../api/funnyapi";

export default {
  mounted() {
    this.initT();
    this.initMap();
  },
  data() {
    return {
      T: null,
      L: null,
      map: null,
      hasPoints: false,
      markerGroup: []
    };
  },
  computed: {
    ...mapState(["queryParams"])
  },
  methods: {
    ...mapActions(["setPOI", "setMainPoint"]),
    initT() {
      TMapUtil.init()
        .then(T => {
          this.T = T;
          this.geocode = new T.Geocoder();
        })
        .catch(error => {
          window.alert("天地图API加载异常：" + error);
        });
    },
    initMap() {
      LMapUtil.init()
        .then(L => {
          this.L = L;
          this.map = L.map("mapid", {
            crs: L.CRS.EPSG3857,
            zoomControl: false,
            attributionControl: false
          }).setView([31.23, 121.47], 13);
          this.L.tileLayer(
            "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
            {
              maxZoom: 18,
              id: "mapbox.streets",
              accessToken:
                "pk.eyJ1IjoidGFubG9vIiwiYSI6ImNqejJmcmV4azAxbXIzbXBndjB1NGRndnEifQ.07B2O-krj9ZSRX7JR_0HfQ"
            }
          ).addTo(this.map);
          if (
            this.queryParams.keyword !== undefined &&
            this.queryParams.keyword !== ""
          ) {
            this.map.setView([this.queryParams.lat, this.queryParams.lon]);
            this.deliverMethod(this.queryParams);
          } else {
            this.map.once("click", this.deliverMethod);
          }
        })
        .catch(error => {
          window.alert("地图初始化异常：" + error);
        });
    },
    deliverMethod(e) {
      if (e.keyword == undefined && this.queryParams.keyword == "") {
        this.addMark({
          lat: e.latlng.lat,
          lon: e.latlng.lng,
          wd: "美食",
          ps: 20,
          pn: 1
        });
      } else {
        this.addMark({
          lat: e.lat || e.latlng.lat,
          lon: e.lon || e.latlng.lng,
          wd: e.keyword || this.queryParams.keyword,
          ps: e.num || this.queryParams.num,
          pn: 1
        });
      }
    },
    addMark({ lat, lon, wd, ps, pn }) {
      const that = this;
      const T = this.T;
      funnyapi.search_poi(
        {
          ps,
          pn,
          wd,
          lng: lon,
          lat
        },
        data => {
          if (data.status === 1) {
            this.$message({
              message:
                "查询成功，关键词“" +
                wd +
                "”，共查到" +
                data.data.length +
                "条结果！",
              type: "success"
            });
            that.setPOI(data.data);
            const customIcon = that.L.icon({
              iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
              iconSize: [19, 27], 
              popupAnchor: [0, -10] 
            });
            data.data.forEach(el => {
              let marker = that.L.marker([el[6], el[5]], {
                icon: customIcon
              }).bindPopup(el[1]);
              that.markerGroup.push(marker);
              marker.addTo(that.map);
            });
          } else if (data.status === 2) {
            window.alert("该坐标点" + data.msg.toString());
          }
        }
      );
      let mainMark = that.L.marker([lat, lon]);
      that.markerGroup.push(mainMark);
      mainMark.addTo(that.map);
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
              searchResult.addressComponent.county +
              searchResult.addressComponent.address;
          } else {
            infoAddress = searchResult.formatted_address;
          }
          mainMark.bindPopup(infoAddress);
        } else {
          window.alert("逆地理编码异常！");
        }
      });
      that.hasPoints = true;
    },
    clearMark() {
      this.markerGroup.forEach(el => {
        this.map.removeLayer(el);
      });
      this.map.once("click", this.deliverMethod);
      this.hasPoints = false;
    }
  }
};
</script>

<style>
#mapid {
  height: 100%;
  width: 100%;
}
#clearBtn {
  z-index: 889;
  position: relative;
  float: right;
}
</style>
