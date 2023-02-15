<template>
  <nav class="layout-footer footer" :class="getLayoutFooterBg()">
    <div class="container-fluid container-p-x pb-3 text-center">
      <a href="http://www.smgsoftware.com" class="footer-link pt-3" target="_blank">SMG SOFTWARE S.A.S</a>
      <br>
      <b-btn size="xs" variant="outline-success borderless" @click="logout"><i class="ion ion-ios-log-out"></i> &nbsp; Salir</b-btn size="xl">
      <!-- <a href="#" class="footer-link pt-3 ml-4">Link 2</a> -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-layout-footer',

  methods: {
    getLayoutFooterBg () {
      return `bg-${this.layoutFooterBg}`
    },

    logout: function(){
        localStorage.removeItem('syncbox.cloud')
        this.$router.push(this.$route.query.redirect || '/login')
    }
  }
}
</script>
