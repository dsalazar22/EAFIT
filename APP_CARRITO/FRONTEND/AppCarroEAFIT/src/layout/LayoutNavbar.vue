<template>
 <!-- <sidenav orientation="horizontal" :showDropdownOnHover="true" class="bg-secondary text-light" style="position: relative;z-index: 99"> -->
      <div class="text-center">
        <b-navbar-brand to="/">
          <img :src="require('@/assets/imgs/logosbx.png')" class="img-responsive mt-1 mb-0" width="115" alt="Responsive image" />
        </b-navbar-brand>
        <!-- <sidenav-menu icon="ion ion-md-people" :active="isMenuActive('/rt')">
          <template slot="link-text">Operación</template>
          <sidenav-link href="/rt/prioridades">Prioridades</sidenav-link>
          <sidenav-link href="/rt/consultarqr">Consultar QR</sidenav-link>
          <sidenav-link href="/rt/consultarop">Consultar OP</sidenav-link>
        </sidenav-menu> -->
        <!-- <sidenav-menu icon="ion ion-md-contact" :active="isMenuActive('/rt')">
          <template slot="link-text">Usuarios</template>
          <b-dd-item @click="logout"><i class="ion ion-ios-log-out"></i> &nbsp; Log Out</b-dd-item>
        </sidenav-menu> -->
      </div>
    <!-- </sidenav> -->
</template>

<script>
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'
import axios from "axios";
import { create } from 'ladda';
export default {

  name: 'app-layout-navbar',
  components: {
    Sidenav,
    SidenavLink,
    SidenavRouterLink,
    SidenavMenu,
    SidenavHeader,
    SidenavBlock,
    SidenavDivider
  },
  data: () => ({
    sidenav1Collapsed: false,
    sidenav2Collapsed: false,
    sidenav3Collapsed: false,
    sidenav4Collapsed: false,
    sidenav5Collapsed: false,
    sidenav6Collapsed: false,
  }),
  methods: {
    isMenuActive (url) {
      return this.$route.path.indexOf(url) === 0
    },
    logout: function(){
        localStorage.removeItem('syncbox.cloud')
        this.$router.push(this.$route.query.redirect || '/login')
    }
  },
     beforeCreate() {
         if(localStorage.getItem('syncbox.cloud') == null)
            this.$router.push(this.$route.query.redirect || '/login')
   },

   create:function(){

      axios.get(`https://usuarios.creatum.com.co/validate/Creatum/Plataforma`,{headers: {'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token}}
      )
      .then(response => {
        
        if(response.data.status === "Authorized")
        {
          // console.log(response)
        }

      })
      .catch(e => {
        localStorage.setItem('syncbox.cloud', JSON.stringify(response.data));
                            this.$router.push(this.$route.query.redirect || '/')
      });
   }
}
</script>
<style>
.sidenav.bg-secondary {
    background-color: #FF6600 !important;
    color: #cbf1e3;
}
.sidenav-item.bg-success {
    background-color: #FF6600 !important;
    color: #cbf1e3;
}


</style>