<template>
    <div v-show=true class="settings">
        <div>
           <p class="text">Пожалуйста, введите Ваш возраст!</p>
          <input placeholder="Введите возраст..." id="userAge">
        </div>
        <button v-on:click="next" class="btn-next text-white">Далее</button>
    </div>
</template>

<script>
export default {
  name: 'age_view',
  computed: {
    showComponent () {
      return this.getStep === 'age_view'
    }
  },
  methods: {
    next: function () {
      console.warn('AGE!')
      const age = document.getElementById('userAge').value
      console.log(age)

      // проверка, что поле не пустое
      // проверка на число
      // проверка, что целое
      // меньше 10 - Вы уверены?
      if (age === '') {
        // пусто
        console.log('ПУСТО')
      } else
      if (!isNaN(age)) {
        // Число
        console.log('Число')
        console.log(Number.isInteger(15))
        console.log(Number.isInteger(age))
        if ((age ^ 0) === age) {
          // Целое
          console.log('ЦЕЛОЕ')
        }
      }
    }
  }
}
</script>

<style scoped>
.settings {
  width: 100%;
  text-align: center;
}
.text {
  font-size: 30px;
}

input {
  width: 600px;
  height: 64px;
  background: #EAE8E8;
  border: 2px solid #3E0E14;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 32px;
  padding-left: 27px;
  color: #3E0E14;
}

input::placeholder {
  color: #B1A7A6
}

button {
  width: 235px;
  height: 70px;
  margin: 50px;
  font-size: 26px;
}

</style>
