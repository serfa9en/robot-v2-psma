<template>
  <div v-if="showComponent" class="measurement">
      <transition name="fade">
          <div v-if="typeScreen === 0">
              <div class="container">
                  <div>
                      <h3 v-if="h3 !== null" v-html="h3"></h3>
                      <p v-if="p !== null" v-html="p"></p>
                      <div class="container__wrapper">
                          <button class="btn btn-dark-grad" v-if="btn !== null" @click="doBtnAction(btnAction)"
                                  :style="buttonStyle">
                              {{ btn }}
                          </button>
                          <button class="btn btn-dark-grad" v-if="btn_1 !== null" @click="doBtnAction(btnAction_1)"
                                  :style="buttonStyle">
                              {{ btn_1 }}
                          </button>
                      </div>
                      <p class="hint" v-if="hint !== null" :style="hintStyle" v-html="hint"></p>
                  </div>
                  <div v-if="rightHtml !== null" v-html="rightHtml"></div>
                  <Loader
                          v-if="rightLoad"
                          :styles="ldsBigLoaderStyles"
                          :content="ldsBigLoaderContent"
                  />
              </div>
          </div>
      </transition>

      <transition name="fade">
          <div class="result" v-if="typeScreen === 1">
              <p>Результат:</p>
              <div class="container">
                  <div :key="index" v-for="(data, index) in getMeasuredData.filter(item => !item.hidden)">
                      <div>
                          <div v-html="data.image"/>
                          <div>
                              <p v-html="data.text"></p>
                              <h3 v-html="getData(data.data, data.name)"></h3><span v-if="typeof data.dopText !== 'undefined'" v-html="data.dopText"></span>
                              <h4 v-html="getDopData(data.data, data.name)"></h4>
                          </div>
                      </div>
                  </div>
              </div>
              <button
                      :key="index"
                      v-for="(data, index) in resultActions.filter(action => typeof action.hasBtn === 'undefined' || action.hasBtn === true)"
                      class="btn"
                      :style="buttonStyle"
                      :id="(typeof data.id !== 'undefined' ? data.id : false)"
                      :disabled="data.active === false || (typeof data.isActiveTimer !== 'undefined' && activeTimer !== null)"
                      @click="resultAction(data.action)">
                  <span v-html="btnName(data.name, data.isActiveTimer)"></span>
                  <Loader
                          v-if="activeTimer === true && (typeof data.isActiveTimer !== 'undefined' && activeTimer !== null)"
                          :styles="ldsLoaderStyles"
                  />
              </button>
          </div>
      </transition>

      <transition name="fade">
          <div v-if="typeScreen === 2" class="questions">
              <div>
                  <p>{{ p }}</p>
              </div>
              <div>
                  <button v-for="(data, index) in btnAction"
                          :key="index"
                          :id="(typeof data.id !== 'undefined' ? data.id : false)"
                          class="btn"
                          :style="buttonStyle"
                          v-text="data.name"
                          @click="saveAnswer(data.action)">
                  </button>
              </div>
          </div>
      </transition>

      <transition name="fade">
          <div v-if="typeScreen === 3 && getUserSpirographia !== null" class="resultSpirographia">
              <div>
                  <h3>{{ h3 }}</h3>
                  <p>{{ p }}</p>
                  <div class="resultSpirographiaDiv">
                      <div :data-result="resultSpirographiaColor(getSpirigraphiaDataSource(getUserGrowth, getUserAge, getUserGender, 'FVC'), 'FVC')"
                           @click="whatIs('FVC')">
                          <table>
                              <tr>
                                  <td colspan="2"><p>FVC</p></td>
                              </tr>
                              <tr>
                                  <td><h2>{{ getUserSpirographia['FVC'] }} <span>л</span></h2></td>
                                  <td><h2>{{ getSpirigraphiaDataSource(getUserGrowth, getUserAge, getUserGender,
                                      'FVC') }}%</h2></td>
                              </tr>
                              <tr>
                                  <td colspan="2"><p>{{
                                      resultSpirographiaText(getSpirigraphiaDataSource(getUserGrowth, getUserAge,
                                      getUserGender, 'FVC'), 'FVC') }}</p></td>
                              </tr>
                          </table>
                      </div>

                      <div :data-result="resultSpirographiaColor(getSpirigraphiaDataSource(getUserGrowth, getUserAge, getUserGender, 'FEV1'), 'FEV1')"
                           @click="whatIs('FEV1')">
                          <table>
                              <tr>
                                  <td colspan="2"><p>FEV1</p></td>
                              </tr>
                              <tr>
                                  <td><h2>{{ getUserSpirographia['FEV1'] }} <span>л</span></h2></td>
                                  <td><h2>{{ getSpirigraphiaDataSource(getUserGrowth, getUserAge, getUserGender,
                                      'FEV1') }}%</h2></td>
                              </tr>
                              <tr>
                                  <td colspan="2"><p>{{
                                      resultSpirographiaText(getSpirigraphiaDataSource(getUserGrowth, getUserAge,
                                      getUserGender, 'FEV1'), 'FEV1') }}</p></td>
                              </tr>
                          </table>
                      </div>

                      <div :data-result="resultSpirographiaColor(getSpirigraphiaDataSource(getUserGrowth, getUserAge, getUserGender, 'PEF'), 'PEF')"
                           @click="whatIs('PEF')">
                          <table>
                              <tr>
                                  <td colspan="2"><p>PEF</p></td>
                              </tr>
                              <tr>
                                  <td><h2>{{ getUserSpirographia['PEF'] }} <span>л/сек</span></h2></td>
                                  <td><h2>{{ getSpirigraphiaDataSource(getUserGrowth, getUserAge, getUserGender,
                                      'PEF') }}%</h2></td>
                              </tr>
                              <tr>
                                  <td colspan="2"><p>{{
                                      resultSpirographiaText(getSpirigraphiaDataSource(getUserGrowth, getUserAge,
                                      getUserGender, 'PEF'), 'PEF') }}</p></td>
                              </tr>
                          </table>
                      </div>

                      <div :data-result="resultSpirographiaColor(((Number(getUserSpirographia['FEV1']) / Number(getUserSpirographia['FVC'])) * 100).toFixed(0), 'FEV1/FVC')"
                           @click="whatIs('FEV1FVC')">
                          <table>
                              <tr>
                                  <td colspan="2"><p>FEV1/FVC</p></td>
                              </tr>
                              <tr>
                                  <td><h2>{{ ((Number(getUserSpirographia['FEV1']) /
                                      Number(getUserSpirographia['FVC'])) * 100).toFixed(0) }}%</h2></td>
                                  <td></td>
                              </tr>
                              <tr>
                                  <td colspan="2"><p>{{ resultSpirographiaText(((Number(getUserSpirographia['FEV1']) /
                                      Number(getUserSpirographia['FVC'])) * 100).toFixed(0), 'FEV1/FVC') }}</p></td>
                              </tr>
                          </table>
                      </div>

                  </div>
              </div>
              <div>
                  <button v-for="(data, index) in btnAction"
                          :key="index"
                          :id="(typeof data.id !== 'undefined' ? data.id : false)"
                          class="btn"
                          :style="buttonStyle"
                          v-text="data.name"
                          @click="goAction(data.action, $event)">
                  </button>
              </div>
          </div>
      </transition>

  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable camelcase */
