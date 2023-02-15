<template >
  <div class="text-center">
    <notifications group="notifications-default" />
    <h4 class="mt-4 font-weight-bold py-2 mb-0">BASCULAS FABRICA DE APRENDIZAJE EAFIT</h4>
    <h5 class="mt-2 mb-3 font-weight-bold py-3 mb-0">INFORMACIÓN EN TIEMPO REAL</h5>

    <!-- INICIO CARDS -->
    <b-card class="m-3" border-variant="dark">

      <!-- FILA 1 -->
      <div class="row m-3">
        <div class="col">
          <b-card :header-bg-variant="items[0].bgColor" :header-text-variant="items[0].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">

            <template #header>
              <h6>BASCULA #1</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>UNIDADES: <span id="spanCards">{{ items[0].weight }} </span></h6>
              </div>

            </b-card-text>

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
          <b-card :header-bg-variant="items[1].bgColor" :header-text-variant="items[1].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">

            <template #header>
              <h6>BASCULA #2</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[1].weight }}</span></h6>
              </div>
              
            </b-card-text>

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
          <b-card :header-bg-variant="items[2].bgColor" :header-text-variant="items[2].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">

            <template #header>
              <h6>BASCULA #3</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[2].weight }}</span></h6>
              </div>
            </b-card-text>

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
          <b-card :header-bg-variant="items[3].bgColor" :header-text-variant="items[3].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">

            <template #header>
              <h6>BASCULA #4</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[3].weight }}</span></h6>
              </div>

            </b-card-text>

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
          <b-card :header-bg-variant="items[4].bgColor" :header-text-variant="items[4].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">

            <template #header>
              <h6>BASCULA #5</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[4].weight }}</span></h6>
              </div>
        
            </b-card-text>

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
          <b-card :header-bg-variant="items[5].bgColor" :header-text-variant="items[5].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">
            <template #header>
              <h6>BASCULA #6</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[5].weight }}</span></h6>
              </div>
            
            </b-card-text>

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
          <b-card :header-bg-variant="items[6].bgColor" :header-text-variant="items[6].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">
            <template #header>
              <h6>BASCULA #7</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[6].weight }}</span></h6>
              </div>
         
            </b-card-text>

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
          <b-card :header-bg-variant="items[7].bgColor" :header-text-variant="items[7].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">
            <template #header>
              <h6>BASCULA #8</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[7].weight }}</span></h6>
              </div>
  
            </b-card-text>

            <template #footer>
              <b-progress >
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
          <b-card :header-bg-variant="items[8].bgColor" :header-text-variant="items[8].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">
            <template #header>
              <h6>BASCULA #9</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[8].weight }}</span></h6>
              </div>
     
            </b-card-text>

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
          <b-card :header-bg-variant="items[9].bgColor" :header-text-variant="items[9].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">
            <template #header>
              <h6>BASCULA #10</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[9].weight }}</span></h6>
              </div>
     
            </b-card-text>

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
          <b-card :header-bg-variant="items[10].bgColor" :header-text-variant="items[10].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">
            <template #header>
              <h6>BASCULA #11</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[10].weight }}</span></h6>
              </div>
  
            </b-card-text>

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
          <b-card :header-bg-variant="items[11].bgColor" :header-text-variant="items[11].fontColor" border-variant="dark" 
          header-border-variant="dark" footer-border-variant="dark">

            <template #header>
              <h6>BASCULA #12</h6>
            </template>

            <b-card-text>
              <div class="input-group">
                <h6>PESO: <span id="spanCards">{{ items[11].weight }}</span></h6>
              </div>
  
            </b-card-text>

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
    </b-card>
    <!-- FIN CARDS -->

    <!-- INICIO BOTON CONSULTAR -->
    <div class="input-group ml-5 mt-4 mb-3">
      <h6 class="mt-2">CONSULTAR INFORMACIÓN:</h6>
      <button class="btn btn-primary ml-2" @click.prevent="openModalConsultScale">CONSULTAR</button>
    </div>
    <!-- FIN BOTON CONSULTAR -->



    <!-- INICIO MODAL CONSULTAR BASCULA -->
    <b-modal v-model="modalConsultScale">
      <div slot="modal-header-close">
        <i class="ion ion-md-close" @click.prevent="closeModalConsultScale()"></i>
      </div>

      <div slot="modal-title">
        <h4>OBTENER INFORMACIÓN</h4>
      </div>
      <div>

        <h6 class="mt-1 ml-3">Ingrese el numero de la bascula:</h6>
        <div class="input-group ml-3">
          <input class="" type="text" v-model="idBalance">
          <button class="btn btn-primary ml-2" @click.prevent="getBalance()">CONSULTAR</button>
        </div>

        <div class="container">

          <h5 class="mt-3">INFORMACIÓN:</h5>
          <div class="mt-3">
            <div class=" input-group">
              <h6>IP: </h6>
              <span id="s1" class="ml-2 mb-1">{{ infoBalance.ip }}</span>
            </div>
            <div class=" input-group">
              <h6>PESO:</h6>
              <span id="s1" class="ml-2 mb-1"> {{ infoBalance.weight }}</span>
            </div>
            <div class=" input-group">
              <h6>ESTADO:</h6>
              <span id="s1" class="ml-2 mb-2">{{ infoBalance.status }}</span>
            </div>
          </div>

        </div>

      </div>

      <div slot="modal-footer">
        <button @click.prevent="closeModalConsultScale()" class="btn btn-danger">Cerrar</button>
      </div>
    </b-modal>
    <!-- FIN MODAL CONSULTAR BASCULA  -->


  </div>
