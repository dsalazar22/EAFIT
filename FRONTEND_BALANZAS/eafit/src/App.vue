<template>
  <div id="app">
    <index></index>
    <appfoooter></appfoooter>

  </div>
</template>

<script>

import index from "./components/index.vue";
import appfoooter from "./components/footer.vue"
// import ChatChatbox from "./components/ChatChatbox.vue";
export default {
  name: "App",
  components: {
    index,
    appfoooter
    // ChatChatbox,
  },
  data() {
    return {

    };
  },
  methods: {
    getLayoutFooterBg () {
      return `bg-${this.layoutFooterBg}`
    }
  },
};
</script>

<style>
#app{
  font-family: 'Roboto', sans-serif;
}
</style>


