<template>
  <!--
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  -->
  <div id="app" class="main-div">

    <WaitPromo/>
    <Header/>
    <Content>
      <MeetFace/>
      <Age/>
      <MainView/>
      <DiagnosticStart/>
    </Content>
    <Footer/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import WaitPromo from '@/components/views/WaitPromo'
import Header from '@/components/global/Header'
import Content from '@/components/global/Content'
import Footer from '@/components/global/Footer'

import MeetFace from '@/components/views/MeetFace'
import Age from '@/components/views/Age'
import MainView from '@/components/views/MainView'
import DiagnosticStart from '@/components/views/Diagnostic_Start'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    // HelloWorld
    WaitPromo,
    Header,
    Content,
    Footer,

    MeetFace,
    Age,
    MainView,
    DiagnosticStart
  },
  data () {
    return {
      open: 0
    }
  },
  watch: {
    getStep (val) {
      this.open = 0
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ])
  }
}
</script>

<style lang="scss" >
@import './main.css';

</style>
