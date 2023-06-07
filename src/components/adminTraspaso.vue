<template>
  <v-container fluid>
    <v-card>
      <!--BUSQUEDA-->
      <v-card-text>
        <v-card-title class="colorletra">Administración de Traspasos</v-card-title>
      </v-card-text>
      <v-row>
        <v-card elevation="24" shaped width="100%" dense class="ml-15 mr-15">
          <v-card-text>
            <v-form ref="formBusqueda" v-model="valid">
              <v-row>
                <v-col cols="12" md="2" sm="6">
                  <v-text-field
                    label="Búsqueda"
                    v-model="buscarTraspaso"
                    required
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
            @click="onclickNuevoTraspaso"
            class="ml-15 mr-15"
          >
            <v-icon dark left>mdi-plus</v-icon>Nuevo Traspaso</v-btn
          >
        </v-col>
      </v-row>
      <!--TABLA-->
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="traspaso"
            :items-per-page="5"
            class="ml-15 mr-15"
            :search="buscarTraspaso"
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
            <template v-slot:item.loteOriginal="{ item }">
              <span class="font-weight-bold blue--text"
                >{{ item.loteOriginal }}
              </span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <!--TABLA DETALLE-->
      <v-card-text>
        <v-card-title class="colorletra">Movimientos de Traspasos</v-card-title>
      </v-card-text>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headersDetalle"
            :items="traspasoDetalle"
            :items-per-page="5"
            class="ml-15 mr-15"
            :search="buscarTraspaso"
            dense
          >
            <template v-slot:item.nombreLote="{ item }">
              <span class="font-weight-bold blue--text"
                >{{ item.nombreLote }}
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
          <v-card-title class="colorletra">Nuevo Traspaso</v-card-title>
          <v-card-text>
            <v-form ref="formTraspasoNuevo" v-model="valid" lazy-validation>
              <v-row align="center" justify="start">
                <v-col cols="12" md="6" sm="4">
                  <v-select
                    :items="hato"
                    label="Número de Arete"
                    item-value="id"
                    item-text="numArete"
                    v-model="traspasoAttributes.numArete"
                    :rules="required"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="traspasoAttributes.descripcion"
                    label="Descripcion"
                    type="text"
                    :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="traspasoAttributes.motivo"
                    label="Motivo"
                    type="text"
                    :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-select
                    :items="lote"
                    label="Lotes"
                    item-value="id"
                    item-text="nombreLote"
                    v-model="traspasoAttributes.idLote"
                    :rules="required"
                  ></v-select>
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
          <v-card-title class="colorletra">Editar Traspaso</v-card-title>
          <v-card-text>
            <v-form ref="formTraspasoEdit" v-model="valid" lazy-validation>
              <v-row align="center" justify="start">
                <v-col cols="12" md="6" sm="4">
                  <v-select
                    :items="hato"
                    label="Número de Arete"
                    item-value="id"
                    item-text="numArete"
                    v-model="traspasoAttributes.numArete"
                    :rules="required"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="traspasoAttributes.descripcion"
                    label="Descripcion"
                    type="text"
                    :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="traspasoAttributes.motivo"
                    label="Motivo"
                    type="text"
                    :rules="required"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-select
                    :items="lote"
                    label="Nombre del lote"
                    item-value="id"
                    item-text="nombreLote"
                    v-model="traspasoAttributes.idLote"
                    :rules="required"
                  ></v-select>
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
          <v-card-title class="colorletra">Eliminar Traspaso</v-card-title>
          <v-card-text>
            <v-form ref="formTraspasoDelet" v-model="valid" lazy-validation>
              <v-row align="center" justify="start">
                <v-col cols="12" md="6" sm="4">
                  <v-text-field
                    v-model="traspasoAttributes.motivoDeCancelacion"
                    label="Motivo de Cancelación"
                    type="text"
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
              <v-icon left> mdi-close</v-icon>Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO ELIMINAR-->
      <!--DIALOGO ELIMINAR CONFIRMACION-->
      <v-dialog
        v-model="dialogEliminarConfirmacion"
        persistent
        max-width="1000"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title class="colorletra">Eliminar Traspaso</v-card-title>
          <v-card-text>¿Seguro que desea desactivar el traspaso?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              dark
              rounded
              width="120"
              class="green px13 font-weight-regular pr-4"
              small
              @click="onClickDeletConfirmacion()"
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
              @click="cerrarVentanaConfirmacion()"
            >
              <v-icon left> mdi-close</v-icon>Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--FIN DIALOGO ELIMINAR CONFIRMACION-->
    </v-card>
  </v-container>
