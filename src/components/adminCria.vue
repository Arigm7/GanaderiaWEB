<template>
  <v-container>
    <v-card>
      <!--BUSQUEDA-->
      <v-card-text>
        <v-card-title class="colorletra">Administración de Cria</v-card-title>
      </v-card-text>
      <v-row>
        <v-card elevation="24" shaped width="100%" dense class="ml-15 mr-15">
          <v-card-text>
            <v-form ref="formBusqueda" v-model="valid">
              <v-row>
                <v-col cols="12" md="2" sm="6">
                  <v-text-field label="Búsqueda" required v-model="buscarCria"/>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
           <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn rounded color="#558B2F" dark small @click="onClickLimpiar">
                <v-icon dark left>mdi-monitor-shimmer</v-icon>Limpiar</v-btn>
            </v-card-actions>       
        </v-card>
      </v-row>

      <!--NUEVO-->
      <v-row align="start" justify="start">
        <v-col cols="2">
          <v-btn rounded color="#1C4C96" dark small @click="onclickNuevoCria" class="ml-15 mr-15">
            <v-icon dark left>mdi-plus</v-icon>Nueva Cria</v-btn>
        </v-col>
      </v-row>

      <!--TABLA-->
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="cria" :items-per-page="5" class="ml-15 mr-15" dense :search="buscarCria">
            <template v-slot:[`item.actions`]="{ item }">
              <v-row style="width: 8vw;">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" @click="editItem(item)">
                      <v-icon color="#1C4C96" v-on="on">mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" @click="deleteItem(item)">
                        <v-icon color="#D50000" v-on="on">mdi-delete-outline</v-icon>
                      </v-btn>
                    </template>
                  <span>Eliminar</span>
                </v-tooltip>
              </v-row>
            </template>
            <template v-slot:item.numArete="{item}">
              <span class="font-weight-bold blue--text">{{ item.numArete }} </span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!--TABLA DETALLE-->
      <v-card-text>
        <v-card-title class="colorletra">Movimientos de Crias</v-card-title>
      </v-card-text>
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headersDetalle" :items="criaDetalle" :items-per-page="5" class="ml-15 mr-15" dense :search="buscarCria">
            <template v-slot:item.numArete="{item}">
              <span class="font-weight-bold blue--text">{{ item.numArete }} </span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!--DIALOGO NUEVO-->
      <v-dialog v-model="dialogNuevo" persistent max-width="500" transition="dialog-transition">
        <v-card>
          <v-card-title  class="colorletra">Nueva Cria</v-card-title>
            <v-card-text>
              <v-form ref="formCriaNuevo" v-model="valid" lazy-validation>
                <v-row align="center" justify="start">
                  <v-col cols="12" md="6" sm="4">
                  <v-select :items="hato" label="Número de Arete" item-value="id" item-text="numArete" v-model="criaAttributes.numArete" :rules="required"></v-select>
                </v-col> 
                  <v-col cols="12" md="6" sm="4">
                    <v-select :items="sexoItems" label="Sexo" :item-value="criaAttributes.sexo" :item-text="criaAttributes.sexo" v-model="criaAttributes.sexo" :rules="required"></v-select>
                  </v-col>
                  <v-col cols="12" md="6" sm="4"> 
                    <v-flex >
                      <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field v-model="date" label="Fecha de Nacimiento" readonly v-on="on" :rules="required"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-col> 
                  <v-col cols="12" md="6" sm="4">  
                    <v-text-field v-model="criaAttributes.observaciones" label="Observaciones" :rules="required"></v-text-field>
                  </v-col> 
                  <v-col cols="12" md="6" sm="4">
                    <v-select :items="raza" label="Raza" item-value="id" item-text="nombre"  v-model="criaAttributes.idRaza" :rules="required"></v-select>
                  </v-col> 
                </v-row>
              </v-form>
            </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer> 
            <v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4" small @click="onClickNew()">
              <v-icon left> mdi-check</v-icon>Guardar
            </v-btn>
            <v-btn elevation="0" rounded text width="100" class="red--text px13 font-weight-bold" small @click="cerrarVentanaNuevo()">
              <v-icon left> mdi-close</v-icon>Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO EDITAR-->

      <!--DIALOGO EDITAR-->
      <v-dialog v-model="dialogEditar" persistent max-width="500" transition="dialog-transition">
        <v-card>
          <v-card-title  class="colorletra">Editar Cria</v-card-title>
            <v-card-text>
              <v-form ref="formCriaEditar" v-model="valid" lazy-validation>
                <v-row align="center" justify="start">
                  <v-col cols="12" md="6" sm="4">
                  <v-select :items="hato" label="Número de Arete" item-value="id" item-text="numArete" v-model="criaAttributes.numArete" :rules="required"></v-select>
                </v-col> 
                  <v-col cols="12" md="6" sm="4">
                    <v-select :items="sexoItems" label="Sexo" :item-value="criaAttributes.sexo" :item-text="criaAttributes.sexo" v-model="criaAttributes.sexo" :rules="required"></v-select>
                  </v-col>
                  <v-col cols="12" md="6" sm="4"> 
                    <v-flex >
                      <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field v-model="date" label="Fecha de Nacimiento" readonly v-on="on" :rules="required"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-col> 
                  <v-col cols="12" md="6" sm="4">  
                    <v-text-field v-model="criaAttributes.observaciones" label="Observaciones"  :rules="required"></v-text-field>
                  </v-col> 
                  <v-col cols="12" md="6" sm="4">
                    <v-select :items="raza" label="Raza" item-value="id" item-text="nombre"  v-model="criaAttributes.idRaza" :rules="required"></v-select>
                  </v-col> 
                  <v-col cols="12" md="6" sm="4">
                  <v-select
                    :items="estatusItems"
                    label="Estatus"
                    :item-value="criaAttributes.estatus"
                    :item-text="criaAttributes.estatus"
                    v-model="criaAttributes.estatus"
                    :rules="required"
                  ></v-select>
                </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer> 
            <v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4" small @click="onClickEdit()">
              <v-icon left> mdi-check</v-icon>Guardar
            </v-btn>
            <v-btn elevation="0" rounded text width="100" class="red--text px13 font-weight-bold" small @click="cerrarVentanaEditar()">
              <v-icon left> mdi-close</v-icon>Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO EDITAR-->

      <!--DIALOGO ELIMINAR-->
      <v-dialog v-model="dialogEliminar" persistent max-width="1000" transition="dialog-transition">
        <v-card>
          <v-card-title  class="colorletra">Eliminar Cria</v-card-title>
            <v-card-text  class="colorletra">¿Seguro que desea desactivar la cria?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer> 
            <v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4" small @click="onClickDelet()">
              <v-icon left> mdi-check</v-icon>Desactivar
            </v-btn>
            <v-btn elevation="0" rounded text width="100" class="red--text px13 font-weight-bold" small @click="cerrarVentanaDelete()">
              <v-icon left> mdi-close</v-icon>Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO ELIMINAR-->
      <!--<v-snackbar :timeout="2000" color="blue-grey" rounded="pill">
      <template v-slot:activator="{ props }">
        <v-btn rounded="pill" color="blue-grey" class="ma-2" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>rounded="pill"</strong>.
    </v-snackbar>-->
    </v-card>
  </v-container>
