<template >
  <div class="text-center">
    <notifications group="notifications-default" />
    <div class="row justify-content-between">
      <div class="col-auto ml-4 mt-1">
        <img id="logo-eafit" src="../assets/img/eafit-logo.png" alt="">
      </div>
      <div class="col">
        <div class="display-3 mt-4">Pick to Light </div>
        <div>TIEMPO REAL</div>
      </div>
      <div class="col-auto mr-4 mt-5">
        <img id="logo-syncbox" src="../assets/img/logosbx.png" alt="">
      </div>
    
    </div>

    <!--INICIO MENSAJE -->
    <div class="row">
        <div class="col" v-show="false">

        </div>
        
    <!-- FIN MENSAJE -->

    <!-- INICIO CARDS BASCULAS-->
    <!-- <b-card class="" border-variant="dark" > -->

      <!-- FILA 1 -->
      <div class="col">
      <div class="row m-3">
        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[0].bgColor" :header-text-variant="items[0].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">

            <template #header>
              <div @click="openModalScale('Bascula #1')" id="btn-scale">
                
                  <h6>Bascula #1</h6>
                
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[0].units }}
              </div>
              <h5>{{ items[0].product }}</h5>

            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[0].weight" show-progress
                :max="maxProgressBar" animated></b-progress-bar>
              </b-progress>
              <small class="text-muted float-left">Peso actual: {{ items[0].weight }}g</small>
              <small class="text-muted float-right">Maximo 3000g</small>
            </template>

          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[1].bgColor" :header-text-variant="items[1].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">

            <template #header>
              <div @click="openModalScale('Bascula #2')" id="btn-scale">
              <h6>Bascula #2</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[1].units }}
              </div>

              <h5>{{ items[1].product }}</h5>
              
            </div>

            <template #footer>
              <b-progress>
                <b-progress-bar variant="primary" :value="items[1].weight" show-progress
                  :max="maxProgressBar" animated></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual:{{ items[1].weight }}g</small>
            </template>

          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[2].bgColor" :header-text-variant="items[2].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">

            <template #header>
              <div @click="openModalScale('Bascula #3')" id="btn-scale">
              <h6>Bascula #3</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[2].units }}
              </div>
              <h5>{{ items[2].product }}</h5>

            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[2].weight" 
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{ items[2].weight }}g</small>
            </template>

          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[3].bgColor" :header-text-variant="items[3].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">

            <template #header>
              <div @click="openModalScale('Bascula #4')" id="btn-scale">
              <h6>Bascula #4</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[3].units }}
              </div>
              <h5>{{ items[3].product }}</h5>


            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[3].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual:{{ items[3].weight }}g</small>
            </template>

          </b-card>
        </div>
      </div>


      <!-- FILA 2 -->
      <div class="row m-3">
        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[4].bgColor" :header-text-variant="items[4].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">

            <template #header>
              <div @click="openModalScale('Bascula #5')" id="btn-scale">
              <h6>Bascula #5</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[4].units }}
              </div>
              <h5>{{ items[4].product }}</h5>

        
            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[4].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{ items[4].weight }}g</small>
            </template>

          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[5].bgColor" :header-text-variant="items[5].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">
            <template #header>
              <div @click="openModalScale('Bascula #6')" id="btn-scale">
              <h6>Bascula #6</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[5].units }}
              </div>
              <h5>{{ items[5].product }}</h5>

            
            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[5].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{ items[5].weight }}g </small>
            </template>

          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[6].bgColor" :header-text-variant="items[6].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">
            <template #header>
              <div @click="openModalScale('Bascula #7')" id="btn-scale">
              <h6>Bascula #7</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[6].units }}
              </div>
              <h5>{{ items[6].product }}</h5>
      
            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[6].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{ items[6].weight }}g</small>
            </template>

          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[7].bgColor" :header-text-variant="items[7].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">
            <template #header>
              <div @click="openModalScale('Bascula #8')" id="btn-scale">
              <h6>Bascula #8</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[7].units }}
              </div>
              <h5>{{ items[7].product }}</h5>

  
            </div>

            <template #footer>
              <b-progress>
                <b-progress-bar variant="primary" :value="items[7].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{ items[7].weight }}g</small>
            </template>

          </b-card>
        </div>
      </div>

      <!-- FILA 3 -->
      <div class="row m-3">
        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[8].bgColor" :header-text-variant="items[8].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">
            <template #header>
              <div @click="openModalScale('Bascula #9')" id="btn-scale">
              <h6>Bascula #9</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[8].units }}
              </div>
              <h5>{{ items[8].product }}</h5>

            </div>

            <template #footer>
              <b-progress>
                <b-progress-bar variant="primary" :value="items[8].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{items[8].weight}}g</small>
            </template>

          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[9].bgColor" :header-text-variant="items[9].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">
            <template #header>
              <div @click="openModalScale('Bascula #10')" id="btn-scale">
              <h6>Bascula #10</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[9].units }}
              </div>
              <h5>{{ items[9].product }}</h5>
      
            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[9].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{ items[9].weight }}g</small>
            </template>

          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[10].bgColor" :header-text-variant="items[10].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">
            <template #header>
              <div @click="openModalScale('Bascula #12')" id="btn-scale">
              <h6>Bascula #11</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[10].units }}
              </div>
              <h5>{{ items[10].product }}</h5>
              

  
            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[10].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{ items[10].weight }}g</small>
            </template>
          </b-card>
        </div>

        <div class="col">
          <b-card class="shadow" no-body :header-bg-variant="items[11].bgColor" :header-text-variant="items[11].fontColor" :border-variant="items[0].bgColor" 
          :header-border-variant="items[0].bgColor" :footer-border-variant="items[0].bgColor">

            <template #header>
              <div @click="openModalScale('Bascula #12')" id="btn-scale">
              <h6>Bascula #12</h6>
              </div>
            </template>

            <div>
              <div class="text-center display-3">
                {{ items[11].units }}
              </div>
              <h5>{{ items[11].product }}</h5>

  
            </div>

            <template #footer>
              <b-progress >
                <b-progress-bar variant="primary" :value="items[11].weight"
                :max="maxProgressBar" animated show-progress></b-progress-bar>
              </b-progress>
              <small class="text-muted float-right">Maximo 3000g</small>
              <small class="text-muted float-left">Peso actual: {{ items[11].weight }}g</small>
            </template>

          </b-card>
        </div>
      </div>
    <!-- </b-card> -->

    <!-- INICIO MODAL DE CADA BASCULA -->
      <b-modal v-model="showModalScale" size="lg">
        <template #modal-title>
          {{ titleModal }}
        </template>
        <div>
          <h6>Seleccione un producto:</h6>

          <multiselect v-model="value" :options="items"
          :searchable="true" :show-labels="false" placeholder="Productos disponibles...">



          </multiselect>
        </div>

        <template #modal-footer>
          <div class="input-group" style="margin-left: 62%;">
            <button class="btn btn-primary mr-2">Guardar</button>
            <button class="btn btn-danger" @click="closeModalScale()">Cerrar</button>
          </div>
          
        </template>
      </b-modal>
    <!-- FIN MODAL DE CADA BASCULA -->
  </div>
      </div>

  </div>
