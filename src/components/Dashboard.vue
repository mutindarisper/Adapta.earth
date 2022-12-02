
<template>
    <div class="dashboard" id="dashboard">

        <Analysis
        @handleSuccess="handleSuccess"
        @handleError="handleError"
        @zoomTo="handleZoomTo"
        @zoomTo2="handlezoom2"
       
       />
        <div class="info">
            <!-- <Info /> @zoomTo="handleZoomTo"-->
           

        </div>
        
        <div  class="spinner"  v-if="loading">
            <img src="../assets/loader_white.svg" alt="">
        </div>
             
       
        
          <div id="map">
            <!-- <h2 class="zoom_controls1">{{store.getSelectedCoords}}</h2> " -->
            <img src="../assets/draw.svg" class="draw" alt="">
            <img src="../assets/publish.svg" class="upload" alt="">
            <img src="../assets/download.svg" alt="" class="download" @click="screenshot">

            <div class="zoom_controls">
              <img src="../assets/zoomin.svg" class="zoomin" @click="zoom_in" alt="">
              <div class="separate"></div>
              <img src="../assets/zoomout.svg" class="zoomout" @click="zoom_out" alt="">
            </div>
        

          </div>
          <div class="radial">
              <simpleChartVue />
          </div>

          <div class="cap">
              <CAP />
          </div>


          <!-- <div id="findbox"></div> -->
          
        <CompositeScoreVue />
        <div class="biodiversity" >
            <TemperatureScore />
            <div class="climate_chart">
              <climateChartVue />
            </div>
           

        </div>
        <!-- <div class="water" >
            <WaterCoreVue />
        </div> not available -->
        <div class="soil">
            <SoilScoreVue />
            <div class="water_chart">
              <WaterChart />
            </div>
            
        </div>
        <div class="climate" >
            <ClimateScoreVue />
            <div class="soil_chart">
              <soilChart />
            </div>
        </div>



        <div class="success" v-if="success">
          <SuccessVue 
          @continue="handleContinue" />
        </div>


        <div class="success" v-if="error">
          <ErrorVue 
          @continue="handleContinue" />
        </div>

        <!-- notifications -->
        <div class="notification" v-if="store.gray_index &&
          store.band_2 &&
          store.band_3 &&
          store.band_4 == -9999">
          Cannot compute statistics. <br>
          The selected area does not pass biodiversity check
          <!-- <notifications group="auth"  position="bottom right"   width="100" /> -->
        </div>


    </div>
 

 
</template>

<script setup>
import "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.wms"
import "leaflet-control-geocoder"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import $ from "jquery";
import "leaflet-search"
import "leaflet-search/dist/leaflet-search.src.js"
import "leaflet-search/dist/leaflet-search.src.css"
import "leaflet.wms"
// import "BetterWMS/L.TileLayer.BetterWMS"
// import betterWMS from "leaflet.wms/dist/betterWMS.min.js"
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useNotification } from "@kyvg/vue3-notification";
import { GeoSearchControl, OpenStreetMapProvider }  from "leaflet-geosearch"
import "leaflet-geosearch/dist/geosearch.css"
import { onMounted, ref, watch, computed} from 'vue';



import Analysis from '../components/Analysis.vue'
import Info from '../components/Info.vue'
import CompositeScoreVue from "./CompositeScore.vue";
import TemperatureScore from "./TemperatureScore.vue";
import WaterCoreVue from "./WaterCore.vue";
import SoilScoreVue from "./SoilScore.vue";
import ClimateScoreVue from "./ClimateScore.vue";
import SuccessVue from "./Success.vue";
import ErrorVue from "./Error.vue";
import Legend from "./Legend.vue";
import simpleChartVue from "./Charts/simpleChart.vue";
import climateChartVue from "./Charts/climateChart.vue";
import soilChart from "./Charts/soilChart.vue"
import WaterChart from './Charts/WaterChart.vue'
import CAP from "./CAP.vue";
// import Map from '../components/Map.vue'
import { useCounterStore } from "../stores/counter";


const store = useCounterStore()



//refs
let map;
let baseMaps =ref({}) 
let success = ref(false)
let error = ref(false)
var current_point_geojson = ref(null);
let wmsLayer = ref(null)
let crop = ref(null)
let loading = ref(false)
let index = ref(null)
let band2 = ref(null)
let band3 = ref(null)
let band4 = ref(null)
let latlon = ref(null)
let marker = ref(null)
let group = ref(null)

