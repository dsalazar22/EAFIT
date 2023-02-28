<template>
  <!-- <div class="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style="background-image: url('/static/imgs/1.jpg');"> -->
  <div class="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4"
    style="background: #000 ">
    <!-- <div class="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" > -->
    <div class="ui-bg-overlay bg-dark opacity-25"></div>

    <div class="authentication-inner py-5" style="max-width: 680px;">
      <b-card no-body>
        <div class="p-4 p-sm-5">
          <!-- Logo -->
          <div class="d-flex justify-content-center align-items-center pb-2 mb-4">
            <div style="width:30%">
              <img :src="require('@/assets/imgs/logosbx.png')" class="img-fluid">
            </div>
          </div>
          <!-- / Logo -->
          <!-- <h5 class="text-center text-muted font-weight-normal mb-4">Bienvenido a SyncBox i4.0</h5> -->
          <b-row class="mb-2">
            <b-col class="col input-group ml-4">
            <h5 class="font-weight-bold">Estacion Anterior: {{ previuosStation }}</h5>
            </b-col>
            <b-col class="col input-group">
            <h5 class="font-weight-bold">Estacion Siguiente: {{ nextStation }}</h5>
            </b-col>
        </b-row>



          <div>
            <div class="row mb-4">
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(1)">ESTACIÓN 1</b-btn>
              </div>
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(2)">ESTACIÓN 2</b-btn>
              </div>
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(3)">ESTACIÓN 3</b-btn>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(4)">ESTACIÓN 4</b-btn>
              </div>
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(5)">ESTACIÓN 5</b-btn>
              </div>
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(6)">ESTACIÓN 6</b-btn>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(7)">ESTACIÓN 7</b-btn>
              </div>
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(8)">ESTACIÓN 8</b-btn>
              </div>
              <div class="col-4">
                <b-btn variant="primary" block @click="infoCar(9)">ESTACIÓN 9</b-btn>
              </div>
            </div>
          </div>

        </div>
        <b-card-footer class="py-3 px-4 px-sm-5">
          <div class="text-center">

            <div class="input-group">
              <input type="number" class="mr-2" v-model="timeWait">
              <button class="btn btn-primary" @click.prevent="sendTimeWait()">CAMBIAR TIEMPO DE ESPERA</button>
            </div>

            <div class="input-group mt-4">
              <h5 class="font-weight-bold">Tiempo de espera actual: <span style="font-weight: normal;">{{ timeWait }}</span></h5>
            </div>
          </div>
        </b-card-footer>
      </b-card>
    </div>
    <notifications group="notifications-custom-template" :duration="5000" animation-name="v-fade-left"
      position="bottom right">
      <template v-slot:cell(body)="row">
        <div :class="messageClass" @click="row.close">
          <div class="media align-items-center w-100">
            <div class="mr-3">
              <i :class="messageIcons" style="font-size: 250%;"></i>
            </div>
            <div class="media-body">
              <strong>{{ row.item.title }}</strong><br>
              {{ row.item.text }}
            </div>
          </div>
        </div>
      </template>
    </notifications>
  </div>
</template>
<style src="@/vendor/libs/vue-notification/vue-notification.scss" lang="scss">

</style>
<style src="@/vendor/libs/vue-toasted/vue-toasted.scss" lang="scss">

</style>
<!-- Page -->
<style src="@/vendor/styles/pages/authentication.scss" lang="scss">

</style>
<style>
.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all .5s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-500px) scale(0.2);
}
</style>
<script>
import Vue from "vue";
// import VeeValidate from "vee-validate";
import axios from "axios";
import VueResource from "vue-resource"

import Notifications from 'vue-notification'
import Toasted from 'vue-toasted'



Vue.use(Notifications)
Vue.use(Toasted)

// Vue.use(VeeValidate, {
//   fieldsBagName: "formFields" // fix issue with b-table
// });
Vue.use(VueResource);

export default {
  metaInfo: {
    title: "Login"
  },
  data: () => ({
    name: 'Login',
    version: 'v1.0.0.0',

    timeWait:5,

    previuosStation:"",
    nextStation:"",

    credentials: {
      // email: "syncbox",
      // password: "123456"
      email: "",
      password: ""
    },
    messageClass: "",
    messageIcons: "",
  }),
  mounted(){
    setInterval(() => {
      axios.get('http://10.203.13.250:8000/EAFIT/status/estacion').then( data => {
        console.log(data.data)
        this.previuosStation = data.data.anterior
        this.nextStation = data.data.siguiente

        if(this.previuosStation == "-1"){
          this.previuosStation = ""
        }
        if(this.nextStation == "-1"){
          this.nextStation = ""
        }
      })
    }, 5000)
  },
  methods: {

    //ENDPOINT EAFIT 10.203.13.250

    async sendTimeWait() {
        await axios.post('http://10.203.13.250:8000/EAFIT/timewait',{"timewait":this.timeWait})
          .then(response => {
            if(response.status == 200){
              this.$notify({
              group: 'notifications-custom-template',
              title: 'ENVIADO',
              text: 'Tiempo actualizado con exito!',
              type: 'success'
            })
            }
          })
    },

    async infoCar(id) {
      console.log("ID BUTTON:", id)

      await axios.post('http://10.203.13.250:8000/EAFIT/estacion',{"peticion":id})
        .then(response => {
          if(response.status == 200){
            this.$notify({
              group: 'notifications-custom-template',
              title: 'ENVIADO',
              text: 'Info Enviada con Éxito!',
              type: 'success'
            })
          }
        })
        .catch(e => {
          this.$notify({
            group: 'notifications-custom-template',
            title: 'Error Validación',
            text: 'La información se ha enviado',
            type: 'error'
          })
        });
      return;
    }
  },
};
</script>

<style>
.btn{
  background-color:  #ec640e ;
  
}

.btn:hover{
  background-color: black;
}


</style>