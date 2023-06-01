<template>
  <v-container>
    <v-card>
      <!--BUSQUEDA-->
      <v-card-text>
        <v-card-title>Administración de Cria</v-card-title>
      </v-card-text>
      <v-row>
        <v-card elevation="24" shaped width="100%" dense class="ml-15 mr-15">
          <v-card-text>
            <v-form ref="formBusqueda" v-model="valid">
              <v-row>
                <v-col cols="12" md="2" sm="6">
                  <v-text-field label="Búsqueda" required/>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
           <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn rounded color="#1C4C96" dark small @click="onClickBuscar">
                <v-icon dark left>mdi-magnify</v-icon>Buscar</v-btn>
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
          <v-data-table :headers="headers" :items="cria" :items-per-page="5" class="ml-15 mr-15" dense>
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

      <!--DIALOGO NUEVO-->
      <v-dialog v-model="dialogNuevo" persistent max-width="500" transition="dialog-transition">
        <v-card>
          <v-card-title>Nueva Cria</v-card-title>
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
            <v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4" small @click="saveItem()">
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
          <v-card-title>Editar Cria</v-card-title>
            <v-card-text>
              <v-form ref="formCriaEditar" v-model="valid">
                <v-row align="center" justify="start">
                  <v-col cols="12" md="6" sm="4">
                  <v-select :items="hato" label="Número de Arete" item-value="id" item-text="numArete" v-model="criaAttributes.numArete" required></v-select>
                </v-col> 
                  <v-col cols="12" md="6" sm="4">
                    <v-select :items="sexoItems" label="Sexo" :item-value="criaAttributes.sexo" :item-text="criaAttributes.sexo" v-model="criaAttributes.sexo" required></v-select>
                  </v-col>
                  <v-col cols="12" md="6" sm="4"> 
                    <v-flex >
                      <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field v-model="date" label="Fecha de Nacimiento" readonly v-on="on" required></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-col> 
                  <v-col cols="12" md="6" sm="4">  
                    <v-text-field v-model="criaAttributes.observaciones" label="Observaciones"  required></v-text-field>
                  </v-col> 
                  <v-col cols="12" md="6" sm="4">
                    <v-select :items="raza" label="Raza" item-value="id" item-text="nombre"  v-model="criaAttributes.idRaza" required></v-select>
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
          <v-card-title>Eliminar Cria</v-card-title>
            <v-card-text>¿Seguro que desea desactivar la cria?</v-card-text>
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
            
        showCrearCria:true ,
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

        cria:[],
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
    async created(){
      //Get Data of Cria
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
      console.log(this.userJson.idUsuario)
      
    },
    mounted(){},
    computed:{},
    watch:{},
    methods:{
      saveItem(item){
        this.dialogNuevo=true;
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
          this.tablaCria();
          }).catch(rr => console.log(rr));   
        }

        /*console.log(this.criaAttributes.numArete)
        console.log(this.criaAttributes.sexo)
        console.log(this.date)
        console.log(this.criaAttributes.idRaza)
        console.log(this.criaAttributes.observaciones)
        console.log(this.userJson.idUsuario)*/
       
 
      },
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
      saveCria(){

      },
      onClickBuscar(){

      },
      onClickLimpiar(){
        this.$refs.formBusqueda.reset()
      },
      onclickNuevoCria(){
        this.dialogNuevo=true
      },
      onClickEdit(){
        //console.log(this.ganadoAttributes.raza.id)
        //const postData = new URLSearchParams();
        //postData.append('usuario', this.usuario);
        //postData.append('password', this.password);
        //axios.post("http://localhost:8084/GanaderiaWS/ws/hato/actualizarHato/",postData)
        //then(response=>{
        //console.log(response.data.mensaje)
        // console.log("hola")
        // })
        //.catch(rr => console.log(rr));
        this.dialogEditar=false
        console.log(this.criaAttributes)
      },
      onClickDelet(){
        
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
      async tablaCria(){
         //Get Data of Cria
        await axios.get("http://localhost:8084/GanaderiaWS/ws/cria/getAllCria/")
        .then(response=>{
        console.log(response)
        for(let i in response.data){this.cria.push(response.data[i]) }}).catch(e => console.log(e));
      },
    },
  };
</script>
<style>
</style>