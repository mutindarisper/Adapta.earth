<template>
    <div class="legend">
       <p class="high_text">high</p>
        <div class="high">
        

    </div>
    <div class="medium">

    </div>
    <div class="low">

    </div>
    

    </div>
    
</template>

<script setup>

</script>

<style scoped>
.legend{
    /* background-color: rgb(156, 43, 43) !important; */
    z-index: 900;
    height: 5vh;
    width: 5vw;
}
.high{
    border-radius: 50%;
    background-color: red;
    height: 20px;
    width: 20px;
}
.high_text{
    z-index: 900;
    font-size: 14px;
    font-weight: 600;
}


</style>