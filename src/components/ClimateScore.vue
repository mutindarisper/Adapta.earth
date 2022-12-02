<template>
    <div class="composite">
        <span class="composite_score">
                Soil score
        </span>

        <div class="data">
        <!-- <h3 class="score">{{score * 100 ? score.toFixed(2) * 100+'%' : score+ '%'}}</h3> -->
        <!-- <Demochart
        :height="250"
        :width="300"
            :chartData="climateChartdata"
            
          
             /> -->
      </div>

      <!-- <div class="legend">
              <Legend />
              <div class="dots">
                <div class="high" id="red"> </div>
                <div class="medium" id="orange"> </div>
                <div class="low" id="green"> </div>

              </div>
              
             
             

              <div class="risks">
                <label for="" class="high_risk" id="risks">High risk</label>
                <label for="" class="medium_risk" id="risks">Medium risk</label>
              <label for="" class="medium_risk" id="risks">Low risk</label>

              </div>

              <div class="figures">
                <label for="" id="figures">0 - 25%</label>
                 <label for="" id="figures">26 - 75%</label>
              <label for="" id="figures">76 - 100%</label>

              </div>
              
              
              
             </div> -->

      


    </div>
    
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue-demi';
import { useCounterStore } from '../stores/counter';
import demochart from './Charts/demochart.vue';


export default {
    components:{
        Demochart: demochart
    },
    setup() {
const store = useCounterStore()
let score = ref(null)
let climateChartdata = ref(null)

const updateScore = computed(() => {
    score.value = store.band_3
    climateChartdata.value = {
      labels:[],

      datasets: [
        {
          backgroundColor: [
            "#eb5757",
            "#f5f5f5",
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
          data: [score.value * 100, 100-score.value * 100]
        },
      ],
   }
    return score.value
})

watch(updateScore)
score.value = store.getBand3

 console.log(score.value, 'Updated score')

return {
    score,
    climateChartdata
 }


    },
    
    
}

</script>


 <style scoped>
 .chart{
  position: relative;
  top: -5.5vh;
  left:2vw;
  width: 10vw;
  height: 15vh;
  /* background-color: rgb(221, 112, 112); */

 }
 .composite{
    box-sizing: border-box;
    width: 22vw;
height: 21.1vh;
background: #FFFFFF;
border: 1px solid #E7E6E8;
border-radius: 9px;
 }
 .score{
    position: relative;
    left: 6.2vw;
    top: 16vh;
    font-size: 30px;
    font-weight: 700;

 }
 .composite_score{
    position: relative;
    left: 5vw;
    top: 3vh;
    width: 34px;
  padding:2px 10px 2px 10px;
  font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 145.02%;
  border: 1px solid #F2C94C;
border-radius: 21px;
 }
 .data{
    position: absolute;
    top: -2vh;
    left: -2vw;
   align-items: center;
   justify-content: center;
 }

 .legend{
  height: 7vh;
    width: 12vw;
  /* background-color: rgb(248, 233, 233); */
    position: absolute;
    top: 23vh;
   left: 4vw;
   z-index: 900;
  
 }

 .dots{
  display: flex;
   gap: 3.5rem;

 }
 #figures{
    z-index: 900;
    font-size: 9px;
    font-weight: 600;
    margin-left: 0;
    
}
.figures{
  display: flex;
   gap: 2rem;
   position: relative;
   top: -3.1vh;
   left: 1vw;
}
.risks{
  display: flex;
  gap: 1rem;
  font-size: 11px;
    font-weight: 600;
    position: relative;
    top: -0vw;
    
}
.high, .medium, .low{
  height: 10px;
  width: 10px;
  
  border-radius: 100%;
 
}
#red{
  background-color: rgb(253, 4, 4);

}
#orange{
  background-color: rgb(253, 148, 10);

}
#green{
  background-color: rgb(19, 146, 87);

}




</style>