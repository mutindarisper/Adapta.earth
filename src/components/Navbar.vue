
<template>
   <div class="wrapper3">
  
  <nav class="nav_bar">
    <img src="../assets/adapta-2.png" alt="" class="adapta_logo">
            <div class="links"> 
                <a href="home.html">Home</a>
                <router-link to="/" class="dash">ADAPTA CS</router-link>
                <!-- <RouterLink to="" class="dash">Dashboard</RouterLink> -->
                <router-link to="/about">Subscription</router-link>
                <router-link to="/about" class="portfolio">Portfolio Management</router-link>
                <router-link to="/about">Sign in </router-link>
                <router-view></router-view>
                
            </div>
    
  </nav>
  
</div>
</template>


<script setup>
// import { router-link, RouterView } from 'vue-router'

</script>

<style scope>
.portfolio{
    color: #aaa;
}
.adapta_logo{
    position: absolute;
    width: 216px;
height: 91px;
left: 18px;
top: 0.8vh;
}
.nav_bar{
    /* background-color: rgb(235, 255, 252); */
    height: 10vh;
    width: 100vw;
    
}
.links{
    position: absolute;
    left: 55vw;
    top: 3vh;
    display: flex;
    gap: 5rem;
    
    cursor: pointer;
}
a { 
    text-decoration: none;
    /* font-family:Verdana, Geneva, Tahoma, sans-serif; */
    font-weight: 640;
    color: #2d4b6a; }
    .dash{
        color: #0cc05a;
        border-bottom: #9ad299 2px solid;
    }

</style>
