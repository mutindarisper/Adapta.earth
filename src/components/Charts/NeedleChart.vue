<template>
    <div>
        <div id="canvas-holder" style="width:17%">
  <canvas id="chart"></canvas>
  </div>
    </div>
  </template>
   
   <script setup >
   import {  ref, computed, watch, toRef, onMounted } from 'vue';
  import "chartjs-gauge/dist/chartjs-gauge"
  import  "chart.js";
  import "chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels"
  
 //  app.config.globalProperties.$apexcharts = ApexCharts;
   
//    import { useCounterStore } from '../../stores/counter';
//    const store = useCounterStore();
//    let score = ref(null)
// score.value = store.gray_index
// console.log(score.value, 'needle chart score')
 

   var baseurl = 'http://45.63.48.25:8080'

    //  Chart.register(ChartDataLabels);
   
  
   
   
  
 
    var config = {
  type: 'gauge',
  data: {
    labels: ['Success', 'Warning', 'Fail'],
    datasets: [{
        data: [1, 2, 3],
        value: 0,
      backgroundColor: ['green', 'orange', 'red'],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Key'
    },
    layout: {
      padding: {
        bottom: 30
      }
    },
    needle: {
      // Needle circle radius as the percentage of the chart area width 
      radiusPercentage: 2,
      // Needle width as the percentage of the chart area width
      widthPercentage: 3.2,
      // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
      lengthPercentage: 80,
      // The color of the needle
      color: 'rgba(0, 0, 0, 1)'
    },
    valueLabel: {
      display: false
    },
    plugins: {
      datalabels: {
        display: true,
        formatter:  function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
        //color: function (context) {
        //  return context.dataset.backgroundColor;
        //},
        color: 'rgba(0, 0, 0, 1.0)',
        //color: 'rgba(255, 255, 255, 1.0)',
        backgroundColor: null,
        font: {
          size: 20,
          weight: 'bold'
        }
      }
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById('chart').getContext('2d');
  var chart = new Chart(ctx, config);

};

// document.getElementById('randomizeData').addEventListener('click', function() {
//   config.data.datasets.forEach(function(dataset) {
//     dataset.data = randomData();
//     dataset.value = randomValue(dataset.data);
//   });

//   window.myGauge.update(); 

// });
     
 
//  const store = useCounterStore();
 
//  let score = ref(null)
//  let series = ref(null)
 
//  const updateScore = computed(() => {
//      score.value = store.gray_index
//      console.log(score.value, 'apex score')
 
//  //do not display -9999 values on the chart
//      if(score.value == -9999) {
//        var string = 'Cannot compute score'
//        series.value =[0]
//      } else{
//        series.value = [score.value * 100]
 
//      }
//      console.log( series.value, ' series.value')
     
   
 
//      return score.value
//  })
 
//  watch(updateScore)
 
//   score.value = store.getGrayIndex
 
//   console.log(score.value, 'Updated score')
 
 
   </script>