import { mapGetters } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getSpirigraphiaData, getSpirigraphiaDataCompare } from '@/utils'
import Loader from '@/components/global/Loader'

export default {
  name: 'Measurement',
  components: {
    Loader
  },
  data () {
    return {
      state: null, // текущее состояние
      typeScreen: null,
      h3: null,
      p: null,
      hint: null,

      btn: null,
      btnColor: null,
      btnAction: [],

      btn_1: null,
      btnDisabled_1: null,
      btnColor_1: null,
      btnAction_1: [],

      rightHtml: null,
      rightLoad: null,
      resultActions: null,
      activeTimer: null,
      spirographiaLc: [],
      templatePath: 'talon-template-dop.html',
      spiPhrase: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep',
      'getSessionName',
      'getMeetingTalk',
      'getLoadAppSettings'
    ]),
    ...mapGetters('ui', [
      'getSubtitlesEnabled',
      'getMeasurementNum',
      'getMeasurementStep',
      'getEquipmentWorks',
      'getMeasuredData',

      'getMeasurementGlucometry',
      'getMeasurementPressure',
      'getMeasurementPressureLow',

      'getUserCurrentPressureAndPulse',

      'getMeasuredDataFromTopic',
      'getMeasurementSaturatsiya',
      'getMeasurementSpirographia',
      'getUserGender',
      'getUserAge',
      'getMeasurementSpirographiaQ1',
      'getMeasurementSpirographiaQ2'
    ]),
    ...mapGetters('engine', [
      'getCurrentStateName'
    ]),
    ...mapGetters('robot', [
      'getFaceRecognizeGeneralId'
    ]),
    buttonStyle () {
      return this.getLoadAppSettings ? { ...this.getLoadAppSettings.btnMain } : {
        background: '#2589DE',
        borderColor: '#2589DE'
      }
    },
    hintStyle () {
      return this.getLoadAppSettings ? { ...this.getLoadAppSettings.textMeasureHint } : {
        color: '#2589DE'
      }
    },
    showComponent () {
      if (this.$store.getters['app/getStep'] === 'measurement') {
        console.log('HELP HELP HELP')
        console.log(this.getMeasurementNum)
        this.btnAction = []
        // САТУРАЦИЯ
        if (this.getMeasurementNum === 4) {
          if (this.getMeasurementStep === 1) {
            this.state = 'MEASUREMENT_4_1'
            this.typeScreen = -1
            this.typeScreen = 0
            this.h3 = 'Сатурация крови'
            this.p = 'Вставьте палец в прибор, как показано на видео. Датчик с красным светом должен быть направлен на подушечку'
            this.hint = null
            this.btnColor = this.getLoadAppSettings.btn.colorText
            this.btnBgr = this.getLoadAppSettings.btn.color
            this.btn = 'Начать измерение'
            this.btnAction.push({
              'name': 'engine/handlerClickMoveToState',
              'options': 'MEASUREMENT_4_2',
              'timeout': 0
            })
            this.rightHtml = '<video class="video" id="video" height="480" src="video/pulseoximeter_new.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
          if (this.getMeasurementStep === 2) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 0
            }, 10)
            this.state = 'MEASUREMENT_4_1'
            this.h3 = null
            this.p = 'Идёт процесс измерения...<br />Не вынимайте палец из устройства'
            this.hint = null
            this.btn = 'Остановить'
            this.btn_1 = null
            this.btnColor = this.getLoadAppSettings.btn.colorText
            this.btnBgr = this.getLoadAppSettings.btn.color
            this.btnAction.push({
              'name': 'engine/handlerClickMoveToState',
              'options': 'MEASUREMENT_4_1',
              'timeout': 0
            })
            this.rightHtml = null
            this.rightLoad = true
          }
          /*
          if (this.getMeasurementStep === 3) {
            this.typeScreen = 1
            let forwardActions = []
            let forwardActionsLocalStorage = []
            let btnNextName = 'На главную'
            if (this.getMeasuredData !== null && this.getMeasuredData.filter(item => { return item.data === null }).length === 0) {
              let lc = JSON.parse(localStorage.getItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id))) || {}
              let date = new Date()
              this.getMeasuredData.forEach(item => {
                forwardActions.push({ 'name': item.name, 'options': item.data })
                forwardActionsLocalStorage.push({
                  'name': item.name,
                  'options': item.data,
                  'type': 'auto',
                  'date': date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                })
              })
              lc[this.getMeasurementNum + '_1'] = forwardActionsLocalStorage
              localStorage.setItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id), JSON.stringify(lc))
              if (this.getUserSaturatsiya) {
                global.robot.statisticService.write(
                  `${this.$store.getters['faces/getUserGeneral'].id},pulseoximetry,${String(Number(this.getUserSaturatsiya).toFixed(0))},${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)}/${date.getUTCDate()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                  'medical_examinations')
              }
              if (this.getLoadAppSettings.tiles.filter(item => item.type === 4)[0].active_sat === 1) {
                forwardActions.push({
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'MEASUREMENT_' + this.getMeasurementNum + '_4'
                })
                btnNextName = 'Далее'
              } else {
                forwardActions.push({ 'name': 'engine/handlerClickMoveToState', 'options': 'START_NEW' })
              }
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.resultActions = [
              {
                'name': 'Повторить замер',
                'action': [{
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'MEASUREMENT_' + this.getMeasurementNum + '_1'
                }],
                'active': true
              },
              {
                'name': 'На главную',
                'action': [{
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'START_NEW'
                }],
                'active': true
              },
              {
                'name': btnNextName,
                'action': forwardActions,
                'active': (this.$store.getters['ui/getIsExaminationStarted'] !== true || this.getMeasuredData.filter(item => {
                  return item.data === null
                }).length === 0)
              }
            ]
          }
          if (this.getMeasurementStep === 4) {
            this.typeScreen = 0
            this.h3 = 'Спирограф'
            this.p = 'Проверка работоспособности...'
            this.hint = null
            this.btn = null
            this.btn_1 = null
            this.rightHtml = null
            this.rightLoad = true
          }
          if (this.getMeasurementStep === 5) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 0
            }, 10)
            this.h3 = 'Спирограф'
            this.p = 'Установите трубку для измерения в прибор, как показано на видео, поднесите прибор ко рту и только после этого нажмите "Начать измерение"'
            this.hint = null
            this.btnColor = this.getLoadAppSettings.btn.colorText
            this.btnBgr = this.getLoadAppSettings.btn.color
            this.btn = 'Начать измерение'
            this.btnAction.push({
              'name': 'engine/handlerClickMoveToState',
              'options': 'MEASUREMENT_4_6',
              'timeout': 0
            })
            this.btn_1 = null
            this.rightHtml = '<video class="video" id="video" height="480" src="video/spirometry_setup.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
          /*
          if (this.getMeasurementStep === 6) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 0
            }, 10)
            this.h3 = 'Спирограф'
            this.p = 'Прибор готов для измерения...<br />Выдыхайте в прибор, как показано на видео'
            this.hint = null
            this.btn = 'Отмена'
            setTimeout(() => {
              this.btnAction.push({
                'name': 'engine/handlerClickMoveToState',
                'options': 'START_NEW',
                'timeout': 0
              })
            }, 3000)
            this.btn_1 = null
            this.rightHtml = '<video class="video" id="video" height="480" src="video/spirometry_process.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
          if (this.getMeasurementStep === 7) {
            this.typeScreen = 2
            this.p = 'Имеются ли у вас хронические, недавно перенесенные острые или имеющиеся на данный момент заболевания дыхательной системы (бронхиальная астма, хроническая обструктивная болезнь легких, хронический бронхит, профессиональные заболевания легких, пневмония, ОРВИ)?'
            this.btnAction = [
              { 'name': 'Да', 'id': 'autoclick_q1_1', 'action': { 'name': 'ui/setUserSpirographiaQ1', 'data': 1 } },
              { 'name': 'Нет', 'id': 'autoclick_q1_0', 'action': { 'name': 'ui/setUserSpirographiaQ1', 'data': 0 } }
            ]
          }
          if (this.getMeasurementStep === 8) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 2
            }, 10)
            this.p = 'Имеются ли у вас факторы риска заболеваний легочной системы (курение, работа на вредном производстве, плохая экологическая ситуация, аллергические реакции (крапивница), наследственная предрасположенность)?'
            this.btnAction = [
              { 'name': 'Да', 'id': 'autoclick_q2_1', 'action': { 'name': 'ui/setUserSpirographiaQ2', 'data': 1 } },
              { 'name': 'Нет', 'id': 'autoclick_q2_0', 'action': { 'name': 'ui/setUserSpirographiaQ2', 'data': 0 } }
            ]
            this.spiPhrase = null
          }
          if (this.getMeasurementStep === 9) {
            this.typeScreen = 3
            let el = document.getElementsByClassName('.btn')
            for (let i = 0; i < el.length; i++) el[i].removeAttribute('disabled')
            this.h3 = 'Результат'
            this.p = 'Все показатели в норме. Однако, не забывайте регулярно проходить осмотры, чтобы вовремя предупредить появление болезней'
            let s = {}
            let date = new Date()
            s['FVC'] = this.resultSpirographiaColor(this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'FVC'), 'FVC')
            s['FEV1'] = this.resultSpirographiaColor(this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'FEV1'), 'FEV1')
            s['PEF'] = this.resultSpirographiaColor(this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'PEF'), 'PEF')
            s['FEV1/FVC'] = this.resultSpirographiaColor((((Number(this.getUserSpirographia['FEV1']) / Number(this.getUserSpirographia['FVC'])) * 100).toFixed(0)), 'FEV1/FVC')
            if (this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'FVC')) {
              global.robot.statisticService.write(
                `${this.$store.getters['faces/getUserGeneral'].id},spirometry_FVC,${this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'FVC')},${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)}/${date.getUTCDate()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                'medical_examinations')

              global.robot.statisticService.write(
                `${this.$store.getters['faces/getUserGeneral'].id},spirometry_FEV1,${this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'FEV1')},${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)}/${date.getUTCDate()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                'medical_examinations')

              global.robot.statisticService.write(
                `${this.$store.getters['faces/getUserGeneral'].id},spirometry_PEF,${this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'PEF')},${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)}/${date.getUTCDate()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                'medical_examinations')

              global.robot.statisticService.write(
                `${this.$store.getters['faces/getUserGeneral'].id},spirometry_FEV1/FVC,${((Number(this.getUserSpirographia['FEV1']) / Number(this.getUserSpirographia['FVC'])) * 100).toFixed(0)},${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)}/${date.getUTCDate()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                'medical_examinations')
            }
            // console.warn('spirographiaData =', s)
            if (s['FVC'] !== 0 || s['FEV1'] !== 0 || s['PEF'] !== 0 || s['FEV1/FVC'] !== 0) {
              this.p = ''
              let m = Math.max(s['FVC'], s['FEV1'], s['FEV1/FVC'])
              if (m > 0) {
                this.p += 'У вас имеются ' + ((m === 1) ? 'умеренные' : (m === 2) ? 'значительные' : 'резкие') + ' отклонения в функциях внешнего дыхания. '
              } else {
                this.p += 'Показатели функций внешнего дыхания соответствуют норме. '
              }
              if (s['PEF'] > 0) {
                this.p += 'Значение пиковой скорости выдоха ' + ((s['PEF'] === m) ? 'также' : '') + ' имеет ' + ((s['PEF'] === 1) ? 'умеренные' : (s['PEF'] === 2) ? 'значительные' : 'резкие') + ' отклонения. '
              } else {
                this.p += 'Значение пиковой скорости выдоха соответствует норме. '
              }
              this.p += 'Необходима консультация специалиста. '
            }
            if (this.spiPhrase === null) {
              this.spiPhrase = true
              let logger = PromobotLogger.getInstance()
              let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
              this.$store.dispatch('robot/sayReplicByName', {
                meta: { eventId },
                data: {
                  'step': 'RES_SPI_' + Math.max(s['FVC'], s['FEV1'], s['FEV1/FVC'], s['PEF']),
                  'terminate': false
                }
              })
            }
            this.btnAction = [
              {
                'name': 'Повторить замер',
                'action': [{ 'name': 'engine/handlerMoveToState', 'data': 'MEASUREMENT_4_5' }]
              },
              { 'name': 'На главную', 'action': [{ 'name': 'engine/handlerMoveToState', 'data': 'START_NEW' }] },
              { 'name': 'Распечатать результат', 'id': 'autoclick_printSatSpi', 'action': 'to_print_s' }
            ]
            // console.log('LOCAL STORAGE', localStorage.getItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id)))
          }
          */
        } else {
          this.spirographiaLc = []
        }
        // ГЛЮКОМЕТРИЯ
        if (this.getMeasurementNum === 2) {
          if (this.getMeasurementStep === 1 || this.getMeasurementStep === 3 || this.getMeasurementStep === 4) {
            this.state = 'MEASUREMENT_2_1'
            this.typeScreen = 0
            this.h3 = 'Глюкометр'
            if (this.getMeasurementStep === 1) this.p = 'Установите указательный палец в прибор как показано на видео.'
            if (this.getMeasurementStep === 3) this.p = 'Установите средний палец в прибор как показано на видео'
            if (this.getMeasurementStep === 4) this.p = 'Установите безымянный палец в прибор как показано на видео'
            if (this.getMeasurementStep === 1) this.btn = 'Начать измерение'
            if (this.getMeasurementStep === 3 || this.getMeasurementStep === 4) this.btn = 'Продолжить измерение'
            this.hint = 'Помните, что измерение должно проводиться на голодный желудок, не менее 2х часов после еды!'
            this.btnColor = this.getLoadAppSettings.btn.colorText
            this.btnBgr = this.getLoadAppSettings.btn.color
            this.btnAction.push({
              'name': 'engine/handlerClickMoveToState',
              'options': 'MEASUREMENT_2_2',
              'timeout': 0
            })
            this.btn_1 = null
            if (this.getMeasurementStep === 1) this.rightHtml = '<video class="video" id="video" height="480" src="video/glucometry_index_finger.webm" loop autoplay mute></video>'
            if (this.getMeasurementStep === 3) this.rightHtml = '<video class="video" id="video" height="480" src="video/glucometry_middle_finger.webm" loop autoplay mute></video>'
            if (this.getMeasurementStep === 4) this.rightHtml = '<video class="video" id="video" height="480" src="video/glucometry_ring_finger.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
          if (this.getMeasurementStep === 2) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 0
            }, 10)
            this.state = 'MEASUREMENT_2_1'
            this.h3 = null
            this.p = 'Идёт процесс измерения...<br />Не вынимайте палец из устройства'
            this.hint = null
            this.btn = null
            this.btn_1 = null
            this.rightHtml = null
            this.rightLoad = true
          }
          /*
          if (this.getMeasurementStep === 5) {
            this.typeScreen = 1
            let forwardActions = []
            let forwardActionsLocalStorage = []
            if (this.getMeasuredData !== null && this.getMeasuredData.filter(item => {
              return item.data === null
            }).length === 0) {
              let lc = JSON.parse(localStorage.getItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id))) || {}
              let date = new Date()
              this.getMeasuredData.forEach(item => {
                forwardActions.push({ 'name': item.name, 'options': item.data })
                forwardActionsLocalStorage.push({
                  'name': item.name,
                  'options': item.data,
                  'type': 'auto',
                  'date': date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                })
              })
              lc[this.getMeasurementNum] = forwardActionsLocalStorage
              localStorage.setItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id), JSON.stringify(lc))
              forwardActions.push({ 'name': 'engine/handlerClickMoveToState', 'options': 'START_NEW' })
              if (this.getUserGlucometry) {
                global.robot.statisticService.write(
                  `${this.$store.getters['faces/getUserGeneral'].id},glucometry,${String(Number(this.getUserGlucometry).toFixed(1))},${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)}/${date.getUTCDate()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                  'medical_examinations')
              }
            } else {
              if (this.$store.getters['ui/getIsExaminationStarted'] !== true) {
                forwardActions.push({
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'START_NEW'
                })
              }
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.resultActions = [
              {
                'name': 'Повторить замер',
                'action': [{
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'MEASUREMENT_' + this.getMeasurementNum + '_1'
                }],
                'active': true
              },
              {
                'name': 'Ввести вручную',
                'action': [],
                'active': false,
                'hasBtn': false
              },
              {
                'name': 'На главную',
                'action': forwardActions,
                'active': (this.$store.getters['ui/getIsExaminationStarted'] !== true || this.getMeasuredData.filter(item => {
                  return item.data === null
                }).length === 0)
              }
            ]
          }
          */
        }

        // ТЕРМОМЕТРИЯ
        if (this.getMeasurementNum === 6) {
          if (this.getMeasurementStep === 1) {
            this.state = 'MEASUREMENT_6_1'
            this.typeScreen = 0
            this.h3 = 'Термометр'
            this.p = 'Изучите инструкцию и нажмите кнопку "Начать измерение"'
            this.hint = null
            this.btn = 'Начать измерение'
            this.btn_1 = null
            this.btnColor = this.getLoadAppSettings.btn.colorText
            this.btnBgr = this.getLoadAppSettings.btn.color
            this.btnAction.push({
              'name': 'engine/handlerClickMoveToState',
              'options': 'MEASUREMENT_6_2',
              'timeout': 0
            })
            this.rightHtml = '<video class="video" id="video" height="480" src="video/thermometryFinger.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
          if (this.getMeasurementStep === 2) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 0
            }, 10)
            this.state = 'MEASUREMENT_6_1'
            this.h3 = null
            this.p = 'Когда робот поднимет левую руку, поднесите лоб к руке на растоянии 5 см'
            this.hint = null
            this.btn = null
            this.btn_1 = null
            this.rightHtml = '<div><img src="dialog-images/tempareture_measure.png"/></div>'
            this.rightLoad = null
          }
          if (this.getMeasurementStep === 3) {
            this.activeTimer = true
            this.typeScreen = 1
            let forwardActions = []
            let forwardActionsLocalStorage = []
            if (this.getMeasuredData !== null && this.getMeasuredData.filter(item => {
              return item.data === null
            }).length === 0) {
              let lc = JSON.parse(localStorage.getItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id))) || {}
              let date = new Date()
              this.getMeasuredData.forEach(item => {
                forwardActions.push({ 'name': item.name, 'options': item.data })
                forwardActionsLocalStorage.push({
                  'name': item.name,
                  'options': item.data,
                  'type': 'auto',
                  'date': date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                })
              })
              lc[this.getMeasurementNum] = forwardActionsLocalStorage
              localStorage.setItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id), JSON.stringify(lc))
              forwardActions.push({ 'name': 'engine/handlerClickMoveToState', 'options': 'DIAGNOSTIC_START' })
              forwardActions.push({ 'name': 'robot/stopScript', 'options': null })
            } else {
              /*
              if (this.$store.getters['ui/getIsExaminationStarted'] !== true) {
                forwardActions.push({
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'START_NEW'
                })
              }
              */
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.resultActions = [
              {
                'name': 'Повторить замер',
                'action': [{
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'MEASUREMENT_' + this.getMeasurementNum + '_1'
                }],
                'active': true,
                'isActiveTimer': true,
                'id': 'autoclick_repeatT'
              },
              {
                'name': 'Ввести вручную',
                'action': [],
                'active': false,
                'hasBtn': false
              },
              {
                'name': 'На главную',
                'action': forwardActions,
                'isActiveTimer': true,
                'active': (this.$store.getters['ui/getIsExaminationStarted'] !== true || this.getMeasuredData.filter(item => {
                  return item.data === null
                }).length === 0)
              }
            ]
          }
        }

        // ТОНОМЕТРИЯ
        if (this.getMeasurementNum === 5) {
          if (this.getMeasurementStep === 1) {
            this.state = 'MEASUREMENT_5_1'
            this.typeScreen = 0
            this.h3 = 'Артериальное давление /пульс'
            this.p = 'Наденьте манжету согласно инструкции на видео'
            this.hint = null
            this.btn = 'Начать измерение'
            this.btn_1 = null
            this.btnColor = this.getLoadAppSettings.btn.colorText
            this.btnBgr = this.getLoadAppSettings.btn.color
            this.btnAction.push({
              'name': 'engine/handlerClickMoveToState',
              'options': 'MEASUREMENT_5_2',
              'timeout': 0
            })
            this.rightHtml = '<video class="video" id="video" height="480" src="video/tonometry.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
          if (this.getMeasurementStep === 2) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 0
            }, 10)
            this.state = 'MEASUREMENT_5_1'
            this.h3 = null
            this.p = 'Идёт процесс измерения...'
            this.hint = null
            this.btn = null
            this.btn_1 = null
            this.rightHtml = null
            this.rightLoad = true
          }
          /*
          if (this.getMeasurementStep === 3) {
            this.typeScreen = 1
            let forwardActions = []
            let forwardActionsLocalStorage = []
            if (this.getMeasuredData !== null && this.getMeasuredData.filter(item => {
              return item.data === null
            }).length === 0) {
              let lc = JSON.parse(localStorage.getItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id))) || {}
              let date = new Date()
              this.getMeasuredData.forEach(item => {
                forwardActions.push({ 'name': item.name, 'options': item.data })
                forwardActionsLocalStorage.push({
                  'name': item.name,
                  'options': item.data,
                  'type': 'auto',
                  'date': date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                })
              })
              lc[this.getMeasurementNum] = forwardActionsLocalStorage
              localStorage.setItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id), JSON.stringify(lc))
              if (this.getUserArtPressure) {
                global.robot.statisticService.write(
                  `${this.$store.getters['faces/getUserGeneral'].id},tonometry,${String(Number(this.getUserArtPressure).toFixed(0))}/${String(Number(this.getUserArtPressureLow).toFixed(0))},${date.getUTCFullYear()}/${(date.getUTCMonth() + 1)}/${date.getUTCDate()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                  'medical_examinations')
              }
              if (this.$store.getters['ui/getIsExaminationStarted']) {
                forwardActions.push({ 'name': 'engine/handlerClickMoveToState', 'options': 'IBS-1' })
                forwardActions.push({ 'name': 'ui/setIbsStep', 'options': 1 })
              } else {
                forwardActions.push({ 'name': 'engine/handlerClickMoveToState', 'options': 'START_NEW' })
              }
            } else {
              if (this.$store.getters['ui/getIsExaminationStarted'] !== true) {
                forwardActions.push({
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'START_NEW'
                })
              }
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.resultActions = [
              {
                'name': 'Повторить замер',
                'action': [{
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'MEASUREMENT_' + this.getMeasurementNum + '_1'
                }],
                'active': true
              },
              {
                'name': 'Ввести вручную',
                'action': [{ 'name': 'engine/handlerClickMoveToState', 'options': 'IBS' }, {
                  'name': 'ui/setIbsStep',
                  'options': 0
                }],
                'active': this.$store.getters['ui/getIsExaminationStarted'] === true,
                'hasBtn': this.$store.getters['ui/getIsExaminationStarted'] === true
              },
              {
                'name': (this.$store.getters['ui/getIsExaminationStarted'] === true) ? 'Далее' : 'На главную',
                'action': forwardActions,
                'active': (this.$store.getters['ui/getIsExaminationStarted'] !== true || this.getMeasuredData.filter(item => {
                  return item.data === null
                }).length === 0),
                'id': 'autoclick_afterPressure'
              }
            ]
          }
          */
        }

        // РОСТ / ВЕС
        /*
        if (this.getMeasurementNum === 3) {
          if (this.getMeasurementStep === 1) {
            this.typeScreen = 0
            this.h3 = 'Рост/вес'
            this.p = 'Встанте на весовую платформу обеими ногами и старайтесь не двигаться'
            this.hint = null
            this.btn = 'Начать измерение'
            this.btn_1 = null
            this.btnColor = this.getLoadAppSettings.btn.colorText
            this.btnBgr = this.getLoadAppSettings.btn.color
            this.btnAction.push({
              'name': 'engine/handlerClickMoveToState',
              'options': 'MEASUREMENT_3_3',
              'timeout': 0
            })
            this.rightHtml = '<video class="video" id="video" height="480" src="video/height_weight.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
          if (this.getMeasurementStep === 2) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 0
            }, 10)
            this.h3 = null
            this.p = 'Встанте на весовую платформу'
            this.hint = null
            this.btn = 'Остановить'
            this.btn_1 = null
            this.btnColor = this.getLoadAppSettings.btn.colorText
            this.btnBgr = this.getLoadAppSettings.btn.color
            this.btnAction.push({
              'name': 'engine/handlerClickMoveToState',
              'options': 'MEASUREMENT_3_1',
              'timeout': 0
            })
            this.rightHtml = '<img src="dialog-images/weightMeasure.jpg" />'
            this.rightLoad = null
          }
          if (this.getMeasurementStep === 3) {
            this.typeScreen = null
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.typeScreen = 0
            }, 10)
            this.h3 = null
            this.p = 'Идёт процесс измерения...<br />Cтарайтесь не двигаться и не сходить с платформы'
            this.hint = null
            this.btn = null
            this.btn_1 = null
            this.rightHtml = null
            this.rightLoad = true
          }
          if (this.getMeasurementStep === 4) {
            this.typeScreen = 1
            let forwardActions = []
            let forwardActionsLocalStorage = []
            if (this.getMeasuredData !== null && this.getMeasuredData.filter(item => {
              return item.data === null
            }).length === 0) {
              let lc = JSON.parse(localStorage.getItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id))) || {}
              let date = new Date()
              this.getMeasuredData.forEach(item => {
                forwardActions.push({ 'name': item.name, 'options': item.data })
                forwardActionsLocalStorage.push({
                  'name': item.name,
                  'options': item.data,
                  'type': 'auto',
                  'date': date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                })
              })
              lc[this.getMeasurementNum] = forwardActionsLocalStorage
              localStorage.setItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id), JSON.stringify(lc))
              if (this.$store.getters['ui/getIsExaminationStarted']) {
                forwardActions.push({ 'name': 'engine/handlerClickMoveToState', 'options': 'IMT-SUCCESS' })
              } else {
                forwardActions.push({ 'name': 'engine/handlerClickMoveToState', 'options': 'START_NEW' })
              }
            } else {
              if (this.$store.getters['ui/getIsExaminationStarted'] !== true) {
                forwardActions.push({
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'START_NEW'
                })
              }
            }
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.resultActions = [
              {
                'name': 'Повторить замер',
                'action': [{
                  'name': 'engine/handlerClickMoveToState',
                  'options': 'MEASUREMENT_' + this.getMeasurementNum + '_1'
                }],
                'active': true
              },
              {
                'name': 'Ввести вручную',
                'action': [{ 'name': 'engine/handlerClickMoveToState', 'options': 'IMT' }, {
                  'name': 'ui/setImtStep',
                  'options': 0
                }],
                'active': this.$store.getters['ui/getIsExaminationStarted'] === true,
                'hasBtn': this.$store.getters['ui/getIsExaminationStarted'] === true
              },
              {
                'name': (this.$store.getters['ui/getIsExaminationStarted'] === true) ? 'Далее' : 'На главную',
                'action': forwardActions,
                'active': (this.$store.getters['ui/getIsExaminationStarted'] !== true || this.getMeasuredData.filter(item => {
                  return item.data === null
                }).length === 0),
                'id': 'autoclick_afterWeight'
              }
            ]
          }
        }
        */
        this.loggingCurrentStateName()
      }
      return this.$store.getters['app/getStep'] === 'measurement'
    },
    ldsLoaderStyles () {
      return {
        size: '32px',
        top: '-6px',
        left: '0',
        margin: '4px',
        borderSize: '4px',
        borderColor: this.getLoadAppSettings ? this.getLoadAppSettings.loaderStyle.color : '#57A929'
      }
    },
    ldsBigLoaderStyles () {
      return {
        size: '360px',
        top: '0',
        left: '0',
        margin: '8px',
        borderSize: '8px',
        borderColor: this.getLoadAppSettings ? this.getLoadAppSettings.loaderStyle.color : '#57A929'
      }
    },
    isGlucometer () {
      return this.getMeasurementNum === 2 && this.getMeasurementStep === 2
    },
    isTonometer () {
      return this.getMeasurementNum === 5 && this.getMeasurementStep === 2
    },
    ldsBigLoaderContent () {
      if (this.isGlucometer) {
        return `
        <div class="wrapper_glucometry">
            <div class="text_glucometry text_glucometry_big">${this.getMeasuredDataFromTopic?.message?.percent || 0}</div>
            <span class="text_glucometry text_glucometry_small">%</span>
        </div>`
      }
      if (this.isTonometer) {
        return `
        <div class="wrapper_tonometry">
          <div class="text_tonometry text_tonometry_big">${this.getMeasuredDataFromTopic?.message?.data?.current_pressure || '---'}</div>
          <span class="text_tonometry text_tonometry_small">mm Hg</span>
        </div>`
      } else {
        return null
      }
    }
  },
  watch: {
    activeTimer: function (val) {
      if (this.activeTimer !== null && this.activeTimer !== true) {
        setTimeout(() => {
          this.activeTimer = (val > 0) ? val - 1000 : null
        }, 1000)
      }
    },
    getMeasuredDataFromTopic: function (val) {
      if (typeof val !== 'undefined' && val !== null && val.type === '6_4') this.activeTimer = 12000
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: this.state
      })
    },
    whatIs: function (name) {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('robot/sayReplicByName', {
        meta: { eventId },
        data: { 'step': 'WHAT_IS_' + name, 'terminate': true }
      })
    },
    resultSpirographiaText: function (present, type) {
      if (type === 'FVC') {
        if (present < 50) return 'Резкое отклонение'
        if (present < 70) return 'Значительное отклонение'
        if (present < 85) return 'Умеренное отклонение'
        return 'В норме'
      }
      if (type === 'FEV1') {
        if (present < 35) return 'Резкое отклонение'
        if (present < 55) return 'Значительное отклонение'
        if (present < 75) return 'Умеренное отклонение'
        return 'В норме'
      }
      if (type === 'PEF') {
        if (present < 50) return 'Резкое отклонение'
        if (present < 80) return 'Значительное отклонение'
        if (present < 90) return 'Умеренное отклонение'
        return 'В норме'
      }
      if (type === 'FEV1/FVC') {
        if (present < 40) return 'Резкое отклонение'
        if (present < 55) return 'Значительное отклонение'
        if (present < 70) return 'Умеренное отклонение'
        return 'В норме'
      }
    },
    resultSpirographiaColor: function (present, type) {
      return getSpirigraphiaDataCompare(present, type)
    },
    getSpirigraphiaDataSource: function (h, a, p, type) {
      if (this.getUserSpirographia !== null && a !== null && h !== null && p !== null) return ((this.getUserSpirographia[type] / getSpirigraphiaData(h, a.toFixed(0), p, type)) * 100).toFixed(0)
      return ''
    },
    goAction: function (data, event) {
      if (data !== 'to_print_s') {
        // console.warn('ПЕЧАТЬ?')
        this.typeScreen = null
        let logger = PromobotLogger.getInstance()
        let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        data.forEach(item => {
          setTimeout(() => {
            this.$store.dispatch(item.name, {
              meta: { eventId },
              data: item.data
            })
          }, item.timeout)
        })
      } else {
        // console.warn('НАЧАТО ФОРМИРОВАНИЕ ТАЛОНА СПИРОГРАФИИ')
        let html = ''
        // html += '<p><b>Сатурация крови</b></p>'
        // if (this.getUserSaturatsiya >= 95) {
        //   html += '<p>Ваш уровень насыщенности крови кислородом составляет ' + this.getUserSaturatsiya + '% и находится в пределах нормы</p>'
        // } else if (this.getUserSaturatsiya >= 90) {
        //   html += '<p>Ваша кровь имеет сниженную насыщенность кислородом ' + this.getUserSaturatsiya + '%. Необходимо повторное измерение. При сохранении низких значений обратитесь к врачу</p>'
        // }
        let spirographiaData = {}
        spirographiaData['FVC'] = this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'FVC')
        spirographiaData['FEV1'] = this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'FEV1')
        spirographiaData['PEF'] = this.getSpirigraphiaDataSource(this.getUserGrowth, this.getUserAge, this.getUserGender, 'PEF')
        spirographiaData['FEV1/FVC'] = (((Number(this.getUserSpirographia['FEV1']) / Number(this.getUserSpirographia['FVC'])) * 100).toFixed(0))
        html += '<br /><p><b>Спирография легких</b></p>'
        html += '<p>Бронхиальная проходимость (FVC): ' + this.getUserSpirographia['FVC'] + ' - ' + (this.resultSpirographiaText(spirographiaData['FVC'], 'FVC')) + '</p>'
        html += '<p>Объем выдоха за 1 сек. (FEV1): ' + this.getUserSpirographia['FEV1'] + ' - ' + (this.resultSpirographiaText(spirographiaData['FEV1'], 'FEV1')) + '</p>'
        html += '<p>Пиковая скорость выдоха (PEF): ' + this.getUserSpirographia['PEF'] + ' - ' + (this.resultSpirographiaText(spirographiaData['PEF'], 'PEF')) + '</p>'
        html += '<p>Индекс Тиффно (FEV1/FVC): ' + spirographiaData['FEV1/FVC'] + ' - ' + this.resultSpirographiaText(spirographiaData['FEV1/FVC'], 'FEV1/FVC') + '</p>'

        html += '<br /><p><b>Анализ FVC, FEV1, FEV1/FVC</b></p>'
        let b3 = '<p>Все показатели в норме</p>'
        let spiroStatus = Math.max(this.resultSpirographiaColor(spirographiaData['FVC'], 'FVC'), this.resultSpirographiaColor(spirographiaData['FEV1'], 'FEV1'), this.resultSpirographiaColor(spirographiaData['FEV1/FVC'], 'FEV1/FVC'))
        if (spiroStatus === 1 && (this.getUserSpirographiaQ1 === 0 || this.getUserSpirographiaQ1 === 1) && this.getUserSpirographiaQ2 === 0) b3 = '<p>На фоне факторов риска и заболевания дыхательной системы у вас были выявлены <b>умеренные отклонения</b> в функции внешнего дыхания! </p><p>Если вы уже наблюдаетесь у врача не забудьте об очередном приеме. Если вы давно не были у него вам необходимо обратится за консультацией к врачу</p>'
        if (spiroStatus === 1 && this.getUserSpirographiaQ1 === 0 && this.getUserSpirographiaQ2 === 1) b3 = '<p>У вас имеются <b>умеренные отклонения</b> в функции внешнего дыхания. У вас имеются факторы риска развития заболеваний дыхательной системы, высока вероятность, что у вас уже имеются отклонения от нормальной функции ваших легких!</p><p>Вам необходимо обратится за консультацией к врачу</p>'
        if (spiroStatus === 1 && this.getUserSpirographiaQ1 === 1 && this.getUserSpirographiaQ2 === 1) b3 = '<p>На фоне факторов риска и заболевания дыхательной системы у вас были выявлены <b>умеренные отклонения</b> в функции внешнего дыхания! </p><p>Если вы уже наблюдаетесь у врача не забудьте об очередном приеме. Если вы давно не были у него вам необходимо обратится за консультацией к врачу</p>'
        if (spiroStatus > 1 && (this.getUserSpirographiaQ1 === 1 || this.getUserSpirographiaQ1 === 0) && this.getUserSpirographiaQ2 === 0) b3 = '<p>У вас имеются <b>значительные отклонения</b> в функции внешнего дыхания!!! Учитывая значительные отклонения скорее всего у вас имеются факторы риска и/или заболевания дыхательной системы!</p><p>Вам необходимо обратится за консультацией к врачу, пройти дополнительные обследования, скорректировать лечение и получить индивидуальные рекомендации</p>'
        if (spiroStatus > 1 && this.getUserSpirographiaQ1 === 0 && this.getUserSpirographiaQ2 === 1) b3 = '<p>У вас имеются <b>значительные отклонения</b> в функции внешнего дыхания! Учитывая значительные отклонения и наличие факторов риска, высока вероятность, что у вас уже имеются заболевания дыхательной системы!</p><p>Вам необходимо обратится за консультацией к врачу, пройти дополнительные обследования, скорректировать лечение и получить индивидуальные рекомендации</p>'
        if (spiroStatus > 1 && this.getUserSpirographiaQ1 === 1 && this.getUserSpirographiaQ2 === 1) b3 = '<p>У вас имеются <b>резкие отклонения</b> в функции внешнего дыхания! Учитывая ваши факторы риска и наличие заболеваний дыхательной системы, высока вероятность прогрессирования заболеваний/ия и ухудшения функции внешнего дыхания!</p><p>Вам необходимо обратится за консультацией к врачу, пройти дополнительные обследования, скорректировать лечение и получить индивидуальные рекомендации</p>'
        html += b3

        html += '<br /><p><b>Анализ PEF</b></p>'
        let b4 = '<p>Все показатели в норме/p>'

        // console.log('this.getUserSpirographiaQ1', this.getUserSpirographiaQ1)
        // console.log('this.getUserSpirographiaQ2', this.getUserSpirographiaQ2)

        if (this.resultSpirographiaColor(spirographiaData['PEF'], 'PEF') === 0 && (this.getUserSpirographiaQ1 === 0 || this.getUserSpirographiaQ1 === 1)) b4 = '<p>Значение показателя пиковой скорости выдоха <b>соответствует норме</b>.</p><p>Проходите периодические осмотры у врача, ежедневно контролируйте показатель пиковой скорости выдоха (PEF). Не забывайте, что пикфлоуметрия для пациентов с заболеваниями легких является настолько же важной, как измерение давления у больных артериальной гипертензией или установление уровня глюкозы в крови для больных сахарным диабетом. С помощью указанной процедуры удается своевременно корректировать дозировку соответствующих медикаментов и предотвращать усугубление состояния больного</p>'

        if (this.resultSpirographiaColor(spirographiaData['PEF'], 'PEF') === 1 && this.getUserSpirographiaQ1 === 0) b4 = '<p>Значения показателя пиковой скорости выдоха <b>умеренно отклоняются!</b> Необходимо повторное измерение.</p> <p>Если показатели сохраняются умеренно сниженные, то возможно ваше заболевание легких плохо контролируется, необходима консультация врача.</p><p>Проходите периодические осмотры у врача, ежедневно контролируйте показатель пиковой скорости выдоха (PEF). Не забывайте, что пикфлоуметрия (тест на измерение PEF) для пациентов с заболеваниями легких является настолько же важной, как измерение давления у больных артериальной гипертензией или установление уровня глюкозы в крови для больных сахарным диабетом. С помощью указанной процедуры удается своевременно корректировать дозировку соответствующих медикаментов и предотвращать усугубление состояния больного</p>'

        if (this.resultSpirographiaColor(spirographiaData['PEF'], 'PEF') === 1 && this.getUserSpirographiaQ1 === 1) b4 = '<p>Значения показателя пиковой скорости выдоха <b>умеренно отклоняются!</b> Необходимо повторное измерение</p>. <p>При сохранении сниженных показаний, возможно ваше заболевание легких плохо контролируется и требует проведения усиленного лечения. Проходите периодические осмотры у врача, ежедневно контролируйте показатель пиковой скорости выдоха (PEF). Не забывайте, что пикфлоуметрия (тест на измерение PEF) для пациентов с заболеваниями легких является настолько же важной, как измерение давления у больных артериальной гипертензией или установление уровня глюкозы в крови для больных сахарным диабетом. С помощью указанной процедуры удается своевременно корректировать дозировку соответствующих медикаментов и предотвращать усугубление состояния больного</p>'

        if (this.resultSpirographiaColor(spirographiaData['PEF'], 'PEF') === 2 && this.getUserSpirographiaQ1 === 0) b4 = '<p>Значения показателя пиковой скорости выдоха <b>значительно отклоняются!</b> Необходимо повторное измерение.</p><p>При сохранении низкого значения, а также при наличии симптомов в виде одышки, нехватки воздуха, затруднения дыхания и/или если сатурация крови имеет значение меньше 90%, вам необходима срочная консультация врача!</p>'

        if (this.resultSpirographiaColor(spirographiaData['PEF'], 'PEF') === 2 && this.getUserSpirographiaQ1 === 1) b4 = '<p>Значения показателя пиковой скорости выдоха <b>значительно отклоняются!</b> Необходимо повторное измерение.</p><p>При сохранении сниженных показаний, возможно ваше заболевание легких плохо контролируется и требует проведения усиленного лечения. Вам необходима консультация врача.</p><p>Проходите периодические осмотры у врача, ежедневно контролируйте показатель пиковой скорости выдоха (PEF). Не забывайте, что пикфлоуметрия (тест на измерение PEF) для пациентов с заболеваниями легких является настолько же важной, как измерение давления у больных артериальной гипертензией или установление уровня глюкозы в крови для больных сахарным диабетом. С помощью указанной процедуры удается своевременно корректировать дозировку соответствующих медикаментов и предотвращать усугубление состояния больного</p>'

        if (this.resultSpirographiaColor(spirographiaData['PEF'], 'PEF') === 3 && (this.getUserSpirographiaQ1 === 0 || this.getUserSpirographiaQ1 === 1)) b4 = '<p>Значения показателя пиковой скорости выдоха имеют <b>резкие отклонения!</b> Необходимо повторное измерение. </p><p>При сохранении низкого значения, а также при наличии симптомов в виде одышки, нехватки воздуха, затруднения дыхания и/или сатурация крови имеет значение меньше 90%, вам необходима срочная консультация врача!</p>'
        html += b4

        html += '<br /><p><b>Общие рекомендации</b></p><p>Всегда важно предпринимать все усилия для сохранения своего здоровья. Рекомендуем вам:</p><p>- 1 раз в год проходить профилактические осмотры.</p><p>- Придерживаться здорового образа жизни.</p><p>- Отказаться от курения (если курите).</p><p>- Заниматься спортом.</p><p>- Выезжать за город на «свежий воздух», увлажнять воздух  и проветривать помещения, где живёте.</p><p>- Исключить переохлаждения или перегревов (одеваться по погоде).</p><p>- В сезон ОРВИ принимать витамины, избегать контактов с больными людьми, соблюдать правила личной гигиены.</p>'

        event.target.setAttribute('disabled', 'disabled')
        fetch(this.templatePath).then(response => {
          return response.text()
        }).then(talon => {
          // console.warn('ТАЛОН TEMPALTE', talon)
          let data = {
            result: html
          }
          for (let k in data) {
            if (data.hasOwnProperty(k)) {
              if (typeof data[k] !== 'undefined') {
                talon = talon.replace(`{${k}}`, data[k])
              }
            }
          }
          // console.warn('ТАЛОН СФОРМИРОВАН', talon)
          let logger = PromobotLogger.getInstance()
          let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
          this.$store.dispatch('robot/setPrinterData', {
            meta: { eventId },
            data: {
              mimeType: 'text/html',
              talon
            }
          })
        })
      }
    },
    saveAnswer: function (data) {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch(data.name, {
        meta: { eventId },
        data: data.data
      })
      let date = new Date()
      this.spirographiaLc.push({
        'name': data.name,
        'options': data.data,
        'type': 'manual',
        'date': date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      })
      let nexState = 'MEASUREMENT_4_8'
      if (data.name === 'ui/setUserSpirographiaQ2') {
        let lc = JSON.parse(localStorage.getItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id))) || {}
        if (this.getMeasuredData !== null && this.getMeasuredData.filter(item => {
          return item.data === null
        }).length === 0) {
          let date = new Date()
          this.getMeasuredData.forEach(item => {
            this.spirographiaLc.push({
              'name': item.name,
              'options': item.data,
              'type': 'auto',
              'date': date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            })
          })
        }
        lc[this.getMeasurementNum] = this.spirographiaLc
        localStorage.setItem('med_' + String(this.$store.getters['faces/getUserGeneral'].id), JSON.stringify(lc))
        nexState = 'MEASUREMENT_4_9'
      }
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: nexState
      })
    },
    btnName: function (name, isActiveTimer) {
      if (typeof isActiveTimer !== 'undefined') {
        if (this.activeTimer === true) {
          return name
        } else if (this.activeTimer > 0) {
          return name + ' (через<div style="display:inline-block;min-width:25px;text-align:center;">' + this.activeTimer / 1000 + '</div>с)'
        } else {
          return name
        }
      } else {
        return name
      }
    },
    doBtnAction: function (btnAction) {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      btnAction.forEach(item => {
        setTimeout(() => {
          this.$store.dispatch(item.name, { meta: { eventId }, data: item.options })
        }, item.timeout)
      })
    },
    getData: function (data, name) {
      return (this.getMeasuredData.filter(item => { return item.data === null }).length > 0) ? '---' : data
    },
    getDopData: function (data, name) {
      return (this.getMeasuredData.filter(item => { return item.data === null }).length > 0) ? '' : (name === 'ui/setUserArtPressure') ? '/' + this.getMeasuredData.filter(item => { return item.name === 'ui/setUserArtPressureLow' })[0].data : ''
    },
    resultAction: function (actions) {
      // console.log(actions)
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      actions.forEach(item => {
        this.$store.dispatch(item.name, { meta: { eventId }, data: item.options })
      })
    }
  }
}
</script>

