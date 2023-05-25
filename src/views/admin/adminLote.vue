<template>
    <div name="root">
        <v-card>
            <v-card-text>
                <v-card-title>Administración de Lotes</v-card-title>
                <v-card-text>inventar descripción</v-card-text>
            </v-card-text>
    
            <v-data-table :headers="headers" :items="lote">
                <!--Aqui van los botones de editar y eliminar-->
                <template v-slot:[`item.actions`]="{item}">
                    <v-icon
                        size="small"
                        class="me-2"
                        @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <td @click="editItem(item)">hola</td>
                 </template>
            </v-data-table>
        </v-card>
    </div>
</template>
      
<script>
    import axios from "axios";
    import crearGanado from '../Components/adminGanadoComponents/CrearGanado.vue'
    
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
        props:{},
        data(){
            return{      
            showCrearGanado:true ,
                headers: [
                { text: 'Nombre de lote', value: 'nombreLote' },
                { text: 'Número de lote', value: 'numLote' },
                { text: 'Estatus', value: 'estatus' },
                { text: 'Encargado', value: 'usuario' },
                { text: 'Actions', value: 'actions' },
                ],
                //ganadoPrueba=[]
                //ganadoPrueba.push({nmarete:ganado.nmarete,})
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
        },
        mounted(){},
        computed:{},
        watch:{},
        methods:{
            editItem(item){
                console.log(item.sexo)
            }
        },
    };
</script>
<style>
</style>