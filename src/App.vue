<template>
<div>
      <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorldVue from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    'hello-world': HelloWorldVue
  },
  data() {
    return {
      
    }
  },
  methods: {
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
