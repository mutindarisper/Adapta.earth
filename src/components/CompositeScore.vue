<template>
    <div class="composite">
        <span class="composite_score">
                Composite score
        </span>

        <div class="data">
       <!-- <h3 class="score">{{score * 100 ? score.toFixed(2) * 100+'%' : score+ '%' }}</h3> -->
       <!-- <p class="credit">Credit score</p> -->
       <!-- <Demochart
        :height="350"
        :width="400"
        :chartData="compositeChartdata"     
        
             /> -->
           
    
     </div>
     <!-- <div class="legend">
      <p class="key">Key metrics</p>

      <div class="classes">
        <div class="low">Low risk  
          <p style="position:absolute; left:7vw; top: 0.5vh">76 - 100%</p>
        </div>
      <div class="medium">Medium risk 
        <p style="position:absolute; left:7vw; top: 0.5vh">26- 75%</p> </div>
      <div class="high">High risk 
        <p style="position:absolute; left:7vw; top: 0.5vh">0- 25%</p>
      </div>

      </div>
     
     </div> -->

     
    </div>
    
</template>



 <script>
import { onMounted, ref, computed, watch } from 'vue-demi';
import { useCounterStore } from '../stores/counter';
import demochart from './Charts/demochart.vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import simpleChartVue from './Charts/simpleChart.vue';


export default {
    components:{
        Demochart: demochart
    },
    setup() {
const store = useCounterStore();

let score = ref(null)
let compositeChartdata = ref(null)


              // const canvas = Chart.ctx;
              // const gradient = Chart.createLinearGradient(0, 0, 0, 450);

              // gradient.addColorStop(0, 'red');
              // gradient.addColorStop(0.5, 'yellow');
              // gradient.addColorStop(1, 'green');

        
            

// var gradient = demochart.createLinearGradient(0, 0, 0, 450);
// gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
// gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
// gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');




const updateScore = computed(() => {
    score.value = store.gray_index
    
    compositeChartdata.value = {
      labels:[],

      datasets: [
        {
          // backgroundColor: [ //linear-gradient(#e66465, #9198e5)
          // gradient
          // // "#267300",
          // //   "#f5f5f5",
          //   //"#55ff0000",
          //   // "#ffebaf",
          //   // "#ff7f7f",
          // ],
          backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0,0,0,450);

              gradient.addColorStop(0, 'green');
              gradient.addColorStop(.5, 'yellow');
              gradient.addColorStop(1, 'red');

              return gradient;
            },
        
          borderColor: [],
          borderRadius: {
            outerEnd: [0, 20],
            outerStart: [20, 0],
            innerStart: [20,0],
            innerEnd: [0,20]
          },
          borderAlign: 'center',
          borderWidth: 0,
          spacing: 0,
          cutout: "100",
          rotation: 180,
          circumference: 290,
          radius: "95%",
          data: [score.value * 100, 100-score.value * 100]
        },
      ],
   }

    return score.value
})

watch(updateScore)

 score.value = store.getGrayIndex

 console.log(score.value, 'Updated score')

 return {
    score,
    compositeChartdata
 }
    }  

}

</script>


 <style scoped>
 .score{
    position: relative;
    left: 8vw;
    top: 22vh;
    font-size: 35px;
    font-weight: 700;

 }
 .credit{
    position: relative;
    left: 8.2vw;
    top: 22vh;
    font-size: 15px;
    font-weight: 400;

 }
 .composite{
    box-sizing: border-box;


width: 24vw;
height: 47vh;


position: absolute;
    left: 50vw;
    top: 5vh;
    z-index:500;

/* Primary Colours/Cards */

background: #FFFFFF;
/* Foundation /Blue/B200 */

border: 1px solid #E7E6E8;
border-radius: 9px;
 }
 .composite_score{
    position: absolute;
    left: 5.5vw;
    top: 3vh;
    box-shadow: 0px 29px 38px rgba(61, 177, 64, 0.22), 0px 14.6812px 16.5656px rgba(61, 177, 64, 0.1485), 0px 5.8px 6.175px rgba(61, 177, 64, 0.11), 0px 1.26875px 2.19688px rgba(61, 177, 64, 0.0715);
    width: 174px;
    height: 40px;
  padding:5px 0 0px 20px;
    background-color:  #27AE60;
    color: #FFFFFF;
    font-weight: 600;
border-radius: 21px;
 }

 .data{
    position: absolute;
    top: 1vh;
   align-items: center;
   justify-content: center;
 }
 .legend{
  position: absolute;
  left: 15vw;
  top: 10vh;
 }
 .classes{
  display: flex;
  flex-direction: column;
  gap: 1rem;
 }
 .low{
  width: 240px;
  height: 40px;
  background-color: rgb(26, 139, 86);
  padding: 5px 0px 0px 5px;
  border-radius: 10px;
 }
 
 .medium{
  width: 240px;
  height: 40px;
  background-color: rgb(248, 149, 19);
  padding: 5px 0px 0px 5px;
  border-radius: 10px;
 }
 .high{
  width: 240px;
  height: 40px;
  background-color: #EB5757;
  padding: 5px 0px 0px 5px;
  border-radius: 10px;
 }
.key{
  font-weight: 700;
}



</style>