</template>
<script>
import { get, post } from "../api/Requests.js";
import axios from "axios";
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
  name: "AdminTraspaso",
  components: {},
  props: ["userJson"],
  data() {
    return {
      valid: null,
      buscarTraspaso: null,
      dialogNuevo: false,
      dialogEditar: false,
      dialogEliminar: false,
      dialogEliminarConfirmacion: false,
      traspaso: [],
      traspasoDetalle:[],
      hato: [],
      lote: [],
      headers: [
        { text: "Número de Arete", value: "numArete" },
        { text: "Nombre de Lote Original", value: "loteOriginal" },
        { text: "Descripción", value: "descripcion" },
        { text: "Estatus", value: "estatus" },
        { text: "Motivo", value: "motivo" },
        { text: "Fecha de Creación", value: "fechaCreacion" },
        { text: "Fecha de Modificación", value: "fechaModificacion" },
        { text: "Fecha de Cancelación", value: "fechaCancelacion" },
        { text: "Motivo de Cancelación", value: "motivoDeCancelacion" },
        { text: "Encargado", value: "usuario" },
        { text: "Actions", value: "actions" },
      ],
      headersDetalle: [
        { text: "Número de Arete", value: "numArete" },
        { text: "Nombre de Lote", value: "nombreLote" },
        { text: "Descripción", value: "descripcion" },
        { text: "Estatus", value: "estatus" },
        { text: "Motivo", value: "motivo" },
        { text: "Fecha de Creación", value: "fechaCreacion" },
        { text: "Fecha de Modificación", value: "fechaModificacion" },
        { text: "Fecha de Cancelación", value: "fechaCancelacion" },
        { text: "Motivo de Cancelación", value: "motivoDeCancelacion" },
        { text: "Encargado", value: "usuario" },
        
      ],
      traspasoAttributes: {
        idTraspaso: null,
        numArete: null,
        nombreLote: null,
        descripcion: null,
        estatus: null,
        motivo: null,
        loteOriginal: null,
        loteDestino: null,
        fechaCreacion: null,
        fechaModificacion: null,
        fechaCancelacion: null,
        motivoDeCancelacion: null,
        idUsuario: null,
        idLote: null,
        usuario: null,
        estatus: null,
        actions: null,
      },
      required: [(v) => !!v || "Este campo es requerido"],
    };
  },
  created() {
    this.getTraspaso();
    this.getHato();
    this.getLote();
    this.getMovimientosTraspaso();
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    onClickBuscar() {},
    onClickLimpiar() {
      this.$refs.formBusqueda.reset();
      this.traspaso=[],
      this.traspasoDetalle=[],
      this.getMovimientosTraspaso(),
      this.getTraspaso();
    },
    onclickNuevoTraspaso() {
      this.dialogNuevo = true;
    },
    editItem(item) {
      (this.dialogEditar = true), (this.traspasoAttributes = { ...item });
    },
    deleteItem(item) {
      this.dialogEliminarConfirmacion = true;
      this.traspasoAttributes = { ...item }
    },
    async onClickNew() {
      if (this.$refs.formTraspasoNuevo.validate()) {
        const response = await get("/traspaso/getTraspasoById/" + this.traspasoAttributes.numArete);
        if(response.length > 0) {
          console.log("El hato ya cuenta con un traspaso inicial");
        }else{
            const postData = new URLSearchParams();
            postData.append("numArete", this.traspasoAttributes.numArete);
            postData.append("descripcion", this.traspasoAttributes.descripcion);
            postData.append("motivo", this.traspasoAttributes.motivo);
            postData.append("idLote", this.traspasoAttributes.idLote);
            postData.append("idUsuario", this.userJson.idUsuario);
            axios.post("http://localhost:8084/GanaderiaWS/ws/traspaso/registrarTraspaso/",postData)
              .then(response=>{ 
              console.log(response.data.mensaje);
              this.$refs.formTraspasoNuevo.reset(),
              this.dialogNuevo=false;
              this.traspaso=[],
              this.traspasoDetalle=[],
              this.getTraspaso();
              this.getMovimientosTraspaso();
              
              }).catch(rr => console.log(rr)); 
        }
        /*console.log(
          this.traspasoAttributes.numArete,
          this.traspasoAttributes.descripcion,
          this.traspasoAttributes.motivo,
          this.traspasoAttributes.idLote,
          this.userJson.idUsuario
        );*/
      }
    },
    onClickEdit(item) {
      const postData = new URLSearchParams();
      postData.append("idTraspaso", this.traspasoAttributes.idTraspaso);
      postData.append("numArete", this.traspasoAttributes.numArete);
      postData.append("descripcion", this.traspasoAttributes.descripcion);
      postData.append("motivo", this.traspasoAttributes.motivo);
      postData.append("idUsuario", this.userJson.idUsuario);
      postData.append("idLote", this.traspasoAttributes.idLote);
      axios.post("http://localhost:8084/GanaderiaWS/ws/traspaso/actualizarTraspaso/",postData)
      .then(response=>{ 
        console.log(response.data.mensaje);
        this.$refs.formTraspasoEdit.reset(),
        this.dialogEditar=false;
        this.traspaso=[],
        this.traspasoDetalle=[],
        this.getTraspaso();
        this.getMovimientosTraspaso();
              
      }).catch(rr => console.log(rr)); 
      console.log(
        this.traspasoAttributes.idTraspaso,
          this.traspasoAttributes.numArete,
          this.traspasoAttributes.descripcion,
          this.traspasoAttributes.motivo,
          this.traspasoAttributes.idLote,
          this.userJson.idUsuario
        );
    },
    onClickDelet() {
      const postData = new URLSearchParams();
      postData.append("idTraspaso", this.traspasoAttributes.idTraspaso);
      postData.append("motivoDeCancelacion", this.traspasoAttributes.motivoDeCancelacion);
      postData.append("idUsuario", this.userJson.idUsuario);
      axios.post("http://localhost:8084/GanaderiaWS/ws/traspaso/eliminarTraspaso/",postData)
      .then(response=>{ 
        console.log(response.data.mensaje);
        this.$refs.formTraspasoDelet.reset(),
        this.dialogEliminar=false;
        this.traspaso=[],
        this.traspasoDetalle=[],
        this.getTraspaso();
        this.getMovimientosTraspaso();
              
      }).catch(rr => console.log(rr)); 
    },
    cerrarVentanaNuevo() {
      this.$refs.formTraspasoNuevo.reset();
      this.dialogNuevo = false;
    },
    cerrarVentana() {
      this.$refs.formTraspasoEdit.reset();
      this.dialogEditar = false;
    },
    cerrarVentanaDelete() {
      this.$refs.formTraspasoDelet.reset(), (this.dialogEliminar = false);
    },
    onClickDeletConfirmacion() {
      (this.dialogEliminarConfirmacion = false), (this.dialogEliminar = true);
    },
    cerrarVentanaConfirmacion() {
      this.dialogEliminarConfirmacion = false;
    },
    async getTraspaso() {
      const response = await get("/traspaso/getAllTraspaso/");
      if (response.error === true) {
        console.log(response);

        return;
      } else {
        console.log(response);
        this.traspaso = response;
      }
    },
    async getHato() {
      //Get Data of Hato
      await axios
        .get("http://localhost:8084/GanaderiaWS/ws/hato/getAllHatoActivo/")
        .then((response) => {
          console.log(response);
          for (let i in response.data) {
            this.hato.push({
              numArete: response.data[i]["numArete"],
              id: response.data[i]["numArete"],
            });
          }
        })
        .catch((e) => console.log(e));
    },
    async getLote() {
      //Get Data of Hato
      await axios
        .get("http://localhost:8084/GanaderiaWS/ws/lote/getAllLoteActivo/")
        .then((response) => {
          console.log(response);
          for (let i in response.data) {
            this.lote.push({
              nombreLote: response.data[i]["nombreLote"],
              id: response.data[i]["idLote"],
            });
          }
        })
        .catch((e) => console.log(e));
    },
    async getMovimientosTraspaso(){
      const response = await get("/traspaso/getAllTraspasoHistorial/");
      if (response.error === true) {
        console.log(response);

        return;
      } else {
        console.log(response);
        this.traspasoDetalle = response;
      }
    }
  },
};
</script>
      
<style>
.colorletra{
    color:rgb(0, 0, 0)
}
</style>