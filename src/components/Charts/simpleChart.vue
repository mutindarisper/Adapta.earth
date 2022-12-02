<template>
   <div>
     <apexchart
     type="radialBar" 
     height="300" 
     :options="chartOptions" :series="series"
     ></apexchart>
   </div>
 </template>
  
  <script >
  import { defineComponent, ref, computed, watch, toRef, onMounted } from 'vue';
 import VueApexCharts from "vue3-apexcharts"
 import ApexCharts from 'apexcharts';
//  app.config.globalProperties.$apexcharts = ApexCharts;
  
  import { useCounterStore } from '../../stores/counter';


  
  var baseurl = 'http://45.63.48.25:8080'
  
  //   Chart.register(...registerables);
  
  export default defineComponent({
    name: 'Home',
    components: {
          apexchart: VueApexCharts,
        },
    props: {
  
      label: {
         type: String
      },
      // chartData:{
      //    type: Array
      // },
      // options:{
      //    type: Object
      // },
      score:{
         type:String
      },
      county:{
         type: String
      }
  
  },
 
  data: function() {
    return {
      // chartOptions: {
      //   chart: {
      //     id: "vuechart-example",
      //   },
      // //   xaxis: {
      // //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      // //   },
      // },
      labels: ['Apples', 'Oranges', 'Berries', 'Grapes'],

      
      series: [75],
          chartOptions: {
            chart: {
              height: 350,
              type: 'radialBar',
              toolbar: {
                show: true
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0
                  }
                },
                track: {
                  background: '#00000000',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 1
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function(val) {
                      // console.log(val, 'vaaaaaaaaaaaaaaaaaalllllllllll')
                      // if(val == -9999) return 'NA'
                      // else
                      return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '30px',
                    show: true,
                  }
                }
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                colorStops: [
        {
          offset:0,
          color: "#d71916",
          opacity: 1
        },
        {
          offset: 25,
          color: "#fdae61",
          opacity: 1
        },
        {
          offset: 50,
          color: "#ffffbf",
          opacity: 1
        },
        {
          offset: 75,
          color: "#abdda4",
          opacity: 1
        },
        {
          offset: 100,
          color: "#74de01",
          opacity: 1
        }
        
      ],
               //  gradientToColors: ['red' ],
                inverseColors: true,
                opacityFrom: 0,
                opacityTo: 1,
                stops: [0, 25, 50, 75, 100]
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Composite score'],
          },
    };
  },
  setup() {
const store = useCounterStore();

let score = ref(null)
let series = ref(null)

const updateScore = computed(() => {
    score.value = store.gray_index
    console.log(score.value, 'apex score')

//do not display -9999 values on the chart
    if(score.value == -9999) {
      var string = 'Cannot compute score'
      series.value =[0]
    } else{
      series.value = [score.value * 100]

    }
    console.log( series.value, ' series.value')
    
   //  compositeChartdata.value = {
   //    labels:[],

   //    datasets: [
   //      {
   //        // backgroundColor: [ //linear-gradient(#e66465, #9198e5)
   //        // gradient
   //        // // "#267300",
   //        // //   "#f5f5f5",
   //        //   //"#55ff0000",
   //        //   // "#ffebaf",
   //        //   // "#ff7f7f",
   //        // ],
   //        backgroundColor: (ctx) => {
   //            const canvas = ctx.chart.ctx;
   //            const gradient = canvas.createLinearGradient(0,0,0,450);

   //            gradient.addColorStop(0, 'green');
   //            gradient.addColorStop(.5, 'yellow');
   //            gradient.addColorStop(1, 'red');

   //            return gradient;
   //          },
        
   //        borderColor: [],
   //        borderRadius: {
   //          outerEnd: [0, 20],
   //          outerStart: [20, 0],
   //          innerStart: [20,0],
   //          innerEnd: [0,20]
   //        },
   //        borderAlign: 'center',
   //        borderWidth: 0,
   //        spacing: 0,
   //        cutout: "100",
   //        rotation: 180,
   //        circumference: 290,
   //        radius: "95%",
   //        data: [score.value * 100, 100-score.value * 100]
   //      },
   //    ],
   // }

    return score.value
})

watch(updateScore)

 score.value = store.getGrayIndex

 console.log(score.value, 'Updated score')

 return {
    score,
    series
 }
    } 
  })
  
  
  
  
  
  
  
  </script>