<template>
  <div id="map"></div>
</template>


<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
let l1 = new TileLayer({
  source: new XYZ({
    url:
      "http://t3.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=e29f6347c0edb830d8d8b61cae7d1e6c" // 注记
  })
});
let l2 = new TileLayer({
  source: new XYZ({
    url:
      "http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=e29f6347c0edb830d8d8b61cae7d1e6c" // 行政区划
  })
});
export default {
  name: "openlayersMap",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url:
              "http://t7.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=e29f6347c0edb830d8d8b61cae7d1e6c" // 街道地图
          })
        }),
        new TileLayer({
          source: new XYZ({
            url:
              "http://t7.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=e29f6347c0edb830d8d8b61cae7d1e6c" // 注记
          })
        })
      ],
      view: new View({
        projection: "EPSG:4326",
        center: [121.47, 31.23],
        zoom: 12
      })
    });
  }
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
.ol-attribution,
.ol-zoom {
  display: none;
}
</style>
