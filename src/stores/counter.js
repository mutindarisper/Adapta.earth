import { defineStore } from 'pinia'

import data from '../lib/data.json'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    latlon:null,
    crops: [],
    locations: [],

    selectedData: null, // TODO

    selected_coordinates: null,

    selected_crop: null,
    selected_location: null,

    // TODO: remove this once there are no dependencies
    searched_location: null,

    // Map
    zoom: 2,
    iconWidth: 25,
    iconHeight: 40,
    score: [],


    coords:[],
    gray_index:null,
    band_2: null,
    band_3: null,
    band_4: null,
    click1:'',
    click2:'',
    click3:'',
    click4:'',
    band2_risk:'',
    //custom colors
    very_high:'#D7191C',
    high:"#FDAE61",
    moderate: "#FFFFBF",
    low:"#ABDDA4",
    very_low: "#138413"
    
  }),

  actions: {
    populateCrops() {
      if (!this.crops || this.crops.length === 0) {
        const crops = []
        data.forEach(item => {
          if (!crops.includes(item.crop)) {
            crops.push(item.crop)
          }
        })
        this.crops = crops
      }
    },
    populateLocations() {
      if (!this.locations || this.locations.length === 0) {
        const locations = []
        data.forEach(item => {
          if (!locations.includes(item.locations)) {
            locations.push(item.locations)
          }
        })
        this.locations = locations
      }
    },
    filterLocationsByCrop(crop) {
      const locations = []
      data.forEach(item => {
        if (item.crop === crop && !locations.includes(item.locations)) {
          locations.push(item.locations)
        }
      })
      this.locations = locations
    },
    filterCropsByLocation(location) {
      console.log('filterCropsByLocation', location)

      const crops = []
      data.forEach(item => {
        if (item.locations === location && !crops.includes(item.crop)) {
          crops.push(item.crop)
        }
      })
      this.crops = crops
    },


    
    selectData() {
      if (this.selected_crop && this.selected_location ) {
        this.selectedData = data.find(
          item =>
            item.crop === this.selected_crop &&
            item.locations === this.selected_location,
          

            // console.log(item.crop, 'item crop')
        )
       
        // console.log(this.selectedData['Composite Score'])
        // console.log(this.chatData_restructure.datasets[0].data,'previous chart data')

        
        var selected_coordinates = [this.selectedData.x, this.selectedData.y]
        // console.log(selected_coordinates , 'selected_coordinates2')

        this.selected_coordinates = [selected_coordinates[0], selected_coordinates[1]]
        // console.log(this.selected_coordinates, 'coordinates array')


        this.score= [this.selectedData['Composite Score'], this.selectedData['Climate Score'], this.selectedData['Temperature Score'], this.selectedData['Soil Score'] ]
        console.log(this.score,'updated chart data')

        // console.log(this.chatData_restructure.datasets, 'dtatsets')

      }

     
    },
    saveSelectedCrop($event) {
      console.log($event.target.value, 'seleted crop')
      this.selected_crop = $event.target.value

      this.filterLocationsByCrop(this.selected_crop)
      this.selectData()
    },
    saveSelectedLocation($event) {
      this.selected_location = $event.target.value

      this.filterCropsByLocation(this.selected_location)
      this.selectData()
    },



    filterCoordinatesByLocation(x, y) {
      console.log('filterCoordinatesByLocation', coords)

      // const y  = null
      // const x = null
      const coords = []
      data.forEach(item => {
        if (item.x === x && item.y=== y && !y.includes(item.y) && !x.includes(item.x)) {
          coords.push(item.y, item.x)
          console.log(coords, 'cooooooooooooords')
        }
      })
      this.coords = coords
      console.log(this.coords, 'cooooooooooooords')
    },


    saveSelectedCoordinates($event){
      this.selected_location = $event.target.value
      this.filterCropsByLocation(this.selected_location)
      this.filterCoordinatesByLocation(this.selected_location)
      this.selectData()

    },
    updateZoom(zoom) {
      console.log('updateZoom', zoom)
      this.zoom = zoom
    },

    
    
    
  },

  getters: {
    getSelectedCrop: state => state.selected_crop,
    getChartData:state => state.score,
    getChartOptions: state => state.options,
    getSelectedCoords: state => state.selected_coordinates,
    getGrayIndex: state => state.gray_index,
    getBand2: state => state.band_2,
    getBand3: state => state.band_3,
    getBand4: state => state.band_4,
    getLatLon: state => state.latlon,
    getBand2Risk: state => state.band2_risk
   
  },
})