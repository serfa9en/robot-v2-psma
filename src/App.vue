<template>
  <div class="main-div">

    <WaitPromo/>
    <Spinner/>
    <Header/>
    <Content>
      <Unsee/>
      <MeetFace/>
      <Age/>
      <MainView/>
      <SpecialistStart/>
      <SpecialistQuest/>
      <DiseaseMain/>
      <DiseaseQuest/>
      <DiagnosticStart/>
      <MeasurementTemp/>
      <WidthHeight/>
      <ImtMistakeSuccess/>
      <ResultView/>
      <Examination/>
      <ExamResult/>
      <PrintView/>
      <ExitView/>
    </Content>
    <Footer/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import WaitPromo from '@/components/views/WaitPromo'
import Spinner from '@/components/views/Spinner'
import Header from '@/components/global/Header'
import Content from '@/components/global/Content'
import Footer from '@/components/global/Footer'

import MeetFace from '@/components/views/MeetFace'
import Unsee from '@/features/faces/components/Unsee'
import Age from '@/components/views/Age'
import MainView from '@/components/views/MainView'
import DiagnosticStart from '@/components/views/Measurement/Diagnostic_Start'
import MeasurementTemp from '@/components/views/Measurement/Measurement_Temp'
import SpecialistStart from '@/components/views/Specialist/Specialist_Main'
import SpecialistQuest from '@/components/views/Specialist/Specialist_Quest'
import DiseaseMain from '@/components/views/Disease/Disease_Main'
import DiseaseQuest from '@/components/views/Disease/Disease_Quest'
import WidthHeight from '@/components/views/Measurement/Width_Height'
import ResultView from '@/components/views/Measurement/ResultView'
import ImtMistakeSuccess from '@/components/views/Measurement/ImtMistakeSuccess'
import Examination from '@/components/views/FullExam/Examination'
import ExamResult from '@/components/views/FullExam/Exam_Result'
import PrintView from '@/components/views/PrintView'

import ExitView from '@/components/views/Exit'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    WaitPromo,
    Spinner,
    Header,
    Content,
    Footer,

    MeetFace,
    Unsee,
    Age,
    MainView,
    DiagnosticStart,
    MeasurementTemp,
    SpecialistStart,
    SpecialistQuest,
    DiseaseMain,
    DiseaseQuest,
    WidthHeight,
    ImtMistakeSuccess,
    Examination,
    ExamResult,
    ResultView,
    PrintView,

    ExitView
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
    ]),
    ...mapGetters('faces', [
      'getGeneralUser'
    ]),
    ...mapGetters('ui', [
      'getAcquaintanceStatus'
    ])
  },
  methods: {
    ...mapActions('engine', [
      'handlerClickMoveToState'
    ]),
    ...mapActions('robot', [
      'sendFaceRecognizeDelFace',
      'sendDeleteUser'
    ])
  }
}
</script>

<style lang="scss" >
@import './assets/style/styles.scss';
@import './main.css';

p, div, h1 {
  font-family: 'Play', sans-serif;
}

</style>
