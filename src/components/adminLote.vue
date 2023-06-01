<template>
    <v-container fluid>
        <v-card>
            <!--BUSQUEDA-->
            <v-card-text>
                <v-card-title>Administración de Lotes</v-card-title>
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
                <v-btn rounded color="#1C4C96" dark small @click="onclickNuevoLote" class="ml-15 mr-15">
                    <v-icon dark left>mdi-plus</v-icon>Nuevo Lote</v-btn>
                </v-col>
            </v-row>

            <!--TABLA-->
            <v-row>
                <v-col cols="12">
                <v-data-table :headers="headers" :items="lote" :items-per-page="5" class="ml-15 mr-15" dense>
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
                    <template v-slot:item.nombreLote="{item}">
                    <span class="font-weight-bold blue--text">{{ item.nombreLote }} </span>
                    </template>
                </v-data-table>
                </v-col>
            </v-row>
            <!--DIALOGO NUEVO-->
            <v-dialog v-model="dialogNuevo" persistent max-width="1000" transition="dialog-transition">
                <v-card>
                <v-card-title>Nuevo Lote</v-card-title>
                <v-card-text>
                    <v-form ref="formLoteNuevo" v-model="valid">
                    <v-row align="center" justify="start">
                        <v-col cols="12" md="6" sm="4">  
                              <v-text-field v-model="loteAttributes.nombreLote" label="Nombre" required></v-text-field>
                         </v-col> 
                         <v-col cols="12" md="6" sm="4">  
                              <v-text-field v-model="loteAttributes.numLote" label="Número de lote" type="number" required></v-text-field>
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
                    <v-icon left> mdi-close</v-icon>Cerrar
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            <!--FIN DIALOGO NUEVO-->
            <!--DIALOGO EDITAR-->
            <v-dialog v-model="dialogEditar" persistent max-width="1000" transition="dialog-transition">
                <v-card>
                <v-card-title>Editar Lote</v-card-title>
                <v-card-text>
                    <v-form ref="formLote" v-model="valid">
                    <v-row align="center" justify="start">
                        <v-col cols="12" md="6" sm="4">  
                              <v-text-field v-model="loteAttributes.nombreLote" label="Nombre" required></v-text-field>
                         </v-col> 
                         <v-col cols="12" md="6" sm="4">  
                              <v-text-field v-model="loteAttributes.numLote" label="Número de lote" type="number" required></v-text-field>
                         </v-col> 
                    </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer> 
                    <v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4" small @click="saveEdit()">
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
                <v-card-title>Eliminar Lote</v-card-title>
                    <v-card-text>¿Seguro que desea desactivar el lote?</v-card-text>
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
        name: "AdminLote",
        components:{
    
        },
        props:['userJson'],
        data(){
            return{  
                dialogNuevo:false,
                dialogEditar:false,
                dialogEliminar:false,
                showCrearLote:true,
                usuarioEdit:null,
                razaEdit:null,
                valid:null,
                validEliminar:null, 
                loteAttributes:{
                    nombreLote:null,
                    numLote:null,
                    estatus:null,
                    idUsuario:null,

                },   
            showCrearLote:true ,
                headers: [
                { text: 'Nombre de lote', value: 'nombreLote' },
                { text: 'Número de lote', value: 'numLote' },
                { text: 'Estatus', value: 'estatus' },
                { text: 'Encargado', value: 'usuario' },
                { text: 'Actions', value: 'actions' },
                ],

                lote:[]
            };
        },
        created(){
            axios.get("http://localhost:8084/GanaderiaWS/ws/lote/getAllLote/")
            .then(response=>{
             console.log(response)

              for(let i in response.data){
                this.lote.push(response.data[i])
              }
              console.log(this.lote)
            }

             )
            .catch(e => console.log(e));
            console.log(this.userJson)
        },
        mounted(){},
        computed:{},
        watch:{},
        methods:{
            editItem(item){
        this.dialogEditar=true,
        this.loteAttributes={...item},
        console.log(this.loteAttributes)
      },
      saveEdit(){
        console.log(this.loteAttributes.raza.id)
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
      deleteItem(item){
        this.dialogEliminar=true,
        this.loteAttributes={...item}
      },
      saveItem(){

      },
      saveDelet(){

      },
      onClickBuscar(){

      },
      onClickLimpiar(){
        this.$refs.formBusqueda.reset()
      },
      onclickNuevoLote(){
        this.dialogNuevo=true
      },
      cerrarVentanaNuevo(){
        this.dialogNuevo=false
      },

      cerrarVentana(){
        this.$refs.formLote.reset(),
        this.dialogEditar=false
      },
      cerrarVentanaDelete(){
        
        this.dialogEliminar=false
      },
        },
    };
</script>
<style>
</style>