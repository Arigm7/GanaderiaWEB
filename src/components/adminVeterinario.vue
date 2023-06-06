<template>
  <v-container fluid>
    <v-card>
      <!--BUSQUEDA-->
      <v-card-text>
        <v-card-title>Administración de Visitas - Veterinario</v-card-title>
      </v-card-text>
      <v-row>
        <v-card elevation="24" shaped width="100%" dense class="ml-15 mr-15">
          <v-card-text>
            <v-form ref="formBusqueda" v-model="valid">
              <v-row>
                <v-col cols="12" md="2" sm="6">
                  <v-text-field
                    label="Búsqueda"
                    required
                    v-model="buscarVisita"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded color="#558B2F" dark small @click="onClickLimpiar">
              <v-icon dark left>mdi-monitor-shimmer</v-icon>Limpiar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>

      <!--NUEVO-->
      <v-row align="start" justify="start">
        <v-col cols="2">
          <v-btn
            rounded
            color="#1C4C96"
            dark
            small
            @click="onclickNuevoVisita"
            class="ml-15 mr-15"
          >
            <v-icon dark left>mdi-plus</v-icon>Nuevo Visita</v-btn
          >
        </v-col>
      </v-row>

      <!--TABLA-->
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="visita"
            :items-per-page="5"
            class="ml-15 mr-15"
            :search="buscarVisita"
            dense
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-row style="width: 8vw">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" @click="editItem(item)">
                      <v-icon color="#1C4C96" v-on="on"
                        >mdi-pencil-outline</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Editar</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" @click="deleteItem(item)">
                      <v-icon color="#D50000" v-on="on"
                        >mdi-delete-outline</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Eliminar</span>
                </v-tooltip>
              </v-row>
            </template>
            <template v-slot:item.numArete="{ item }">
              <span class="font-weight-bold blue--text"
                >{{ item.numArete }}
              </span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!--TABLA DETALLE-->
      <v-card-text>
        <v-card-title>Movimientos de Visitas</v-card-title>
      </v-card-text>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headersDetalle"
            :items="visitaDetalle"
            :items-per-page="5"
            class="ml-15 mr-15"
            :search="buscarVisita"
            dense
          >
            <template v-slot:item.numArete="{ item }">
              <span class="font-weight-bold blue--text"
                >{{ item.numArete }}
              </span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <!--DIALOGO NUEVO-->
      <v-dialog
        v-model="dialogNuevo"
        persistent
        max-width="1000"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title>Nueva Visita</v-card-title>
          <v-card-text>
            <v-form ref="formVisitaNuevo" v-model="valid" lazy-validation>
              <v-row align="center" justify="start">
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="visitaAttributes.nombreVisita"
                    label="Nombre del veterinario"
                    :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-select
                    :items="hato"
                    label="Número de Arete"
                    item-value="id"
                    item-text="numArete"
                    v-model="visitaAttributes.numArete"
                    :rules="required"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="visitaAttributes.motivo"
                    label="Motivo"
                    :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="visitaAttributes.observaciones"
                    label="Observaciones"
                    :rules="required"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              dark
              rounded
              width="120"
              class="green px13 font-weight-regular pr-4"
              small
              @click="onClickNew()"
            >
              <v-icon left> mdi-check</v-icon>Guardar
            </v-btn>
            <v-btn
              elevation="0"
              rounded
              text
              width="100"
              class="red--text px13 font-weight-bold"
              small
              @click="cerrarVentanaNuevo()"
            >
              <v-icon left> mdi-close</v-icon>Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO NUEVO-->
      <!--DIALOGO EDITAR-->
      <v-dialog
        v-model="dialogEditar"
        persistent
        max-width="1000"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title>Editar Visita</v-card-title>
          <v-card-text>
            <v-form ref="formVisitaEdit" v-model="valid" lazy-validation>
              <v-row align="center" justify="start">
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="visitaAttributes.nombreVisita"
                    label="Nombre del veterinario"
                    :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-select
                    :items="hato"
                    label="Número de Arete"
                    item-value="id"
                    item-text="numArete"
                    v-model="visitaAttributes.numArete"
                    :rules="required"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="visitaAttributes.motivo"
                    label="Motivo"
                    :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="visitaAttributes.observaciones"
                    label="Observaciones"
                    :rules="required"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              dark
              rounded
              width="120"
              class="green px13 font-weight-regular pr-4"
              small
              @click="onClickEdit()"
            >
              <v-icon left> mdi-check</v-icon>Guardar
            </v-btn>
            <v-btn
              elevation="0"
              rounded
              text
              width="100"
              class="red--text px13 font-weight-bold"
              small
              @click="cerrarVentana()"
            >
              <v-icon left> mdi-close</v-icon>Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO EDITAR-->
      <!--DIALOGO ELIMINAR-->
      <v-dialog
        v-model="dialogEliminar"
        persistent
        max-width="1000"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title>Eliminar Visita</v-card-title>
          <v-card-text>¿Seguro que desea desactivar la visita?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              dark
              rounded
              width="120"
              class="green px13 font-weight-regular pr-4"
              small
              @click="onClickDelet()"
            >
              <v-icon left> mdi-check</v-icon>Desactivar
            </v-btn>
            <v-btn
              elevation="0"
              rounded
              text
              width="100"
              class="red--text px13 font-weight-bold"
              small
              @click="cerrarVentanaDelete()"
            >
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
import { get, post } from "../api/Requests.js";
const config = {
  headers: {
    "Content-type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
    "cache-control": "no-cache",
    "Access-Control-Allow-Credentials": "true",
  },
};

