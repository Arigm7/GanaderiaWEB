<template >
  <div class="backgruond">
  <v-main class="d-flex justify-center al">
    <v-col cols="10" lg="4" class="mx-auto">
      <v-card class="pa-4">
        <div class="text-center">
          <v-avatar size="100" color="indigo-lighten-4">
            <v-icon size="40" color="indigo">mdi-account-cowboy-hat</v-icon>
          </v-avatar>
          <h2 class="indigo--text">Inicio de Sesión</h2>
          <h4 class="indigo--text">Administración de Ganaderia </h4>
        </div>
        <v-form ref="formSesion" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field
              label="Usuario"
              v-model="usuario.usuario"
              :rules="required"
              placeholder="Usuario"
              prepend-inner-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              :type="passwordShow ? 'text' : 'password'"
              label="Contraseña"
              v-model="usuario.password"
              :rules="required"
              placeholder="Contraseña"
              prepend-inner-icon="mdi-key"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="passwordShow = !passwordShow"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="onClickInicioSesion" color="indigo">
              <span class="white-text px-8"> Iniciar Sesión</span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-main>
</div>
</template>
  
<script>
//import axios from "axios";
//import router from '@/router';
import { get, post } from "../api/Requests.js";

export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      passwordShow: false,
      valid: false,
      loader: false,
      required: [(v) => !!v || "Este campo es requerido"],
      usuario: {
        usuario: null,
        password: null,
      },
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    async login() {
      //this.loader = true;
      const response = await post("/sesion/login/", this.usuario);
      //this.loader = false;
      if (response.error === true) {
        //console.log(response);
        this.$notify({
            group: 'foo',
            title: 'Error',
            text: response.mensaje,
            duration:6000
          });
        return;
      } else {
       // console.log(response);
        this.$session.start();
        this.$session.set("usuario", JSON.parse(response.respuesta));
        this.$router.push({
          name: "principal",
          params: {
            user: response.respuesta,
          },
        });
      }
    },
    onClickInicioSesion() {
      if (this.$refs.formSesion.validate()) {
        this.login();
      }
    },
    /*login(){
        const postData = new URLSearchParams();
        postData.append('usuario', this.usuario.usuario);
        postData.append('password', this.usuario.password);
        axios.post("http://localhost:8084/GanaderiaWS/ws/sesion/login/",postData)
          .then(response=>{
            console.log(response.data.respuesta)
            router.push({
              name: 'principal',
              params: {
                user: response.data.respuesta}
              })
            }
          )
        .catch(rr => console.log(rr));
      }*/
  },
};
</script>
  
<style>
.backgruond {
  background-image: url('../assets/img6.jpg') !important;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top:0;
    background-size: cover;
    background-color: #e2e1e1;
  }

.contenedor{
  position: absolute  !important;
  
  top:80% !important;
  left:38% !important;
}

</style>