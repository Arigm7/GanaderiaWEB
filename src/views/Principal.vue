<template>
    <div name="root">
        <v-tabs v-model="tab" class="tabs" fixed-tabs bg-color="indigo-darken-2">
        <v-tab href="#ganado">
            <span >Administración de Hato</span> 
        </v-tab>
        <v-tab-item value="ganado">
            <adminGanado :userJson="userJson"></adminGanado>
        </v-tab-item>

        <v-tab href="#cria">
            <span>Administración de Cria</span> 
        </v-tab>
        <v-tab-item value="cria">
            <adminCria :userJson="userJson"></adminCria>
        </v-tab-item>

        <v-tab href="#lote">
            <span >Administración de Lote</span>  
        </v-tab>
        <v-tab-item value="lote">
            <adminLote :userJson="userJson"></adminLote>
        </v-tab-item>

        <v-tab href="#visita">
            <span >Administración de Visitas</span>  
        </v-tab>
        <v-tab-item value="visita">
            <adminVeterinario :userJson="userJson"></adminVeterinario>
        </v-tab-item>
    </v-tabs>   
    <router-view/>
    </div>
</template>

<script>
    import adminCria from '@/components/adminCria.vue'
    import adminGanado from '@/components/adminGanado.vue'
    import adminLote from '@/components/adminLote.vue'
    import adminVeterinario from '@/components/adminVeterinario.vue'

    export default {
        name: "principal",
        components:{
            adminCria,
            adminGanado,
            adminLote,
            adminVeterinario
        },
        props:['user'],
        data(){
            return{      
                userJson:null,
                tab: null,
            };
        },
        created(){
            console.log(this.$route?.params?.user)
            if(this.$route.params.user!=undefined){
                this.userJson=JSON.parse(this.$route.params.user)
                console.log(this?.userJson)
            }
        },
        mounted(){},
        computed:{},
        watch:{},
        methods:{},
    };
</script>
      
<style>

</style>