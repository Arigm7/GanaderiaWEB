<template>
  <v-container fluid>
    <v-card>
      <!--BUSQUEDA-->
      <v-card-text>
        <v-card-title>Administración de Hato</v-card-title>
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
          <v-btn rounded color="#1C4C96" dark small @click="onclickNuevoHato" class="ml-15 mr-15">
            <v-icon dark left>mdi-plus</v-icon>Nuevo Hato</v-btn>
        </v-col>
      </v-row>

      <!--TABLA-->
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="ganado" :items-per-page="5" item-key="numArete" single-select @click:row="onClickFila" class="ml-15 mr-15" dense>
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
      <v-dialog v-model="dialogNuevo" persistent max-width="1000" transition="dialog-transition">
        <v-card>
          <v-card-title>Nuevo Hato</v-card-title>
          <v-card-text>
            <v-form ref="formGanadoNuevo" v-model="valid" lazy-validation>
              <v-row align="center" justify="start">
                <v-col  v-for=" attributes in attibutesNames" cols="12" md="6" sm="4">  
                  <v-text-field v-model="ganadoAttributes[attributes]" :label=attributes :rules="required"></v-text-field>
                </v-col>  
                <v-col cols="12" md="6" sm="4">
                  <v-select  :items="raza" label="Razas" item-value="id" item-text="nombre" v-model="ganadoAttributes.raza" :rules="required"></v-select>
                </v-col> 
                <v-col cols="12" md="6" sm="4">
                  <v-select :items="sexoItems" label="Sexo" :item-value="ganadoAttributes.sexo" :item-text="ganadoAttributes.sexo" v-model="ganadoAttributes.sexo" :rules="required"></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-select :items="rancho" label="Ranchos" item-value="id" item-text="nombre" v-model="ganadoAttributes.rancho" :rules="required"></v-select>
                </v-col> 
                <v-col cols="12" md="6" sm="4">
                  <v-select :items="lote" label="Lotes" item-value="id" item-text="nombreLote" v-model="ganadoAttributes.lote" :rules="required"></v-select>
                </v-col> 
                <v-col cols="12" md="6" sm="4">
                  <v-select :items="tipoGanado" label="Tipo de ganado" :item-value="ganadoAttributes.tipoGanado" :item-text="ganadoAttributes.tipoGanado" v-model="ganadoAttributes.tipoGanado" :rules="required"></v-select>
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
              <v-icon left> mdi-close</v-icon>Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO NUEVO-->

      <!--DIALOGO EDITAR-->
      <v-dialog v-model="dialogEditar" persistent max-width="1000" transition="dialog-transition">
        <v-card>
          <v-card-title>Ganado</v-card-title>
          <v-card-text>
            <v-form ref="formGanado" v-model="valid" lazy-validation>
              <v-row align="center" justify="start">
                <v-col  v-for=" attributes in attibutesNames" cols="12" md="6" sm="4">  
                  <v-text-field v-model="ganadoAttributes[attributes]" :label=attributes :rules="required" ></v-text-field>
                </v-col>  
                <v-col cols="12" md="6" sm="4">
                  <v-select  :items="raza" label="Razas" item-value="id" item-text="nombre" v-model="ganadoAttributes.idRaza" :rules="required"></v-select>
                </v-col> 
                <v-col cols="12" md="6" sm="4">
                  <v-select :items="sexoItems" label="Sexo" :item-value="ganadoAttributes.sexo" :item-text="ganadoAttributes.sexo" v-model="ganadoAttributes.sexo" :rules="required"></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-select :items="rancho" label="Ranchos" item-value="id" item-text="nombre" v-model="ganadoAttributes.idRancho" :rules="required"></v-select>
                </v-col> 
                <v-col cols="12" md="6" sm="4">
                  <v-select :items="lote" label="Lotes" item-value="id" item-text="nombreLote" v-model="ganadoAttributes.idLote" :rules="required"></v-select>
                </v-col> 
                <v-col cols="12" md="6" sm="4">
                  <v-select :items="tipoGanado" label="Tipo de ganado" :item-value="ganadoAttributes.tipoGanado" :item-text="ganadoAttributes.tipoGanado" v-model="ganadoAttributes.tipoGanado" :rules="required"></v-select>
                </v-col> 
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer> 
            <v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4" small @click="onClickEdit()">
              <v-icon left> mdi-check</v-icon>Guardar
            </v-btn>
            <v-btn elevation="0" rounded text width="100" class="red--text px13 font-weight-bold" small @click="cerrarVentana()">
              <v-icon left> mdi-close</v-icon>Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO EDITAR-->

      <!--DIALOGO ELIMINAR-->
      <v-dialog v-model="dialogEliminar" persistent max-width="1000" transition="dialog-transition">
        <v-card>
          <v-card-title>Ganado</v-card-title>
          <v-card-text>
            <v-form ref="formGanadoEliminar" v-model="validEliminar" lazy-validation>
              <v-row align="center" justify="start">
                <v-col  cols="12" md="6" sm="4">  
                  <v-text-field v-model="ganadoAttributes.numArete" label="Número de Arete" :rules="required"></v-text-field>
                </v-col>  
                <v-col  cols="12" md="6" sm="4">  
                  <v-text-field v-model="ganadoAttributes.motivoDeBaja" label="Motivo de baja" :rules="required"></v-text-field>
                </v-col>  
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer> 
            <v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4" small @click="onClickDelet()">
              <v-icon left> mdi-check</v-icon>Guardar
            </v-btn>
            <v-btn elevation="0" rounded text width="100" class="red--text px13 font-weight-bold" small @click="cerrarVentanaDelete()">
              <v-icon left> mdi-close</v-icon>Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO ELIMINAR-->
      <v-tabs v-model="tab" class="tabs" fixed-tabs bg-color="indigo-darken-2">
        <v-tab href="#cria">
            <span>Administración de Cria</span> 
        </v-tab>
        <v-tab-item value="cria">
            <adminCria :userJson="userJson"></adminCria>
        </v-tab-item>
        <v-tab href="#visita">
            <span >Administración de Visitas</span>  
        </v-tab>
        <v-tab-item value="visita">
            <adminVeterinario :userJson="userJson"></adminVeterinario>
        </v-tab-item>
     
      </v-tabs>
    </v-card>
 </v-container>
