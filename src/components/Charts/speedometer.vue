
   <template>
    <div>
        <vue-speedometer 
      
      :width="280"
      :needleHeightRatio="0.7"
      :value="score"
      :customSegmentStops='[0, 250, 750, 1000]'
      :segmentColors='["red", "orange", "#00ff00"]'
      currentValueText=""
      :customSegmentLabels='[
        {
          text: "High risk",
          position: "OUTSIDE",
          color: "black",
        },
        {
          text: "Medium risk",
          position: "OUTSIDE",
          color: "black",
        },
        {
          text: "Low risk",
          position: "OUTSIDE",
          color: "black",
        },
      ]'
      :ringWidth="47"
      :needleTransitionDuration="3333"
      needleTransition="easeElastic"
      needleColor="#a7ff83"
      textColor="black"
    />
     
    </div>
    
   </template>
   <script >
   import { defineComponent, ref, computed, watch} from 'vue';
   import VueSpeedometer from "vue-speedometer"
 //  app.config.globalProperties.$apexcharts = ApexCharts;
   
   import { useCounterStore } from '../../stores/counter';
 
   
   
   //   Chart.register(...registerables);
   
   export default defineComponent({
     name: 'Home',
     components: {
        VueSpeedometer,
         },

         

   setup() {
 const store = useCounterStore(); 
  

 let score = ref(null)
 
 const updateScore = computed(() => {
     score.value = store.gray_index
     console.log(score.value, 'needle score')
 
 //do not display -9999 values on the chart
    //  if(score.value == -9999) {
    //    var string = 'Cannot compute score'
    //    series.value =[0]
    //  } else{
    //    series.value = [score.value * 100]
 
    //  }
    //  console.log( series.value, ' series.value')
     
   
 
     return score.value
 })
 
 watch(updateScore)
 
  score.value = store.getGrayIndex
 
  console.log(score.value, 'Updated needle score')
 
  return {
     score,
     
  }
     } 
   })
   
   
   
   
   
   
   
   </script>