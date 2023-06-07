<template>
    <div name="root">
        <v-tabs v-model="tab" class="tabs" fixed-tabs bg-color="indigo-darken-2" background-color="#1C4C96" slider-color="#1C4C96" active-class="active">
        <v-tab href="#ganado">
            <span class="colorestania"  active-class="active">Administración de Hato</span> 
        </v-tab>
        <v-tab-item value="ganado">
            <adminGanado :userJson="userJson"></adminGanado>
        </v-tab-item>

        <!--<v-tab href="#cria">
            <span>Administración de Cria</span> 
        </v-tab>
        <v-tab-item value="cria">
            <adminCria :userJson="userJson"></adminCria>
        </v-tab-item>-->

        <v-tab href="#lote">
            <span  class="colorestania" >Administración de Lote</span>  
        </v-tab>
        <v-tab-item value="lote">
            <adminLote :userJson="userJson"></adminLote>
        </v-tab-item>

        <v-tab href="#traspaso">
            <span class="colorestania" >Administración de Traspaso</span>  
        </v-tab>
        <v-tab-item value="traspaso">
            <adminTraspaso :userJson="userJson"></adminTraspaso>
        </v-tab-item>
        
        <!--<v-tab href="#visita">
            <span >Administración de Visitas</span>  
        </v-tab>
        <v-tab-item value="visita">
            <adminVeterinario :userJson="userJson"></adminVeterinario>
        </v-tab-item>-->
    </v-tabs>   
    <router-view/>
    </div>
</template>

<script>
    //import adminCria from '@/components/adminCria.vue'
    import adminGanado from '@/components/adminGanado.vue'
    import adminLote from '@/components/adminLote.vue'
    import adminTraspaso from '@/components/adminTraspaso.vue'
    //import adminVeterinario from '@/components/adminVeterinario.vue'

    export default {
        name: "principal",
        components:{
            //adminCria,
            adminGanado,
            adminLote,
            adminTraspaso,
            //adminVeterinario
        },
        props:['user'],
        data(){
            return{      
                userJson:null,
                tab: null,
            };
        },
        created(){
            //console.log(this.$route?.params?.user)
            if(this.$route.params.user!=undefined){
                this.userJson=JSON.parse(this.$route.params.user)
                //console.log(this?.userJson)
            }
        },
        mounted(){},
        computed:{},
        watch:{},
        methods:{},
    };
</script>
      
<style>


.active{
    background-color: rgb(100, 151, 185);
    color: black;
}

.colorestania{
    color:rgb(255, 255, 255)
}
</style>