@font-face {
font-family: Circe;
src: url(../../assets/fonts/Circe/Circe-Regular.ttf);
}

<style lang="scss" scoped>

  .fade-enter-active {
      transition: opacity .25s;
  }

  .fade-leave-active {
      display: none;
  }

  .fade-enter, .fade-leave-to {
      opacity: 0;
  }

  .measurement {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .result {
          text-align: center;

          p {
              font-family: Circe;
              font-size: 30px;
              line-height: 44px;
              text-align: center;
              color: #464646;
          }

          .container {
              width: 820px;
              margin-bottom: 50px;

              > div {
                  > div {
                      display: inline-block;
                      white-space: nowrap;
                      text-align: center;

                      > div {
                          display: inline-block;
                          vertical-align: middle;
                          padding: 10px;

                          h3 {
                              font-family: Circe;
                              font-size: 90px;
                              line-height: 90px;
                              color: #464646;
                              margin: 10px 0;
                              display: inline-block;
                          }

                          h4 {
                              font-family: Circe;
                              font-size: 50px;
                              line-height: 50px;
                              color: #464646;
                              margin: 10px 0;
                              display: inline-block;
                          }

                          p {
                              font-family: Circe;
                              font-size: 30px;
                              line-height: 44px;
                              margin: 10px 0;
                              color: #b2b2b2;
                          }
                      }

                      > div:last-child {
                          text-align: left;
                      }
                  }

                  > div:last-child {
                      text-align: center;
                  }

                  > div:first-child {
                      text-align: center;
                  }
              }
          }

          .btn {
              margin: 10px;
          }
      }

      .container {
          width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          &__wrapper {
              display: flex;
              align-items: center;
              justify-content: space-between;
          }

          > div {
              flex: 1 1 100px;
          }

          > div:last-child {
              text-align: right;
          }

          h3 {
              font-family: Circe;
              font-size: 52px;
              line-height: 62px;
              color: #464646;
              margin: 10px 0;
              font-weight: normal;
              display: inline-block;
              text-align: left;
          }

          h4 {
              font-family: Circe;
              font-size: 50px;
              line-height: 50px;
              color: #464646;
              margin: 10px 0;
              display: inline-block;
              text-align: left;
          }

          p {
              font-family: Circe;
              font-size: 30px;
              line-height: 44px;
              color: #464646;
              text-align: left;
          }

          span {
              font-family: Circe;
              font-size: 40px;
              line-height: 40px;
          }

          .video {
              display: block;
              height: 480px;
          }
      }

      .result {
          .container {
              > div,
              > div:last-child {
                  text-align: center;
              }
          }
      }

      .btn, .btn_psevdo {
          display: inline-block;
          vertical-align: middle;
          background: transparent;
          box-sizing: border-box;
          border-radius: 4px;
          border: 1px solid transparent;
          padding: 0 25px;
          min-height: 64px;
          font-family: Circe;
          font-size: 22px;
          line-height: 22px;
          font-style: normal;
          font-weight: 500;
          color: #fff;
          margin: 10px 10px 10px 0;
          border: 0;
          min-width: 270px;
          text-align: center;
          cursor: pointer;

          div {
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;

              > img {
                  display: inline-block;
                  vertical-align: middle;
                  max-height: 40px;
              }
          }
      }

      .btn_psevdo {
          width: auto;
          padding: 13px 10px;
      }

      .btn[disabled] {
          opacity: 0.5;
      }

      .questions {
          text-align: center;

          > div {
              max-width: 1100px;
              padding: 10px;
              box-sizing: border-box;

              p {
                  font-family: Circe;
                  font-size: 30px;
                  line-height: 44px;
                  color: #464646;
                  min-height: 200px;
              }

              button {
                  margin: 0 10px;
              }
          }
      }

      .resultSpirographia {
          text-align: center;

          > div {
              max-width: 1100px;
              padding: 5px;
              box-sizing: border-box;

              p {
                  font-family: Circe;
                  font-size: 24px;
                  line-height: 35px;
                  color: #464646;
                  margin: 0;
              }

              h3 {
                  font-family: Circe;
                  font-size: 30px;
                  line-height: 44px;
                  text-align: center;
                  font-weight: normal;
                  color: #464646;
                  margin: 0 0 10px;
              }

              button {
                  margin: 0 10px;
              }
          }
      }

      .resultSpirographiaDiv {
          width: 900px;
          margin: 0 auto;
          font-size: 0;

          > div[data-result="0"] {
              background: #95C136
          }

          > div[data-result="1"] {
              background: #FEB041
          }

          > div[data-result="2"] {
              background: #FD572F
          }

          > div[data-result="3"] {
              background: #B82F14
          }

          > div {
              display: inline-block;
              width: 370px;
              height: 126px;
              border-radius: 4px;
              border: 1px solid transparent;
              background: linear-gradient(227.09deg, #63E2FF 0%, #A966FE 100%);
              margin: 10px;

              > table {
                  width: 100%;
                  height: 100%;
                  border-spacing: 0;

                  td {
                      padding: 0 12px;
                      vertical-align: middle;
                      text-align: left;

                      p {
                          font-family: Circe;
                          font-size: 18px;
                          line-height: 18px;
                          padding: 0;
                          margin: 0;
                          color: #fff;
                      }

                      span {
                          font-family: Circe;
                          font-size: 25px;
                          line-height: 25px;
                          padding: 0;
                          margin: 0;
                          color: #fff;
                      }

                      h2 {
                          font-family: Circe;
                          font-size: 51px;
                          line-height: 51px;
                          display: inline-block;
                          padding: 0;
                          margin: 0;
                          color: #fff;
                          font-weight: normal;
                      }
                  }
              }
          }
      }
  }

</style>
