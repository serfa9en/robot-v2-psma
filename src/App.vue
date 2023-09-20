<template>
  <div class="main-div">

    <WaitPromo/>
    <Spinner/>
    <!--<Description/>-->
    <Header/>
    <Content>
      <Unsee/>
      <MeetFace/>
      <Age/>
      <MainView/>
      <SpecialistStart/>
      <SpecialistQuest/>
      <DiseaseMain/>
      <OncologyQuest/>
      <DiagnosticStart/>
      <MeasurementTemp/>
      <WidthHeight/>
      <ImtMistakeSuccess/>
      <ResultView/>
      <Examination/>
      <ExamResult/>
      <PrintView/>
      <MailView/>
      <OncologyMain/>
      <Diabetes/>
      <Reflux/>
      <Depression/>
      <Prostatitis/>
      <DiseaseResult/>
      <RecomendView/>
      <QuestionGluko/>
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
import OncologyQuest from '@/components/views/Disease/Oncology_Quest'
import WidthHeight from '@/components/views/Measurement/Width_Height'
import ResultView from '@/components/views/Measurement/ResultView'
import ImtMistakeSuccess from '@/components/views/Measurement/ImtMistakeSuccess'
import Examination from '@/components/views/FullExam/Examination'
import ExamResult from '@/components/views/FullExam/Exam_Result'
import PrintView from '@/components/views/PrintView'
import MailView from '@/components/views/MailView'
import OncologyMain from '@/components/views/Disease/Oncology_Main'
import Diabetes from '@/components/views/Disease/Diabetes'
import Reflux from '@/components/views/Disease/Reflux'
import Depression from '@/components/views/Disease/Depression'
import Prostatitis from '@/components/views/Disease/Prostatitis'
import DiseaseResult from '@/components/views/Disease/Disease_Result'
import RecomendView from '@/components/views/RecomendView'
import QuestionGluko from '@/components/views/QuestionGluko'
// import Description from './components/views/Description'

import ExitView from '@/components/views/Exit'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    WaitPromo,
    Spinner,
    // Description,
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
    WidthHeight,
    ImtMistakeSuccess,
    Examination,
    ExamResult,
    ResultView,
    PrintView,
    MailView,
    OncologyMain,
    OncologyQuest,
    Diabetes,
    Reflux,
    Depression,
    Prostatitis,
    DiseaseResult,
    RecomendView,
    QuestionGluko,

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