const notification = useNotification()
notification.notify({
  title: "Vue 3 notification 🎉",
  group: "auth",
   text: "Wrong password, please try again" 
});

//basemaps
let osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        }
      );
const mapboxSatellite =  L.tileLayer(
       "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}",
       {
         attribution:
           'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

         id: "mapbox/satellite-v9",
         accessToken:
           "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
       }
     );

     const mapbox =  L.tileLayer(
       "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
       {
         attribution:
           'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
         // maxZoom: 18,
         id: "mapbox/streets-v12",
         accessToken:
           "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
       }
     );




     //hooks
onMounted( () => {

baseMaps.value = {
      OpenStreetMap: osm,
      MapBox: mapbox,
      MapBoxSatellite: mapboxSatellite,
    };
map = L.map("map", {
      zoomControl: false,
      layersControl: false,
      center: [0.02, 37.8582273],
      // minZoom: 6.5,
      // maxZoom: 20,
      zoom: 6,
      // measureControl: true,
      // defaultExtentControl: true,
      layers: [mapboxSatellite]
    }); // add the basemaps to the controls

    L.control.layers(baseMaps.value).addTo(map);
     ///////////////////hide layers control
    //  var layerControl = document.getElementsByClassName(
    //   "leaflet-control-layers"
    // );
    // layerControl[0].style.visibility = "hidden";

    map.createPane("pane800").style.zIndex = 500;


const provider = new OpenStreetMapProvider();



const searchControl = new GeoSearchControl({
  provider: provider,
  stle: 'bar',
  marker: {
    // optional: L.Marker    - default L.Icon.Default
    icon: new L.icon({
      iconUrl: "/src/assets/plant.svg",
      iconSize: [40, 40],
      iconAnchor: [15,15]
    }),
    draggable: false,
  },
  popupFormat: ({ query, result }) => result.label,
  resultFormat: ({ result}) => result.label
  //  console.log(result, 'result')
  
});


const showResult = ({result}) => {
      console.log(result, result)
      return result.label

    }
map.addControl(searchControl);
    
    document.getElementById('search').appendChild(
      document.querySelector(".geosearch")
    );


//     wmsLayer.value =  L.tileLayer.betterWms("http://104.207.156.130:8080/geoserver/adapta/wms?", {
//       pane: 'pane800',
//       layers: 'adapta:MULTI',
//       format: 'image/png',
//       // band:'GRAY_INDEX',
//       transparent: true,  
//       opacity:0.6
// });
// wmsLayer.value.addTo(map);
    
    // map.on('geosearch/showlocation', function(e) {
    //   console.log(e.location, 'expecting result') //got result
    //   storeUserSelections.searched_location = e.location.label.substring(0,20)
    //   console.log( storeUserSelections.searched_location.substring(0,20), 'store location result')

    // });

  //   .on('markgeocode', function(e) {
  //   var bbox = e.geocode.bbox;
  //   var poly = L.polygon([
  //     bbox.getSouthEast(),
  //     bbox.getNorthEast(),
  //     bbox.getNorthWest(),
  //     bbox.getSouthWest()
  //   ]).addTo(map);
  //   map.fitBounds(poly.getBounds());
  // })


})//onmounted end


L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },
  
  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },
  
  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
        showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      url: url,
      success: function (data, status, xhr) {
        var err = typeof data === 'string' ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);  
      }
    });
  },
  
  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,      
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          info_format: 'application/json'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    
    return this._url + L.Util.getParamString(params, this._url, true);
  },
  
  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      // console.log(latlng, 'lat long')
      
      ;
      // var mark = L.icon({
      //                                           iconUrl: "/src/assets/plant.svg",
      //                                           iconSize: [30, 30],
      //                                           iconAnchor: [15,15]
      //                                         });
                                          
      //       return L.marker([latlng.lat, latlng.lng], {icon: mark}).bindPopup("<strong>Composite score:<strong>" + store.gray_index ).addTo(map);
      // console.log(content.features[0].properties.Band2, 'Band 2') L.marker([latlng.lat, latlng.lng]).addTo(map);
      // console.log(content.features[0].properties.Band2, 'band2')


console.log(store.gray_index, 'store gray index')
store.gray_index = content.features[0].properties.Band1
console.log(store.gray_index , 'updated store band 1')

store.band_2 = content.features[0].properties.Band2
console.log(store.band_2 , 'updated store band 2')

