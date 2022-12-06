<template>
    <div class="info_">
        <p class="selected_area">{{' risk:'+ storeUserSelections.band2_risk}}</p>
        <div class="separator">

        </div>
        <span class="area">Area: {{}} </span>
        <span class="tillable">Tillable: {{}}  </span>
        <span class="slope">Slope: {{}} </span>
        <span class="flood">Flood plain: {{}} </span>

    </div>
    
</template>

<script setup>
import { useCounterStore } from '../stores/counter';

const storeUserSelections = useCounterStore();

</script>

<style scoped>
.info_{
    box-sizing: border-box;
width: 186px;
height: 192px;
background: #fff;
border: 1px solid #E7E6E8;
border-radius: 9px;

}
.selected_area{
    position: absolute;
width: 89px;
height: 17px;
left: 2vw;
top: 0.5vh;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 145.02%;
/* or 17px */


color: #3D4255;
}

.separator{
    position: absolute;
margin:0px 8px 0px 8px;
top: 3vh; 
width: 160px ;
border: 1px dashed #BDBDBD;
}
.area{
    position: absolute;
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 145.02%;
top: 4vh;
color: #AFB4B8;
}
.tillable{
    position: absolute;
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 145.02%;
top: 8vh;
color: #AFB4B8;
}
.slope{
    position: absolute;
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 145.02%;
top: 12vh;
color: #AFB4B8;

}
.flood{
    position: absolute;
    font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 145.02%;
top: 16vh;
color: #AFB4B8;

}
</style>