</template>




<script>
import Vue from "vue"
import io from "socket.io-client";
import { infobalance } from "./js/balance";
import Notifications from 'vue-notification'

Vue.use(Notifications)


export default {
  name: "Index",



  components: {
    // ChatChatbox,
  },

  data() {
    return {
      //BARRA DE PROGRESO CARD
      maxProgressBar: 3000,
      valueProgressBar: 1500,

      //MODAL CONSULT SCALE
      modalConsultScale: false,

      socket: null,
      serverUrl: "ws://127.0.0.1:3333",
      balances: "",


      idBalance: "",
      infoBalance: "",

      columns: [
        { key: "number", label: "NUMERO" },
        { key: "ip", label: "DIRECCION IP" },
        { key: "weight", label: "PESO" },
        { key: "status", label: "ESTADO" }
      ],
        //INFORMACION DE LAS BASCULAS
      items: [
        { number: "1", id: "201", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "2", id: "202", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white"},
        { number: "3", id: "203", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "4", id: "204", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "5", id: "205", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "6", id: "206", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "7", id: "207", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "8", id: "208", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "9", id: "209", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "10", id: "210", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "11", id: "211", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
        { number: "12", id: "212", ip: "", weight: "0.0", units:"",status: "INACTIVA", bgColor: "danger", fontColor: "white" },
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
    restarItems() {
      this.showCustom("bg-danger", "¡CONEXION PERDIDA!", "Se ha perdido la conexion, revise el servidor");
      //console.log("entro")
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].ip = ""
        this.items[i].weight = "0.0"
        this.items[i].status = "INACTIVA"
        this.items[i].bgColor = "danger"
      }

    },


    //SOCKETIO TIEMPO REAL
    async connectToWebsocket() {
      this.socket = io(this.serverUrl, {
        transports: ["websocket"]
      });
    },

    realTimeInformation() {
      this.socket.on("get-basculas", (message) => {
        if (message) {
          //console.log(message)

          this.balances = JSON.parse(message)
          console.log(this.balances)
          //console.log("a",this.items.length)
          for (let i = 0; i < this.items.length; i++) {
            //console.log(JSON.parse(this.balances))
            if (this.balances.ip.includes(this.items[i].id)) {
              this.items[i].ip = this.balances.ip
              this.items[i].weight = this.balances.weight
              this.items[i].status = this.balances.status
              this.items[i].bgColor = "success"
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

    //CONSULTAR BALANZA ESPECIFICA
    //OBTENER BASCULAS
    getBalance() {
      let info = {}
      try {
        //console.log(this.idBalance)
        info.number = this.idBalance.toString()
        console.log(info)

        infobalance.getinfobalance(info).then(data => {
          console.log(data)
          this.infoBalance = data.data
        })
      } catch (error) {
        this.showCustom("bg-danger", "¡CONEXION PERDIDA!", "Se ha perdido la conexion, revise el servidor");
      }
    },

    openModalConsultScale() {
      this.modalConsultScale = true
    },

    closeModalConsultScale() {
      this.modalConsultScale = false
      this.infoBalance = ""
      this.idBalance = ""
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
</style>
