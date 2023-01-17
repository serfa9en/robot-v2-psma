<template>
  <!--
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  -->
  <div class="main-div">

    <WaitPromo/>
    <Header/>
    <Content>
      <MeetFace/>
      <Age/>
      <MainView/>
      <DiagnosticStart/>
      <SpecialistStart/>
      <SpecialistQuest/>
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
import SpecialistStart from '@/components/views/Specialist/Specialist_Start'
import SpecialistQuest from '@/components/views/Specialist/Specialist_Quest'

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
    DiagnosticStart,
    SpecialistStart,
    SpecialistQuest
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