store.band_3 = content.features[0].properties.Band3
console.log(store.band_3 , 'updated store band 3')

store.band_4 = content.features[0].properties.Band4
console.log(store.band_4 , 'updated store band 4')

store.latlon = [latlng.lat, latlng.lng]
console.log(store.latlon, 'updated store lat lon')
        return  
        //console.log(latlng, 'lat long');
      
      } // do nothing if there's an error
   
  
    // Otherwise show the content in a popup, or something.
    // L.popup({ maxWidth: 800})
    //   .setLatLng(latlng)
    //   .setContent(content)
    //   .openOn(this._map);
  }
}); //end of L.extend

const getClickedIndex = () => {
 
 index.value = store.gray_index
 console.log(index.value, 'band_1.value')


}

const getClickedBand2 = () => {
  band2.value = store.band_2
 console.log(band2.value , 'band_2.value')
}
const getClickedBand3 = () => {
  band3.value = store.band_3
 console.log(band3.value, 'band_3.value')
}
const getClickedBand4 = () => {
  band4.value = store.band_4
 console.log(band4.value, 'band_4.value')
}

const getClickedLatLon = () => {
  latlon.value = store.latlon
   if(group.value !== null)group.value.clearLayers()
  group.value = L.layerGroup().addTo(map);
  marker.value = L.icon({
                                                iconUrl: "/src/assets/plant.svg",
                                                iconSize: [30, 30],
                                                iconAnchor: [15,15]
                                              });
                                          
            var mark =  L.marker(latlon.value , {icon: marker.value}).bindPopup('<strong>Composite score:<strong>' + store.gray_index.toFixed(2) *100
              +
               '<br>'
               +'<strong>Climate score:<strong>' + store.band_2.toFixed(2) *100
                +
               '<br>'
               +'<strong>Soil score:<strong>' + store.band_3.toFixed(2) *100
                +
               '<br>'
               +'<strong>Water score:<strong>'+ store.band_4.toFixed(2) *100)
                .addTo(group.value)
                return mark
}



L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);  
};


const setGrayIndex = computed( () => {
  
  return  store.getGrayIndex
})

const setBand2 = computed( () => {
  
  return  store.getBand2
})

const setBand3 = computed( () => {
  
  return  store.getBand3
})
const setBand4 = computed( () => {
  
  return  store.getBand4
})

const setLatLon = computed( () => {
  return store.getLatLon
})
watch( setLatLon, () => {
   getClickedLatLon ()
})

watch( setGrayIndex,() => {
  
  getClickedIndex()
  
 
  
})

watch( setBand2,() => {
  
  getClickedBand2()
  
 
  
})
watch( setBand3,() => {
  
  getClickedBand3()
  
 
  
})
watch( setBand4,() => {
  
  getClickedBand4()
  
 
  
})



//see if i can access the selected crop

const getCrop = () => {
  loading.value = true

  var selected_crop = store.getSelectedCrop
  crop.value = selected_crop
console.log(crop.value, 'dash selected crop')


 //add wms layer
 if(wmsLayer.value)map.removeLayer(wmsLayer.value)
//  if(wmsLayer.value) loading.value = false
 


 wmsLayer.value =  L.tileLayer.betterWms("http://104.207.156.130:8080/geoserver/adapta/wms?", {
      pane: 'pane800',
      layers: `adapta:${crop.value}`,
      format: 'image/png',
      transparent: true,  
      opacity:0.6
});
wmsLayer.value.addTo(map);



 

// wmsLayer.value.on('loading', function (event) {
//     loading.value = true
// });

//remove spinner when layer loads
wmsLayer.value.on('load', function (event) {
     loading.value = false
});




//  map.on('click', this.showGetFeatureInfo
 
// //  function showGetFeatureInfo(latlng, layer){
// //   // var layer = wmsLayer.value
// //   // console.log(layer, 'layer!')
// //   console.log(latlng, 'latlng')
  
// // //  var prop = layer.features[0].properties;
// //  var mark=L.marker([latlng.latlng.lat, latlng.latlng.lng]).addTo(map);
// //   var prop = layer.features;
// //   console.log(prop, 'prop')
// // //  var blue=prop['BLUE_BAND'];
// // //  var green=prop['GREEN_BAND'];
// // //  var red=prop['RED_BAND'];
// // //  mark.bindPopup("Blue Band: "+blue.toString()+"
// // //  <br>Green Band:"+green.toString()+"
// // //  <br>Red Band:"+red.toString());
// // //  document.querySelector('#demoR').innerHTML=red; document.querySelector('#demoB').innerHTML=blue; document.querySelector('#demoG').innerHTML = green;
// // }
// )




}


