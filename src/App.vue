<template>
  <v-app>
    <router-view />
    <!--<router-view class="backgruond"/>-->
    <notifications group="foo" />
  </v-app>
</template>

<style>
.backgruond {
  background-image: url('./assets/img6.jpg') !important;
    width: 300%;
    height: 100%;
    display: block;
    position: absolute;
    top:0;
    background-size: cover;
    background-color: #e2e1e1;
  }
</style>
