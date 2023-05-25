<template>
  <v-app>
  
    <v-app-bar>
      <router-link to="/">InicioSesion</router-link> |
      <router-link to="/adminGanado">Administración de Hato</router-link> |
      <router-link to="/adminCria">Administración de Cria</router-link>  |
      <router-link to="/adminLote">Administración de Lote</router-link>  |
      <router-link to="/adminVeterinario">Administración de Visitas</router-link>  
    </v-app-bar>
    <router-view/>

</v-app>
</template>


<style>
#app {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color:#0F3D59;
    position: fixed;
    top: 0;
    width: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #f2f2f2;
}

nav a.router-link-exact-active {
  color: #8bd194;
}
</style>
