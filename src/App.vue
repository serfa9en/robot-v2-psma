<template>
  <!--
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  -->
  <div id="app" class="main-div">
    <!--<WaitPromo/>-->
    <Header/>
    <Content>
      <Age/>
    </Content>
    <Footer/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import WaitPromo from '@/components/WaitPromo'
import Header from '@/components/global/Header'
import Content from '@/components/global/Content'
import Footer from '@/components/global/Footer'

import Age from '@/components/views/Age'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // WaitPromo,
    Header,
    Content,
    Footer,

    Age
  }
}
</script>

<style lang="scss" >
@import './main.css';

</style>
