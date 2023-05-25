<template>
    <v-dialog  v-model="show"  max-width="500px">
        <p>hola2</p>
    </v-dialog>
</template>


<script>

export default {
    name: "crearGanado",
    components:{
 
},
props:{
     value: Boolean
},
      data(){
          return{      
       
          };
      },
      created(){

      },
      mounted(){
          
      },
      computed:{
            show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
      },
      watch:{},
      methods:{

      },
}
</script>

<style>

</style>