</template>
    
<script>
  import axios, { Axios } from 'axios' 
  import adminCria from '@/components/adminCria.vue'
  import adminVeterinario from '@/components/adminVeterinario.vue'  
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
    name: "AdminGanado",
    components:{
      adminVeterinario,
      adminCria
    },
    props:['userJson'],
    beforeCreate(
      axios= new Axios
    ) {},

    data(){
      return{ 
        tab: null,
        idHatoSelect:null,
        dialogNuevo:false,
        dialogEditar:false,
        dialogEliminar:false,
        showCrearGanado:true,
        usuarioEdit:null,
        razaEdit:null,
        valid:null,
        validEliminar:null,
        ganadoAttributes:{
          numArete:null,
          descripcion:null,
          sexo:null,
          raza:null,
          idRaza:null,
          rancho:null,
          idRancho:null,
          tipoGanado:null,
          lote:null,
          idLote:null,
          estatus:null,
          idUsuario:null,
          motivoDeBaja:null,
        },
        required:[(v) => !!v || "Este campo es requerido"],
       //Variables edit
        headers: [
          { text: 'Número de arete', value: 'numArete', align: 'start', sortable: false, windth:255, },
          { text: 'Sexo', value: 'sexo', align: 'start', sortable: false, windth:255, },
          { text: 'Descripción', value: 'descripcion', align: 'start', sortable: false, windth:255,  },
          { text: 'Tipo de Ganado', value: 'tipoGanado', align: 'start', sortable: false, windth:255,  },
          { text: 'Estatus', value: 'estatus', align: 'start', sortable: false, windth:255,  },
          { text: 'Día de alta', value: 'diaDeAlta', align: 'start', sortable: false, windth:255,  },
          { text: 'Día de modificación', value: 'diaDeModificacion', align: 'start', sortable: false, windth:255,  },
          { text: 'Día de baja', value: 'diaDeBaja', align: 'start', sortable: false, windth:255,  },
          { text: 'Motivo de baja', value: 'motivoDeBaja', align: 'start', sortable: false, windth:255,  },
          { text: 'Raza', value: 'raza', align: 'start', sortable: false, windth:255,  },
          { text: 'Rancho', value: 'rancho', align: 'start', sortable: false, windth:255,  },
          { text: 'Lote', value: 'lote', align: 'start', sortable: false, windth:255,  },
          { text: 'Encargado', value: 'usuario', align: 'start', sortable: false, windth:255,  },
          { text: 'Actions', value: 'actions', align: 'start', sortable: false, windth:255,  },
        ],
             
        ganado:[],
        attibutesNames:["Número de Arete","Descripcion"],
        sexoItems:["Macho","Hembra"],
        tipoGanado:["Interno","Externo"],
        raza:[],
        lote:[],
        rancho:[],
      };
    },
    async created(){
      if(!this.$session.id() && !this.$session.has("user")){
            this.$router.push({name:"login"})
        }
      this.getHato();
      // Get Raza
      await axios.get("http://localhost:8084/GanaderiaWS/ws/raza/getAllRazaActivo")
      .then(response=>{
      for(let i in response.data){this.raza.push({nombre:response.data[i]["nombre"],id:response.data[i]["idRaza"]}) }}).catch(e => console.log(e));
      // Get Lote
      await axios.get("http://localhost:8084/GanaderiaWS/ws/lote/getAllLoteActivo")
      .then(response=>{
      for(let i in response.data){this.lote.push({nombre:response.data[i]["nombreLote"],id:response.data[i]["idLote"]}) }}).catch(e => console.log(e));
      // Get Rancho
      await axios.get("http://localhost:8084/GanaderiaWS/ws/rancho/getAllRanchoActivo")
      .then(response=>{
      for(let i in response.data){this.rancho.push({nombre:response.data[i]["nombre"],id:response.data[i]["idRancho"]}) }}).catch(e => console.log(e));
      console.log(this.userJson)
      
    },
    mounted(){},
    computed:{},
    watch:{},
    methods:{
      onclickNuevoHato(){
        this.dialogNuevo=true
      },
      deleteItem(item){
        this.dialogEliminar=true,
        this.ganadoAttributes={...item}
      },
      editItem(item){
        this.dialogEditar=true,
        this.ganadoAttributes={...item},
        console.log(this.ganadoAttributes)
      },
      onClickNew(){
        if(this.$refs.formGanadoNuevo.validate()){

        }
      },      
      onClickEdit(){
        console.log(this.ganadoAttributes.raza.id)
        if(this.$refs.formGanado.validate()){


        }
            //const postData = new URLSearchParams();
            //postData.append('numArete', this.ganadoAttributes.numArete);
            //postData.append('sexo', this.ganadoAttributes.sexo);
            //postData.append('descripcion', this.ganadoAttributes.descripcion);
            //postData.append('tipoGanado', this.ganadoAttributes.tipoGanado);
            //postData.append('idUsuario', this.ganadoAttributes.idUsuario);
            //postData.append('idRaza', this.ganadoAttributes.idRaza);
            //postData.append('idLote', this.ganadoAttributes.idLote);
            //postData.append('idRancho', this.ganadoAttributes.idRancho);
            //console.log(postData)
            //axios.post("http://localhost:8084/GanaderiaWS/ws/hato/actualizarHato/",postData)
            //then(response=>{
            //console.log(response.data.mensaje)
            //console.log("hola")
            //})
            //.catch(rr => console.log(rr));
            //this.dialogEditar=false
      },
      onClickDelet(){
        if(this.$refs.formGanadoEliminar.validate()){
          const postData = new URLSearchParams();
          postData.append('numArete', this.ganadoAttributes.numArete);
          postData.append('motivoDeBaja', this.ganadoAttributes.motivoDeBaja);
          postData.append('idUsuario', this.userJson.idUsuario);
          axios.post("http://localhost:8084/GanaderiaWS/ws/hato/eliminarHato/",postData)
            .then(response=>{ 
            console.log(response.data.mensaje);
            
            this.dialogEliminar=false;
            
            }).catch(rr => console.log(rr));  
        }
            
      },
      onClickBuscar(){
        console.log(this.userJson);
        this.consultarHato();
        this.consultarCrias();
        this.ConsulartVeterinario();

      },
      onClickLimpiar(){
        this.$refs.formBusqueda.reset()
      },
      cerrarVentanaNuevo(){
        this.dialogNuevo=false
      },
      cerrarVentana(){
        this.$refs.formGanado.reset(),
        this.dialogEditar=false
      },
      cerrarVentanaDelete(){
        this.$refs.formGanadoEliminar.reset(),
        this.dialogEliminar=false
      },
      async getHato(){
        //Get Data of ganado
        await axios.get("http://localhost:8084/GanaderiaWS/ws/hato/getAllHato/")
        .then(response=>{
        console.log(response)
        for(let i in response.data){this.ganado.push(response.data[i]) }}).catch(e => console.log(e));
      },
      onClickFila(item,row){
            console.log(item)
            console.log(row)
            row.select(true)
            this.idHatoSelect=item.numArete
            this.getInformacionLaboral(this.idHatoSelect)
        },
      async getInformacionLaboral(numArete){

      }
    },
  };
</script>
<style>
</style>