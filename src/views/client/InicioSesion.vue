<template>
<div name="root">



  
<div class="container">
    <v-card class="card">
      <div> 
          <v-card-title style="text-align: center; display: block !important;">Inicio de sesión</v-card-title>
      </div>

      <div class="inputContainer">

        <v-item class="inputItem">
          <v-text-field  label="Usuario" v-model="usuario.user" required></v-text-field>
        </v-item>

        <v-item class="inputItem">
          <v-text-field type="password" label="Contraseña" v-model="usuario.password" required></v-text-field>
        </v-item>

        <div>
        <v-btn @click="login">Iniciar sesión</v-btn>
        <!--<v-card-text>No tienes una cuenta?  Registrate <a href="">aqui</a></v-card-text>-->
        </div>
      </div>

    </v-card>
  </div>




</div>
  </template>
  
  <script>
import axios from "axios";


  export default {
      name: "Página2",
      components:{
 
      },
      props:{},
      data(){
          return{      
             usuario:{
                user:null,
                password:null,
              },             
          };
      },
      created(){
          
      },
      mounted(){
          
      },
      computed:{},
      watch:{},
      methods:{
          login(){
            const postData = new URLSearchParams();
            postData.append('usuario', this.usuario);
            postData.append('password', this.password);
            axios.post("http://localhost:8084/GanaderiaWS/ws/sesion/login/",postData)
            .then(response=>{
              console.log(response.data.mensaje)
              console.log("hola")
            }
             )
            .catch(rr => console.log(rr));
          }
      },
  };
  </script>
  
  <style>
  .card{
    width: 42vw;
    height: 60vh;
    margin-top: 8vh;
    background-color: white;
    box-shadow: 3px 5px 13px 6px rgba(0,0,0,.2) !important;
  }


  .inputItem{
    margin: 2vw;
  } 

  .container{
    display: flex;
    justify-content: center;
  }
  </style>