const setSelectedCrop = computed( () => {
  
  return  store.getSelectedCrop
})

watch( setSelectedCrop , () => {
  
  getCrop()
  
 
  
})



const geocoderFn = () => {
  var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
  position: 'topright',
  container:'findbox'
  // className:'searchbox'
})
  .on('markgeocode',  function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(map);
    console.log(e.geocode, 'geocode result')
    map.fitBounds(poly.getBounds());
  //I'll use zoom controls to zoom in
   
  })
  
  .addTo(map);
}



const handleSuccess = () => {
  // console.log('emmited event')
  success.value = true

}

const handleContinue = () => {
  // console.log('emmited event')
  success.value = false
  error.value = false

}

const handleError = () => {
  error.value = true;
}
const screenshot = () => {
   
   domtoimage.toBlob(document.getElementById('dashboard'))
       .then(function (blob) {
           saveAs(blob, 'dashboard.png');
       });
       
   
     }
const zoom_in = () => {
      map.setZoom(map.getZoom() + 1);
    }
  const zoom_out = () => {
      map.setZoom(map.getZoom() - 1);
    }

    const getPoints = () => {
      //var selected_points =[] //store.selectedData.y, store.selectedData.x]
      var selected_points = store.getSelectedCoords
      console.log(selected_points, 'selected points dash') //working

     var stringified= JSON.stringify(selected_points)
     console.log(stringified, 'stringified')

 
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates":  [selected_points[0],selected_points[1]]
    }
};


      current_point_geojson.value = L.geoJSON(geojsonFeature, {
  
              pointToLayer: function (feature, latlng){
                // console.log(latlng, 'lat lon')

                var studioicon = L.icon({
                                                iconUrl: "/src/assets/plant.svg",
                                                iconSize: [30, 30],
                                                iconAnchor: [15,15]
                                              });
                                          
            return L.marker(latlng, {icon: studioicon}).bindPopup("<strong>Crop: <strong>"+ store.selected_crop );
         
              }


        
          })
          current_point_geojson.value.addTo(map)
          
          
         
 
        
          map.fitBounds(current_point_geojson.value.getBounds(), {
                           padding: [50, 50],
                         }); 

                     

     
    }

    const setSelectedPoint = computed( () => {
  return  store.getSelectedCoords
})

watch( setSelectedPoint , () => {
  getPoints()
  
})
const handleZoomTo = () =>{
  if(group.value !== null)group.value.clearLayers()
  group.value = L.layerGroup().addTo(map);
  var  myFGMarker = new L.FeatureGroup();
        var lat = document.getElementById("lat").value;
        var lng = document.getElementById("lng").value;
        map.flyTo(new L.LatLng(lat, lng), 10, {
          animate: true,
          duration: 5
        });
        var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [lat,lng]
    }
};
var studioicon = L.icon({
                                                iconUrl: "/src/assets/plant.svg",
                                                iconSize: [30, 30],
                                                iconAnchor: [15,15]
                                              });

var zoomed_coord = L.marker([lat,lng], {icon: studioicon})
var coords = [lat,lng]
// map.flyTo(coords);
zoomed_coord.addTo(group.value)
zoomed_coord.addTo(myFGMarker)



        map.fitBounds(myFGMarker.getBounds(), {
    // padding: [50, 50],
  });

  // console.log(map.getBounds().contains(zoomed_coord.getLatLng()), 'very long text') false
    } 
 

    const handlezoom2 = (e) => {
      var lat = document.getElementById("lat").value;
      var lon = document.getElementById("lng").value;

      var search = document.getElementById("coords")
      search.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
   
    var coords = [lat,lon]
    
    var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": coords
    }
};


     var searched_coord =  L.geoJSON(geojsonFeature, {
  
              pointToLayer: function (feature, latlng){
                // console.log(latlng, 'lat lon')

                var studioicon = L.icon({
                                                iconUrl: "/src/assets/plant.svg",
                                                iconSize: [30, 30],
                                                iconAnchor: [15,15]
                                              });
                                          
            return L.marker(latlng, {icon: studioicon});
         
              }


        
          })
          searched_coord.addTo(map)
          // map.flyTo(coords)
          
         
 
        
          // map.fitBounds(new L.LatLng(coords).getBoundsZoom(), {
          //                  padding: [50, 50],
          //                }); 
  //   map.flyTo(new L.LatLng(lat, lon));
  //       map.fitBounds(new L.LatLng(lat, lon), {
          
  //   padding: [50, 50],
  // });
  }
  // do something
});
     
   
      // if (e.keyCode === 13) {
      //   console.log(lat, 'input lat')
      //   console.log(lon, 'input lon')
      // }
      //  else if (e.keyCode === 50) {
      //   alert('@ was pressed');
      // }      
      
   
  //     map.flyTo(new L.LatLng(lat, lng));
  //       map.fitBounds(new L.LatLng(lat, lng), {
  //   padding: [50, 50],
  // });
    }