</template>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import Vue from "vue"
import io from "socket.io-client";
import Notifications from 'vue-notification'
import Multiselect from 'vue-multiselect'


Vue.use(Notifications)


export default {
  name: "Index",

  components: {
    // ChatChatbox,
    Multiselect,
  },

  data() {
    return {
      //MODAL BASCULAS
      titleModal:"",
      showModalScale: false,
      value:null,

      //BARRA DE PROGRESO CARD
      maxProgressBar: 3000,
      valueProgressBar: 1500,

      //MODAL CONSULT SCALE
      modalConsultScale: false,

      socket: null,
      serverUrl: "ws://192.168.25.52:3333",
      //balances: "",


      idBalance: "",
      infoBalance: "",

      columns: [
        { key: "number", label: "NUMERO" },
        { key: "ip", label: "DIRECCION IP" },
        { key: "weight", label: "PESO" },
        { key: "status", label: "ESTADO" }
      ],
        //INFORMACION DE LAS BASCULAS
      nameScales:[
        {scale:"BASCULA #1"},
        {scale:"BASCULA #2"},
        {scale:"BASCULA #3"},
        {scale:"BASCULA #4"},
        {scale:"BASCULA #5"},
        {scale:"BASCULA #6"},
        {scale:"BASCULA #7"},
        {scale:"BASCULA #8"},
        {scale:"BASCULA #9"},
        {scale:"BASCULA #10"},
        {scale:"BASCULA #11"},
        {scale:"BASCULA #12"},
    ],

      items: [
        { number: "1", id: "201", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white" },
        { number: "2", id: "202", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white"},
        { number: "3", id: "203", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white" },
        { number: "4", id: "204", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white" },
        { number: "5", id: "205", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white" },
        { number: "6", id: "206", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white" },
        { number: "7", id: "207", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white" },
        { number: "8", id: "208", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white" },
        { number: "9", id: "209", ip: "", weight: "0.0", units:"0",status: "INACTIVA", product:"------" ,bgColor: "danger", fontColor: "white" },
        { number: "10", id: "210", ip: "", weight: "0.0", units:"0",status: "INACTIVA",product:"------" , bgColor: "danger", fontColor: "white" },
        { number: "11", id: "211", ip: "", weight: "0.0", units:"0",status: "INACTIVA",product:"------" , bgColor: "danger", fontColor: "white" },
        { number: "12", id: "212", ip: "", weight: "0.0", units:"0",status: "INACTIVA",product:"------" , bgColor: "danger", fontColor: "white" },
      ]
    };
  },

  created() {
    document.title = "BASCULAS EAFIT"

    this.connectToWebsocket();

    this.realTimeInformation()

  
  },
  mounted() {
    //this.showCustom("bg-danger","Hola","h");
  },
  methods: {
    // ------------------------------------------------------------------------------------------------------------------------------------
    //INICIO PRODUCTOS 
    
    // FIN PRODUCTOS
    // ------------------------------------------------------------------------------------------------------------------------------------


    //---------------------------------------------------------------------------------------------------------------------------------------------------
    // INICIO MODAL BASCULAS
    openModalScale(text){
      this.titleModal = text

      this.showModalScale = true
    },

    closeModalScale(){
      this.showModalScale = false
    },
    // FIN MODAL BASCULAS
    //---------------------------------------------------------------------------------------------------------------------------------------------------


    restarItems() {
      this.showCustom("bg-danger", "??CONEXION PERDIDA!", "Se ha perdido la conexion, revise el servidor");
      //console.log("entro")
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].ip = ""
        this.items[i].weight = "0.0"
        this.items[i].status = "INACTIVA"
        this.items[i].bgColor = "danger"
        this.items[i].units = "0"
        this.items[i].product = "------"
      }

    },


    //SOCKETIO TIEMPO REAL
    async connectToWebsocket() {
      this.socket = io(this.serverUrl, {
        transports: ["websocket"]
      });
    },

    realTimeInformation() {
      //console.log("a")
      this.socket.on("get-basculas", (message) => {
        if (message) {
          console.log(message)

          let balances = JSON.parse(message)
          console.log(balances)
          console.log("a",this.items.length)
          for (let i = 0; i < this.items.length; i++) {
            //console.log(JSON.parse(this.balances))
            if (balances.ip.includes(this.items[i].id)) {
              if(balances.weight != "")
              {
              this.items[i].ip = balances.ip
              this.items[i].weight = balances.weight
              this.items[i].status = balances.status
              this.items[i].product = balances.product
              this.items[i].bgColor = "success"
              if(balances.unitWeight != ""){
                this.items[i].units = (balances.weight / balances.unitWeight).toFixed(0)
              } else {
                this.items[i].units = 0
                this.items[i].product = "-----"
              }
            }
              //this.items[i].units = (parseInt(this.balances.weight) / parseInt(this.balances.unitWeight))
              //console.log(this.items[i])
            }
          }
        }

      });
      this.socket.on("disconnect", () => {

        //console.log("entroo")
        this.restarItems()


      });
    },

    showCustom: function (classes, title, text) {
      this.$notify({
        group: "notifications-default",
        type: classes,
        title: title,
        text: text,
      });
    },
  },

};

</script>


<style>

.table .table-danger,
.table .table-danger>th,
.table .table-warning>td {
  border-color: rgba(0, 0, 0, 0.035) !important;
  background-color: #d9534f;
  color: #f7f7f7;
}

.table .table-success,
.table .table-success>th,
.table .table-warning>td {
  border-color: rgba(0, 0, 0, 0.035) !important;
  background-color: #5cb86a;
  color: #f7f7f7;
}

#s1 {
  margin-top: -0.8%;
  color: rgb(53, 53, 53);
}

#spanCards {
  margin-top: -0.8%;
  font-weight: normal;
}

#logo-eafit{
  margin-right: 80%;
  width: 170px;
  padding: 0;
}
#logo-syncbox{
  width: 200px;
  padding: 0;
}
#btn-scale{
  cursor: pointer;
}


</style>
