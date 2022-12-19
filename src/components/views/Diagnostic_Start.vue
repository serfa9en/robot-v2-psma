<template>
    <div v-show="showComponent" class="settings">
        <p class="text">Пройти отдельное обследование</p>
        <button class="btn-dark-main">
            <img src="../../assets/img/diagnostic/blood-pressure.png" class="icon">
            <p>Артериальное давление <br> и пульс</p>
        </button>
        <button class="btn-dark-main">
            <img src="../../assets/img/diagnostic/union.png" class="icon">
            <p>Рост и вес</p>
        </button>
        <button class="btn-dark-main">
            <img src="../../assets/img/diagnostic/temperature.png" class="icon">
            <p>Температура тела</p>
        </button>
        <button class="btn-dark-main">
            <img src="../../assets/img/diagnostic/oxygen.png" class="icon">
            <p>Насыщение крови кислородом<br>(сатурация)</p>
        </button>
        <button class="btn-dark-main">
            <img src="../../assets/img/diagnostic/gluco.png" class="icon">
            <p>Глюкоза крови</p>
        </button>
        <button class="btn-dark-main">
            <img src="../../assets/img/diagnostic/spirometr.png" class="icon">
            <p>Функция легких<br>(спирометрия)</p>
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'diagnostic_start',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    showComponent () {
      return this.getStep === 'diagnostic_start'
    }
  }
}
</script>

<style scoped>
.settings {
    width: 100%;
    height: 690px;
    box-sizing: border-box;
    position: absolute;
    text-align: center;
    bottom: 0;
}

button {
    width: 380px;
    height: 200px;
    margin: 10px;
}

p {
    width: 100%;
    height: 2.5em;
    font-weight: 500;
    font-size: 22px;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    align-content: center;
}
.text {
    font-weight: 700;
    font-size: 30px;
    margin-top: 50px;
}

.icon {
    margin-top: 25px;
    width: 75px;
    height: auto;
}
</style>
