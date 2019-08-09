<template>
  <div style="width:100%;height:100%">
    <div id="bmap" ref="bmap"></div>
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
import BMapUtil from "../../../utils/BMap";
import TMapUtil from "../../../utils/TMap";
import { mapActions, mapState } from "vuex";
import funnyapi from "../../../api/funnyapi";

export default {
  mounted() {
    this.initMap();
    this.initT();
  },
  data() {
    return {
      BMap: null,
      T: null,
      map: null,
      geocode: null,
      hasPoints: false
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
      BMapUtil.init()
        .then(BMap => {
          this.BMap = BMap;
          this.map = new BMap.Map(this.$refs.bmap, { enableMapClick: false });
          this.map.enableScrollWheelZoom();
          this.map.removeControl(new BMap.CopyrightControl("none"));
          this.map.centerAndZoom(new BMap.Point(121.47, 31.23), 13);
          this.map.addControl(
            new BMap.CityListControl({
              anchor: BMap.BMAP_ANCHOR_TOP_LEFT,
              offset: new BMap.Size(10, 20)
            })
          );
          if (
            this.queryParams.keyword !== undefined &&
            this.queryParams.keyword !== ""
          ) {
            this.map.centerAndZoom(
              new BMap.Point(this.queryParams.lon, this.queryParams.lat),
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
    deliverMethod(e) {
      if (e.keyword == undefined && this.queryParams.keyword == "") {
        this.addMark({
          lat: e.point.lat,
          lon: e.point.lng,
          wd: "美食",
          ps: 20,
          pn: 1
        });
      } else {
        this.addMark({
          lat: e.lat || e.point.lat,
          lon: e.lon || e.point.lng,
          wd: e.keyword || this.queryParams.keyword,
          ps: e.num || this.queryParams.num,
          pn: 1
        });
      }
    },
    addMark({ lat, lon, wd, ps, pn }) {
      const that = this;
      const BMap = this.BMap;
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
            data.data.forEach(el => {
              let elMarker = new BMap.Marker(new BMap.Point(el[5], el[6]));
              that.map.addOverlay(elMarker);
              let opts = {
                width: 200,
                height: 70,
                title: "<strong>" + el[1] + "</strong>",
                offset: new BMap.Size(0, -25)
              };
              let infoWindow = new BMap.InfoWindow("地址：" + el[2], opts);
              elMarker.addEventListener("click", () => {
                that.map.openInfoWindow(
                  infoWindow,
                  new BMap.Point(el[5], el[6])
                );
              });
            });
          } else if (data.status === 2) {
            window.alert("该坐标点" + data.msg.toString());
            that.setPOI(null);
          }
        }
      );
      let customIcon = new BMap.Icon(
        "http://api.tianditu.gov.cn/v4.0/image/marker-icon.png",
        new BMap.Size(25, 41),
        { anchor: new BMap.Size(10, 40) }
      );
      let mainPointMarker = new BMap.Marker(new BMap.Point(lon, lat), {
        icon: customIcon
      });
      that.map.addOverlay(mainPointMarker);
      new T.Geocoder().getLocation(new T.LngLat(lon, lat), searchResult => {
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
          let opts = {
            width: 200,
            height: 0,
            offset: new BMap.Size(0, -35)
          };
          let infoWindow = new BMap.InfoWindow(infoAddress, opts);
          mainPointMarker.addEventListener("click", () => {
            that.map.openInfoWindow(infoWindow, new BMap.Point(lon, lat));
          });
        } else {
          window.alert("逆地理编码异常！");
        }
      });
      that.map.removeEventListener("click", this.deliverMethod);
      that.hasPoints = true;
    },
    clearMark() {
      this.map.clearOverlays();
      this.map.removeEventListener("click");
      this.map.addEventListener("click", this.deliverMethod);
      this.hasPoints = false;
    }
  }
};
</script>

<style>
#bmap {
  height: 100%;
  width: 100%;
  position: fixed !important;
}
#clearBtn {
  z-index: 889;
  position: relative;
  float: right;
}
</style>