export default {
  name: "AdminVeterinario",
  components: {},
  props: ["userJson"],
  data() {
    return {
      buscarVisita: null,
      dialogNuevo: false,
      dialogEditar: false,
      dialogEliminar: false,
      showCrearLote: true,
      usuarioEdit: null,
      valid: null,
      validEliminar: null,
      visitaAttributes: {
        idVisita: null,
        nombreVisita: null,
        fechaVisita: null,
        motivo: null,
        observaciones: null,
        estatus: null,
        numArete: null,
        idUsuario: null,
      },
      showCrearGanado: true,
      headers: [
        { text: "Número de arete", value: "numArete" },
        { text: "Veterinario", value: "nombreVisita" },
        { text: "Fecha de la visita", value: "fechaVisita" },
        { text: "motivo", value: "motivo" },
        { text: "Observaciones", value: "observaciones" },
        { text: "Estatus", value: "estatus" },
        { text: "Encargado", value: "usuario" },
        { text: "Actions", value: "actions" },
      ],
      headersDetalle: [
        { text: "Número de arete", value: "numArete" },
        { text: "Veterinario", value: "nombreVisita" },
        { text: "Fecha de la visita", value: "fechaVisita" },
        { text: "motivo", value: "motivo" },
        { text: "Observaciones", value: "observaciones" },
        { text: "Estatus", value: "estatus" },
        { text: "Encargado", value: "usuario" },
      ],

      visita: [],
      visitaDetalle:[],
      hato:[],
      required:[(v) => !!v || "Este campo es requerido"], 
    };
  },
  beforeMount() {
    this.$root.$on("actualizarPestanias", (data) => {
      console.log("Hola esde crias con el hato: " + data);
      this.getVisita(data);
    });
  },
  created() {
    this.getVisita();
    this.getHato();
    this.getVisitaDetalle();
    //console.log(this.userJson);
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    editItem(item) {
      (this.dialogEditar = true),
        (this.visitaAttributes = { ...item })
        //console.log(this.visitaAttributes);
    },
    onClickEdit() {
      if(this.$refs.formVisitaEdit.validate()){
          const postData = new URLSearchParams();
          postData.append('idVisita', this.visitaAttributes.idVisita);
          postData.append('nombreVisita', this.visitaAttributes.nombreVisita);
          postData.append('motivo', this.visitaAttributes.motivo);
          postData.append('observaciones', this.visitaAttributes.observaciones);
          postData.append('numArete', this.visitaAttributes.numArete);
          postData.append('idUsuario', this.userJson.idUsuario);
          axios.post("http://localhost:8084/GanaderiaWS/ws/veterinario/actualizarVeterinario/",postData)
          .then(response=>{ 
          console.log(response.data.mensaje);
          this.$refs.formVisitaEdit.reset(),
          this.dialogEditar=false;
          this.visita = [];
          this.getVisita();
          }).catch(rr => console.log(rr));   
        }
    },
    onClickNew() {
      if(this.$refs.formVisitaNuevo.validate()){
          const postData = new URLSearchParams();
          postData.append('nombreVisita', this.visitaAttributes.nombreVisita);
          postData.append('motivo', this.visitaAttributes.motivo);
          postData.append('observaciones', this.visitaAttributes.observaciones);
          postData.append('numArete', this.visitaAttributes.numArete);
          postData.append('idUsuario', this.userJson.idUsuario);
          axios.post("http://localhost:8084/GanaderiaWS/ws/veterinario/registrarVeterinario/",postData)
          .then(response=>{ 
          console.log(response.data.mensaje);
          this.$refs.formVisitaNuevo.reset(),
          this.dialogNuevo=false;
          this.visita = [];
          this.getVisita();
          }).catch(rr => console.log(rr));   
        }
    },
    onClickDelet(){
      const postData = new URLSearchParams();
        postData.append('idVisita', this.visitaAttributes.idVisita);
        axios.post("http://localhost:8084/GanaderiaWS/ws/veterinario/eliminarVeterinario/",postData)
          .then(response=>{ 
          console.log(response.data.mensaje);
          
          this.dialogEliminar=false;
          this.visita = [];
          this.getVisita();
      
          
          }).catch(rr => console.log(rr));  
          
    },
    deleteItem(item) {
      (this.dialogEliminar = true), (this.visitaAttributes = { ...item });
    },
    saveDelet() {},
    onClickBuscar() {},
    onClickLimpiar() {
      this.$refs.formBusqueda.reset();
      this.visita = [];
      this.hato=[],
      this.visitaDetalle=[];
      this.getVisitaDetalle();
      this.getVisita();
      this.getHato()
       
    },
    onclickNuevoVisita() {
      this.dialogNuevo = true;
    },
    cerrarVentanaNuevo() {
      this.dialogNuevo = false;
    },
    cerrarVentana() {
      this.$refs.formVisitaEdit.reset(), (this.dialogEditar = false);
    },
    cerrarVentanaDelete() {
      this.dialogEliminar = false;
    },
    async getVisita(idHato) {
      this.visita = [];
      //Get Data of Veterinario
      var url = "";
      if (idHato) {
        url = "/veterinario/getVeterinarioById/" + idHato;
      } else {
        url = "/veterinario/getAllVeterinario/";
      }
      const response = await get(url);
      if (response.error === true) {
        console.log(response);

        return;
      } else {
        console.log(response);
        this.visita = response;
      }
    },
    async getVisitaDetalle() {

      const response = await get("/veterinario/getAllVisitaHistorial/");
      if (response.error === true) {
        console.log(response);

        return;
      } else {
        console.log(response);
        this.visitaDetalle = response;
      }
    },
    async getHato(){
      //Get Data of Hato
      await axios.get("http://localhost:8084/GanaderiaWS/ws/hato/getAllHatoActivo/")
      .then(response=>{
      console.log(response)
      for(let i in response.data){this.hato.push({numArete:response.data[i]["numArete"],id:response.data[i]["numArete"]}) }}).catch(e => console.log(e));
      // Get Raza
    }
  },
};
</script>
<style>
</style>