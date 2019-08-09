<template>
  <div id="map"></div>
</template>


<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default {
  name: "openlayersMap",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [121.48926, 31.23149],
          zoom: 14
        })
      });
      let that = this;
      this.map.on("click", function(e) {
        var coor = e.coordinate;
        console.log(coor);
      });
    }
  },
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
