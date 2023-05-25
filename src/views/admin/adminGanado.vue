<template>
  
  <div name="root">
    <v-card>
      <v-card-text>
        <v-card-title>Administración de Hato</v-card-title>
        <v-card-text>inventar descripción</v-card-text>
      </v-card-text>
      <v-row>
        <v-card elevation="24" shaped width="100%" dense class="ml-5 mr-5">
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
                <v-btn rounded class="botonPrimario"  small variant="tonal">
                    <v-icon dark left>mdi-magnify</v-icon>                  <!--SE AGREGO LOS ICON-->
                    Buscar</v-btn>
                <v-btn rounded color="blue" dark small>
                    <v-icon dark left>mdi-monitor-shimmer</v-icon>
                    Limpiar</v-btn>
            </v-card-actions>       <!--Lo del boton-->
        </v-card>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn rounded color="green" dark small>
            <v-icon dark left>mdi-plus</v-icon>                  <!--SE AGREGO LOS ICON-->
              Nuevo</v-btn>
        </v-col>
      </v-row>
    
      <v-data-table :headers="headers" :items="ganado" :items-per-page="5" class="ml-5 mr-5" dense>
        <!--Aqui van los botones de editar y eliminar-->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="editItem(item)">
            <v-icon small class="blackIcon" >mdi-pencil</v-icon>
            
            <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          <v-card-actions>
            <v-btn class="botonPrimario"  @click="cerrarVentana()">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
      
        </v-btn>

          <v-icon
            small
            @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>

</template>
    
<script>
 
  import crearGanado from '../Components/adminGanadoComponents/CrearGanado.vue'
  import axios, { Axios } from 'axios'   
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
  
      },
      props:{},
      beforeCreate(
        axios= new Axios
      ) {

          
    },
      data(){
          return{      
          dialog:false,
          showCrearGanado:true ,
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
              //ganadoPrueba=[]
              //ganadoPrueba.push({nmarete:ganado.nmarete,})
              ganado:[],
              valid:null,
          };
      },
      created(){
        axios.get("http://localhost:8084/GanaderiaWS/ws/hato/getAllHato/")
            .then(response=>{
             console.log(response)

              for(let i in response.data){
                this.ganado.push(response.data[i])
              }
              console.log(this.ganado)
            }

             )
            .catch(e => console.log(e));
      },
      mounted(){},
      computed:{},
      watch:{},
      methods:{
          editItem(item){
            this.dialog=true
              console.log(item.sexo)
          },
          cerrarVentana(){
            this.dialog=false
          }
      },
  };
</script>
<style>


.botonPrimario{
  background-color: green !important;
  color: white !important;
}
.blackIcon{
  color: black!important;
}
</style>