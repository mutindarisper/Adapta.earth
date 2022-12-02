<template>
    <div class="cap">
        <p class="cap_title">
            Climate adaptation plan  
        </p>

        <p class="cap_sub_title">
            Detailed Credit Report Analysis
        </p>

        <p class="cap_credit">
            Your Credit Score is <span class="score">{{store.gray_index * 100 ? store.gray_index.toFixed(2) * 100+'%' :  '0%'}}</span> 
       
        </p>
        <p class="intro">
            You have a fair credit score. The below factors
            are informative and they represent areas which
            affected your score.
        </p>
        <div class="numbers">
            <div class="one">1</div>
            <div class="one">2</div>
            <div class="one">3</div>

        </div>

        <div class="flex_text">

            <p>Temperatures in your region are shooting to
                40° - Use a shadenet to create conducive
                environment.</p>

                <p>The soil ph is acidic - Use a base to 
                neutralize the soil.</p>

                <p>The surface water is drying up quickly in your
                region - Look for a way to collect water/reserve.</p>
        </div>

        <div class="note">
            <p class="note_text">Note:</p>
            <p class="note_summary">By acting on the following recommendations your
composite credit score will improve.</p>
        </div>

    </div>
    
</template>



<script setup>
import { useCounterStore } from '../stores/counter';
const store = useCounterStore();
var score = store.gray_index
console.log(score, 'cap score')
</script>


<style scoped>
.cap{
  
    box-sizing: border-box;
width: 380px;
height: 445px;
background: #ffffff;
border: 1px solid #E7E6E8;
padding: 10px 80px 30px 20px !important;
border-radius: 10px;
}
.cap_title{
    position: absolute;
    top: 0.5vh;
    left: 1vw;
font-family: 'Inter';
font-style: normal;
font-weight: 800;
font-size: 17px;
line-height: 145.02%;


text-decoration-line: underline;
text-transform: uppercase;



color: #447087;
}
.cap_sub_title{
    position: absolute;
    top: 3.5vh;
    left: 1vw;
    font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 145.02%;
/* or 23px */


/* Primary Colours/Green */

color: #447087;
}
.cap_credit{
    position: absolute;
    top: 6vh;
    left: 1vw;
    font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 15px;
line-height: 145.02%;
/* or 20px */


/* Primary Colours/dark green */

color: #2D4B6A;
}
.score{
  color: #85C984;
  font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 145.02%;
}
.intro{
    position: absolute;
    top: 10vh;
    left: 1vw;
    
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 135.52%;
/* or 23px */


/* Primary Colours/dark green */

color: #2D4B6A;

}
.numbers{
    position: absolute;
    top: 19.5vh;
    left: 1vw;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  
}
.one{
    position: relative;
    width: 30px;
height: 30px;
background: #85C984;
border-radius: 50%;
color: #ffffff;
font-weight: 600;
}
.flex_text{
    position: absolute;
    top: 19.5vh;
    left: 3vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    line-height: 125.52%;
    padding-right: 20px;

}
.note{
    position: absolute;
    top: 39vh;
   
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */

}
.note_text{
    color: #85C984;
    font-family: 'Inter';
font-style: normal;
font-weight: 800;
font-size: 18px;
/* line-height: 175.52%; */
}
.note_summary{
    font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
/* line-height: 175.52%; */
}
</style>