</template>
      
<script>
  import axios from "axios";
  //import {get, post} from '../api/Requests.js'

  const config = {
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Headers':'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'cache-control': 'no-cache',
      'Access-Control-Allow-Credentials': 'true'
    }
  }
  export default {
    name: "AdminCria",
    components:{},
    props:['userJson'],
    data(){
      return{ 
        estatusItems: ["Activo", "Inactivo"],
        date: new Date().toISOString().substr(0, 10),
        menu2: false,
        dialogNuevo:false,
        dialogEditar:false,
        dialogEliminar:false,
        showCrearGanado:true,
        usuarioEdit:null,
        razaEdit:null,
        valid:null,
        validEliminar:null, 
        buscarCria:null,
        showCrearCria:true,
        headers: [
          { text: 'Número de arete', value: 'numArete' },
          { text: 'Sexo', value: 'sexo' },
          { text: 'Fecha de Nacimiento', value: 'fechaNac' },
          { text: 'Estatus', value: 'estatus' },
          { text: 'Raza', value: 'raza' },
          { text: 'Observaciones', value: 'observaciones' },
          { text: 'Encargado', value: 'usuario' },
          { text: 'Actions', value: 'actions' },
        ],
        headersDetalle: [
          { text: 'Número de arete', value: 'numArete' },
          { text: 'Sexo', value: 'sexo' },
          { text: 'Fecha de Nacimiento', value: 'fechaNac' },
          { text: 'Estatus', value: 'estatus' },
          { text: 'Raza', value: 'raza' },
          { text: 'Observaciones', value: 'observaciones' },
          { text: 'Encargado', value: 'usuario' },
        ],

        cria:[],
        criaDetalle:[],
        sexoItems:["Macho","Hembra"],
        raza:[],
        hato:[],
        criaAttributes:{
            idCria:null,
            numArete:null,
            sexo:null,
            fechaNac:null,
            estatus:null,
            raza:null,
            idRaza:null,
            observaciones:null,
            usuario:null,
        },
        required:[(v) => !!v || "Este campo es requerido"],  
      };
    },
    beforeMount(){
      this.$root.$on("actualizarPestanias", data => {
        console.log("Hola esde crias con el hato: " + data);
        this.getCria(data);
      })
    },
    async created(){
      this.getCria();
      this.getHato();
      this.getRaza();
      this.getCriaDetalle();
      /*Get Data of Cria
      await axios.get("http://localhost:8084/GanaderiaWS/ws/cria/getAllCria/")
      .then(response=>{
      console.log(response)
      for(let i in response.data){this.cria.push(response.data[i]) }}).catch(e => console.log(e));
      //Get Data of Hato
      await axios.get("http://localhost:8084/GanaderiaWS/ws/hato/getAllHatoActivo/")
      .then(response=>{
      console.log(response)
      for(let i in response.data){this.hato.push({numArete:response.data[i]["numArete"],id:response.data[i]["numArete"]}) }}).catch(e => console.log(e));
      // Get Raza
      await axios.get("http://localhost:8084/GanaderiaWS/ws/raza/getAllRazaActivo")
      .then(response=>{
      for(let i in response.data){this.raza.push({nombre:response.data[i]["nombre"],id:response.data[i]["idRaza"]}) }}).catch(e => console.log(e));
      console.log(this.userJson.idUsuario)*/
      
    },
    mounted(){},
    computed:{},
    watch:{},
    methods:{
      editItem(item){
        this.dialogEditar=true,
        this.criaAttributes={...item},
        console.log(this.hato.numArete)
      },
      deleteItem(item){
        this.dialogEliminar=true,
        this.criaAttributes={...item},
        console.log(this.criaAttributes)
      },
      onClickBuscar(){

      },
      onClickLimpiar(){
        this.$refs.formBusqueda.reset(),
        this.cria = [],
        this.hato=[],
        this.raza=[],
        this.criaDetalle=[],
        this.getCria(),
        this.getHato(),
        this.getRaza(),
        this.getCriaDetalle()
      },
      onclickNuevoCria(){
        this.dialogNuevo=true
      },
      onClickNew(){
        
        if(this.$refs.formCriaNuevo.validate()){
          const postData = new URLSearchParams();
          postData.append('numArete', this.criaAttributes.numArete);
          postData.append('sexo', this.criaAttributes.sexo);
          postData.append('fechaNac', this.date);
          postData.append('idRaza', this.criaAttributes.idRaza);
          postData.append('observaciones', this.criaAttributes.observaciones);
          postData.append('idUsuario', this.userJson.idUsuario);
          axios.post("http://localhost:8084/GanaderiaWS/ws/cria/registrarCria/",postData)
          .then(response=>{ 
          console.log(response.data.mensaje);
          this.$refs.formCriaNuevo.reset(),
          this.dialogNuevo=false;
          this.cria = [];
          this.criaDetalle=[];
          this.getCria();
          this.getCriaDetalle();
          }).catch(rr => console.log(rr));   
        }
      },
      onClickEdit(item){
        if(this.$refs.formCriaEditar.validate()){
          const postData = new URLSearchParams();
          postData.append('idCria', this.criaAttributes.idCria);
          postData.append('numArete', this.criaAttributes.numArete);
          postData.append('sexo', this.criaAttributes.sexo);
          postData.append('fechaNac', this.date);
          postData.append('idRaza', this.criaAttributes.idRaza);
          postData.append('observaciones', this.criaAttributes.observaciones);
          postData.append('idUsuario', this.userJson.idUsuario);
          postData.append('estatus', this.criaAttributes.estatus);
          axios.post("http://localhost:8084/GanaderiaWS/ws/cria/actualizarCria/",postData)
          .then(response=>{ 
          console.log(response.data.mensaje);
          this.$refs.formCriaEditar.reset(),
          this.dialogEditar=false;
          this.cria = [];
          this.criaDetalle=[];
          this.getCria();
          this.getCriaDetalle();
          }).catch(rr => console.log(rr));   
        }
       
      },
      onClickDelet(){
        const postData = new URLSearchParams();
        postData.append('idCria', this.criaAttributes.idCria);
        axios.post("http://localhost:8084/GanaderiaWS/ws/cria/eliminarCria/",postData)
          .then(response=>{ 
          console.log(response.data.mensaje);
          
          this.dialogEliminar=false;
          this.cria = [];
          this.criaDetalle=[];
          this.getCria();
          this.getCriaDetalle();
      
          
          }).catch(rr => console.log(rr));  
          console.log(this.criaAttributes.idCria);
      },
      cerrarVentanaNuevo(){
        this.$refs.formCriaNuevo.reset(),
        this.dialogNuevo=false
      },
      cerrarVentanaEditar(){
        this.$refs.formCriaEditar.reset(),
        this.dialogEditar=false   
      },
      cerrarVentanaDelete(){
        this.dialogEliminar=false
      },
      async getCria(idHato){
        this.cria = [];
         //Get Data of Cria
         var url = "";
         if(idHato){
          url = "http://localhost:8084/GanaderiaWS/ws/cria/getCriaById/"+idHato;
         } else{
          url = "http://localhost:8084/GanaderiaWS/ws/cria/getAllCria/";
         }
        await axios.get(url)
        .then(response=>{
        console.log(response)
        for(let i in response.data){this.cria.push(response.data[i]) }}).catch(e => console.log(e));
      },
      async getCriaDetalle(){

        await axios.get("http://localhost:8084/GanaderiaWS/ws/cria/getAllCriaHistorial/")
        .then(response=>{
        console.log(response)
        for(let i in response.data){this.criaDetalle.push(response.data[i]) }}).catch(e => console.log(e));
      },
      async getHato(){
        //Get Data of Hato
      await axios.get("http://localhost:8084/GanaderiaWS/ws/hato/getAllHatoActivo/")
      .then(response=>{
      console.log(response)
      for(let i in response.data){this.hato.push({numArete:response.data[i]["numArete"],id:response.data[i]["numArete"]}) }}).catch(e => console.log(e));
      },
      async getRaza(){
      // Get Raza
      await axios.get("http://localhost:8084/GanaderiaWS/ws/raza/getAllRazaActivo")
      .then(response=>{
      for(let i in response.data){this.raza.push({nombre:response.data[i]["nombre"],id:response.data[i]["idRaza"]}) }}).catch(e => console.log(e));
      console.log(this.userJson.idUsuario)
      }
    },
  };
</script>
<style>
.colorletra{
    color:rgb(0, 0, 0)
}
</style>