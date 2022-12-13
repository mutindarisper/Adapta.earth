<template>
    <div class="analyze">

      <label class="search_crop" for="">Select crop</label>
      <select class="enter_crop" @click="storeUserSelections.populateCrops" @input="storeUserSelections.saveSelectedCrop">
        <option v-for="crop in storeUserSelections.crops" :key="crop">{{ crop}}</option>
      </select>

      <label class="select_location" for="">Select location</label>
       <div class="enter_location" name="" id="search" @keyup="$emit('zoomTo2')" > </div>
      <!-- <select class="enter_location"  @click="storeUserSelections.populateLocations"
       @input="storeUserSelections.saveSelectedLocation"
       >
        <option v-for="location in storeUserSelections.locations" :key="location">{{ location}}</option>
      </select>    @click="success ? $emit('handleSuccess') : $emit('handleError') " -->

        <div class="score">Biodiversity Check
            <img src="../assets/verify.svg" alt="" class="success" id="success"
            v-if="(storeUserSelections.band_3  && storeUserSelections.band_4 >= 0) || (storeUserSelections.gray_index  && storeUserSelections.band_2 == 0 ) ">
            <p id="succ_msg">The selected area passes the biodiversity check.    </p>
            <img src="../assets/error.svg" alt="" class="success" id="error"
            
             v-if="storeUserSelections.gray_index && storeUserSelections.band_2 && storeUserSelections.band_3 && storeUserSelections.band_4 == -9999">

             <p id="msg">The selected area does not pass the biodiversity check.</p>

        </div>
       

        <button class="biodiversity">Compute score</button>
        <!-- <label class="search_coords">Search Coordinates</label>
        <div class="coordinates" id="coords"  @keyup="$emit('zoomTo2')">
         
      <label class="lats" for="">Lat:</label>
       <input type="text" name="lat" id="lat"/>
 
   <label class="lats" for=""> Lon:</label>
     <input type="text" name="lng" id="lng"/>
    <button class="search_button" type="button" @click="$emit('zoomTo')" value="Search">Search</button>
    </div> -->

   



    </div>
</template>


<script setup>
import { useCounterStore } from '../stores/counter';
const storeUserSelections = useCounterStore();
</script>

<style scoped>
.search_button{
    position: absolute;
    width: 58px;
    height: 20px;
    left: 0vw;
  top: 3vh;
  padding-bottom: 10px;
  background: #27AE60;
border-radius: 8px;
outline: none;
border: none;
color: #FFFFFF;
cursor: pointer;

}
#search{
    border: #C3C8CF 1px solid !important;
    z-index: 500;
    max-width: 200px;
    width: 173px;
    height: 35px;
    border-radius: 6px;
    /* border-left: #2D4B6A 1px solid !important; */
    position: absolute;
    left:3vw;
    top:2vw;
}
.analyze{
    height: 35vh;
    width: 16vw;
    position: absolute;
    left: 4vw;
    top:5vh;
    background: #ffffff;
    border: 1px solid #E7E6E8;
    border-radius: 9px;
}
.select_location{
    position: absolute;
    width: 85px;
    height: 17px;
    left: 3vw;
  top: 2vh;
    font-family: 'Roobert';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 145.02%;
    color: #2D4B6A;
}
.enter_location{
    position: absolute;
    width: 161px;
    height: 30px;
    left: 4vw;
    /* changes recently added */
    top: 4vh !important;
    background: #FFFFFF;
    border: 1px solid #C3C8CF;
    border-radius: 8px;
    cursor: pointer;
    /* changes recently added */
    padding-right: 5px; 
    padding-left: -14px;
}
.search_crop{
    position: absolute;
    width: 85px;
    height: 17px;
    left: 3vw;
  top: 10vh;
    font-family: 'SansSerif';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 145.02%;
    color: #2D4B6A;
}

.search_coords{
    position: absolute;
    
    left: 3vw;
  top: 9vh;
    font-family: 'SansSerif';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 145.02%;
    color: #2D4B6A;
}
.lats{
    font-family: 'SansSerif';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 145.02%;
    color: #2D4B6A;

}
.enter_crop{
    box-sizing: border-box;
/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
/* padding: 7px 76px 7px 12px; */
gap: 8px;
position: absolute;
width: 173px;
height: 30px;
left: 3vw;
top: 12vh;
background: #ffffff;
border: 1px solid #C3C8CF;
border-radius: 8px;
cursor: pointer;
}
.biodiversity{
    position: absolute;
width: 173px;
height: 30px;
left: 3vw;
top: 18vh;
background: #27AE60;
border-radius: 8px;
outline: none;
border: none;
color: #FFFFFF;
cursor: pointer;
}
.score{
    cursor: pointer;
    position: absolute;
width: 161px;
height: 30px;
left: 3vw;
top: 24vh;
/* background: #F2F2F2; */
border-radius: 8px;
outline: none;
border: none;
font-size: 16px;
font-weight: 700;
}
.success{
    position: relative;
    top: -2.5vh;
    left: 7.5vw;
}
#msg, #succ_msg{
    display: none;
}
#success:hover + #succ_msg{
    display: block;
    color: #27AE60;
    position: relative;
    left: -0.2vw;
    top: -2.5vh;
    font-size: 14px;
    font-weight: 500;
    z-index: 900;

}
#error:hover + #msg{
    display: block;
    color: red;
    position: relative;
    left: -0.2vw;
    top: -2.5vh;
    font-size: 14px;
    font-weight: 500;
    z-index: 900;

}
#findbox{
    position: absolute;
width: 161px;
height: 30px;
left: 2vw;
top: 26vh;
/* background-color: #27AE60; */
}
.coordinates {
 position: absolute;
  left: 3vw;
  top:11.5vh !important;
  font-size: 14px;
  font-weight: 500;
  z-index: 200;
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
}
input{
    width: 3vw;
    border: 1px solid #C3C8CF;
    border-radius: 5px;
    outline: none;
    background-color: 'red';

}
</style>
