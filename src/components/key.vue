<template>
    <div class="key">
        <img class="red" src="../assets/ellipse_red.png" alt="">
    <img class="orange" src="../assets/ellipse_orange.png" alt="">
    <img class="green" src="../assets/ellipse_green.png" alt="">
    <p class="red1">High risk <br>
    </p>
    <p class="orange1">Medium risk <br>
    </p>
    <p class="green1">Low risk <br>
    </p>
    </div>
    
    
</template>

<script setup>
</script>

<style scoped>
/* .key{
    width: 5vw;
    height: 5vh;
} */
.red{
    position: absolute;
    left: -1.5vw;
    top: 8vh;
}
.red1{
    position: absolute;
    left: -1.3vw;
    top: 11vh;
    color: #fff;
}
.orange{
    position: absolute;
    left: -0.5vw;
    top: 1vh;
    height: 100px;
}
.orange1{
    position: absolute;
    left: 1.2vw;
    top: 4vh;
  
    color: #fff;
}
.green{
    position: absolute;
    left: 4.3vw;
    top: 8vh;
}
.green1{
    position: absolute;
    left: 5.5vw;
    top: 11vh;
    color: #fff;
}


  
</style>