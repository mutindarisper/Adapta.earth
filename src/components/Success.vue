<template>
    <div class="success">
        <p class="text">The selected area has met the biodiversity score</p>
        <div class="buttons">
            <button class="cancel" @click="$emit('continue')"> Cancel</button>
            <button class="continue" @click="$emit('continue')"> Continue</button>
        </div>
        
    </div>
    
    
</template>

<script setup>

</script>

<style scoped>
.success{
    
    box-sizing: border-box;

position: absolute;
width: 364px;
height: 130px;
left: 1175px;
top: 356px;
background: #FFFFFF;
border: 1px solid #E7E6E8;
box-shadow: 0px 38px 48px rgba(0, 0, 0, 0.07), 0px 7.6px 7.8px rgba(0, 0, 0, 0.035);
border-radius: 9px;

}
.text{
    position: absolute;
   top: 1.2vh;
   left: 0.7vw;
   /* padding-left: px; */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 145.02%;
}
.buttons{
    display: flex;
    gap: 2rem;
    position: absolute;
    left: 7vw;
    top: 8vh;
    
}
.cancel{
    background: #F3FAF3;
border-radius: 20px;
border: none;
width: 73px;
height: 30px;

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 145%;


color: #27AE60;
cursor: pointer;
}
.continue{
    background: #F3FAF3;
border-radius: 20px;
border: none;
width: 73px;
height: 30px;

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 145%;


color: #fff;
background: #27AE60;
cursor: pointer;
}
</style>