</script>

<style scoped>
.dashboard{
  height: 60vh;
  width: 100vw;
}
.spinner{
position: absolute;
left: 38vw;
top: 19vh;
/* width: 200px;
height: 200px;
background-color: #fff; */
z-index: 600;

}
#map{
    /* box-sizing: border-box; */

position: absolute;
width: 25.1vw;
height: 47vh;
left: 23vw;
top: 5vh;
border: 1px solid #E7E6E8;
border-radius: 9px;
z-index: 400;

}
.draw{
  position: absolute;
  z-index: 600;
  right:0.7vw;
top: 24vh;
padding: 7px;
background-color: #fff;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  cursor: pointer;

}
.upload{
  position: absolute;
  z-index: 600;
  right:0.6vw;
top: 29vh;
padding: 5px;
background-color: #fff;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  cursor: pointer;
}
.download{
  position: absolute;
  z-index: 600;
  right:0.6vw;
top: 18vh;
padding: 5px;
background-color: #fff;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  cursor: pointer;

}
.zoom_controls{
  z-index: 500;
  position: absolute;
  top: 35vh;
  right:0.5vw;

  width: 36px;
  height: 70px;
  background: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  cursor: pointer;
  
 
}

.zoom_controls1{
  z-index: 500;
  position: absolute;
  top: 35vh;
  right:5vw;

  width: 136px;
  height: 70px;
  background: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  cursor: pointer;
  
 
}
.zoomin{
  /* background-color: #fff; */
  height: 20px;
  width: 20px;
  position: absolute;
  top: 7px;
  left: 7px;
  cursor: pointer;
  /* margin: 5px; */
  

 
}
.separate{
  border: 0.7px dashed #D9D9D9;
  position: absolute;
  top: 3.7vh;
  left: 2px;
  width: 30px;
}
.zoomout{
  /* background-color: #fff; */
  height: 20px;
  width: 20px;
  position: absolute;
  top: 4.5vh;
  left: 8px;
  cursor: pointer;
  /* margin: 5px; */
  

 
}
.info{
    position: relative;
    left: 25vw;
    top:-21vh;
    width: 186px;
height: 192px;
    z-index:200;
    /* background-color: rgb(255, 255, 255); */
}
.biodiversity{
    position: absolute;
    left:23vw;
    top: 66vh;
    z-index:500;
   
}
.climate{
    position: absolute;
    left: 50vw;
    top: 66vh;
    z-index:500;
}
.soil{
    position: absolute;
    left: 75.6vw;
    top: 66vh;
    z-index:500;
}

.success{
  z-index: 1000;
  position: absolute;
    top: 15vh;
    left: 25vw;
}
.radial{
  position: absolute;
    top: 12vh;
    left: 52vw;
    z-index: 1000;
}
.cap{
  position: absolute;
    top: 2.5vh;
    left: 38vw;
    z-index: 1000;

}
.climate_chart{
  position: absolute;
  top: 6vh;
    left: 3vw;
    z-index: 1000;
}
.soil_chart{
  position: absolute;
  top: 6vh;
    left: 3vw;
    z-index: 1000;
}
.water_chart{
  position: absolute;
    top: 6vh;
    left: 3vw;
    z-index: 1000;
}
.notification {
  position: absolute;
  top: 56vh;
  left: 49vw;
  z-index: 1000;
  width: 25vw;
  height: 8vh;
  color: red;
padding-bottom: 10px;
padding-top: 10px;
padding-left: 45px;
border-radius: 15px;
font-weight: 650;
  /* border: red 2px solid; */
  background-color: rgb(255, 234, 234);
}

</style>
