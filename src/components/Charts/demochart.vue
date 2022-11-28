<template>
  <DoughnutChart 
  :chartData="chartData"
  />
</template>

<script >
import { defineComponent, ref, computed, watch, toRef, onMounted } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

import { useCounterStore } from '@/stores/counter';



var baseurl = 'http://45.63.48.25:8080'

  Chart.register(...registerables);

export default {
  name: 'Home',
  components: { DoughnutChart },
  props: { 
    chartData: {
      type: Object,
      default:  {
      labels:[],

      datasets: [
        {
          backgroundColor: [
            "#267300",
            "#808080",
            //"#55ff0000",
            // "#ffebaf",
            // "#ff7f7f",
          ],
          borderColor: [],
          borderRadius: {
            outerEnd: [0, 20],
            outerStart: [20, 0],
            innerStart: [20, 0],
            innerEnd: [0, 20]
          },
          borderAlign: 'center',
          borderWidth: 0,
          spacing: 0,
          cutout: "75",
          rotation: 180,
          circumference: 290,
          radius: "75%",
          data: [56, 30]
        },
      ],
   },
   required:true
    },

    label: {
       type: String
    },
    // chartData:{
    //    type: Array
    // },
    // options:{
    //    type: Object
    // },
    
    county:{
       type: String
    },
    options: {
      type: Object,
      default: {
          // legend: {
          //     display: true,
          //     position: 'right',
          //     margin: 20,
          //     labels:{
          //        fontColor: '#000',
          //        fontWeight: 'bolder',
          //        padding: 15,
          //        usePointStyle: true,
          //        pointStyle: 'circle'
          //     }
          //  },
           
           responsive: false,
           maintainAspectRatio: false,
      },
      required: true
    }

},

//   setup() {
    



   
    

// }
}







</script>