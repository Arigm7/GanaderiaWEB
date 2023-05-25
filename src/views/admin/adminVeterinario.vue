<template>
    <div name="root">
        <v-card>
            <v-card-text>
                <v-card-title>Administración de Visistas de Veterinario</v-card-title>
                <v-card-text>inventar descripción</v-card-text>
            </v-card-text>
    
            <v-data-table :headers="headers" :items="visita">
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
        name: "AdminVeterinario",
        components:{
    
        },
        props:{},
        data(){
            return{      
            showCrearGanado:true ,
                headers: [
                { text: 'Veterinario', value: 'nombreVisita' },
                { text: 'Fecha de la visita', value: 'fechaVisita' },
                { text: 'motivo', value: 'motivo' },
                { text: 'Observaciones', value: 'observaciones' },
                { text: 'Estatus', value: 'estatus' },
                { text: 'Número de arete', value: 'numArete' },
                { text: 'Encargado', value: 'usuario' },
                { text: 'Actions', value: 'actions' },
                ],
                //ganadoPrueba=[]
                //ganadoPrueba.push({nmarete:ganado.nmarete,})
                visita:[]
            };
        },
        created(){
            axios.get("http://localhost:8084/GanaderiaWS/ws/veterinario/getAllVeterinario/")
            .then(response=>{
             console.log(response)

              for(let i in response.data){
                this.visita.push(response.data[i])
              }
              console.log(this.visita)
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