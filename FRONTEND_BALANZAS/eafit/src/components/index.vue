<template >
  <div class="text-center">
    <notifications group="notifications-default" />
    <div class="row justify-content-between">
      <div class="col-auto ml-4 mt-1">
        <img id="logo-eafit" src="../assets/img/eafit-logo.png" alt="">
      </div>
      <div class="col">
        <h4 class="mt-4 font-weight-bold py-2 mb-0">BASCULAS FABRICA DE APRENDIZAJE EAFIT</h4>
        <h5 class="mt-2 mb-3 font-weight-bold py-3 mb-0">INFORMACIÓN EN TIEMPO REAL</h5>
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
              <h6>BASCULA #1</h6>
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
              <h6>BASCULA #2</h6>
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
              <h6>BASCULA #3</h6>
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
              <h6>BASCULA #4</h6>
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
              <h6>BASCULA #5</h6>
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
              <h6>BASCULA #6</h6>
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
              <h6>BASCULA #7</h6>
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
              <h6>BASCULA #8</h6>
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
              <h6>BASCULA #9</h6>
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
              <h6>BASCULA #10</h6>
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
              <h6>BASCULA #11</h6>
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
              <h6>BASCULA #12</h6>
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
  </div>
      </div>

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
    restarItems() {
      this.showCustom("bg-danger", "¡CONEXION PERDIDA!", "Se ha perdido la conexion, revise el servidor");
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
      this.socket.on("get-basculas", (message) => {
        if (message) {
          //console.log(message)

          let balances = JSON.parse(message)
          console.log(balances)
          //console.log("a",this.items.length)
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
                this.items[i].product = "##############"
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

#logo-eafit{
  margin-right: 80%;
  width: 170px;
  padding: 0;
}
#logo-syncbox{
  width: 200px;
  padding: 0;
}


</style>
