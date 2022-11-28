<template>
    <div class="map" >
      <l-map
          :zoom="zoom"
          :options="{zoomControl: false}"
          @update:zoom="store.updateZoom"
      >
        <l-control-zoom position="topright"></l-control-zoom>
        <l-tile-layer
            url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}{r}?access_token=pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og"
            name="Satellite View"
            layer-type="base"
            :attribution="attributions.satellite"
        >
        </l-tile-layer>
        <l-marker v-if="store.selectedData" :lat-lng="[store.selectedData.y, store.selectedData.x]" :draggable="false">
        <l-tooltip>
          <div>
            <b>Crop: </b> {{store.selectedData.crop}} <br>
            <b>Location: </b> {{store.selectedData.location}} <br>
            <b>Composite Score: </b> {{store.selectedData["Composite Score"]}} <br>
            <b>Climate Score: </b> {{store.selectedData["Composite Score"]}} <br>
            <b>Temperature Score: </b> {{store.selectedData["Composite Score"]}} <br>
            <b>Soil Score: </b> {{store.selectedData["Composite Score"]}} <br>
          </div>
        </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </template>
  
  <script setup>
  import {
    LMap,
    LIcon,
    LMarker,
    LPopup,
    LTooltip,
    LTileLayer,
    LControlLayers,
    LControlZoom,
  } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";
  import { useCounterStore } from '../stores/counter';
  
  const store = useCounterStore();
  const attributions = {
    street: 'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    satellite: 'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>'
  }
  
  let zoom = store.zoom;
  </script>
  
  <style scoped>
  .map {
    position: absolute;
    width: 71vw;
    height: 47vh;
    left: 23vw;
    top: 5vh;
    border: 1px solid #E7E6E8;
    border-radius: 9px;
    z-index: 400;
  }
  </style>