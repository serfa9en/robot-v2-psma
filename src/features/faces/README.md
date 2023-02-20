Подключение:
##### module, plugin, logic необходимо подключать в store
```javascript
import facesModule from '@/features/faces/module'
import facesPlugin from '@/features/faces/plugin'
import facesLogic from '@/features/faces/logic'

export default (logger, promobot) => ({
  strict: true,
  modules: {
    // ...
    faces: facesModule,
    // ...
  },
  plugins: [
    // ...
    facesPlugin(logger),
    facesLogic(logger),
    // ...
  ]
})
```

#### API:
| метод | описание |
|--------|----------|
|`refresh`|обновляет данные|
|`clearState`|выставляет все настройки по умолчанию|

| setter | описание | type | default |
|--|--|--|--|
|`setTimeoutsLostUser`|устанавливает таймер потери главного (миллисекунды)|Number|15000|
|`setTimeoutsSetOneGeneral`|устанавливает таймер назначения одного главным (милисекунды)|Number|1000|
|`setLogicDbRequest`|запрашивать данные о сессионном пользователе| Boolean | false|
|`setLogicStatesIsPrivate`|установить приватное состояние (при потере главного userLost сразу выставляется в true)|Boolean|false|
|`setLogicStatesIsExclude`|отключить логику работы с главным|Boolean|false|
|`setAllowOneGeneral`|логика назначения одного главным|Boolean|false|

| getter | описание | type | default |
|--|--|--|--|
|`getStateCount`| возвращает количество лиц перед роботом (NONE - лиц нет, ONE - одно лицо, MANY - больше 1 лица) | String | ZERO
|`getStateKnown`| возвращает наличие пользователя в базе лиц (KNOWN - есть совпадение в базе, TEMP - нет совпадения в базе лиц, NONE - лиц нет или не распознано) | String | NONE
|`getStateGeneral`| возвращает статус сессии с главным пользователем (NONE - главный не назначен, GENERAL - главный назначен и находится перед роботом, WAIT - главный назначен, но робот его не видит) | String | NONE
|`getUserGeneral`| возвращает объект сессионного пользователя | Object | {}
|`getUserLost`| возвращает флаг, что сессионный пользователь потерян | Boolean | false
|`getTimeoutsLostUser`| возвращает таймаут потери главного | Number | 15000
|`getTimeoutsSetOneGeneral`| устанавливает таймер назначения одного главным (милисекунды) | Number | 1000
|`getLogicDbRequest`| возвращает флаг для запроса данных о сессионном пользователе | Boolean | false
|`getLogicStatesIsPrivate`| возвращает флаг состояния находится ли модуль в приватном состоянии | Boolean | false
|`getLogicStatesIsExclude`| возвращает флаг состояния включена логика работы с главным или нет | Boolean | false
|`getLogicAllowOneGeneral`| возвращает флаг состояния включена логика назначения одного главным или нет | Boolean | true

| hook | описание |
|--|--|
|`HOOK_ZERO`| Нет главного и все ушли |
|`HOOK_MANY`| Нет главного пришло много |
|`HOOK_START`| Сообщает, что сессия началась. Возвращает объект пользователя |
|`HOOK_COMPLETED`| Пришла информация из БД. Возвращает объект пользователя |
|`HOOK_LOST`| Пользователь потерян |
|`HOOK_FIND`| Пользователь вернулся |
|`HOOK_TIMER_END`| Закончился таймер потери главного |
|`HOOK_CLEAN`| Сообщает, что сессия завершилась |

##### COMPONENT
###### usage:  
```html
<template>
    <Unsee/>
</template>
```

```javascript
<script>
import Unsee from '@/features/faces/components/Unsee'
export default {
    components: {
        Unsee
    }
}
</script>
```

##### props
`title` - текст заголовка (def:Я потерял вас)  
`description` - текст описания (def:Пожалуйста, вернитесь в кадр для продолжения)  
`button` - текст кнопки (def:Начать сначала)  
`action` - функция, которая будет вызвана при нажатии на кнопку (def:переход в состояние WAIT)  
`customClass` - для переопределения стандартных стилей вы можете использовать свой класс с каскадом стилей в глобальном css  
**Пример переопределения стилей:**
```html
<Unsee customClass="my-custom-class"/>

<!-- Данный код сработает, т.к. применяет стили глобально -->
<style lang="scss">
.my-custom-class {
  .unsee-button {
    border-radius: 5px;
    border: 0;
    background-color: #54c8ff;
    color: #fff;
    font-size: 32px;
  }
}
</style>

<!-- Данный код НЕ сработает, т.к. применяет стили локально -->
<style lang="scss" scoped>
.my-custom-class {
  .unsee-button {
    border-radius: 5px;
    border: 0;
    background-color: #54c8ff;
    color: #fff;
    font-size: 32px;
  }
}
</style>
```
##### CSS Styles
**.unsee-container** - контейнер компонента  
**.unsee-title** - заголовок  
**.unsee-description** - описание  
**.unsee-button** - кнопка  
**.unsee-video-container** - обертка для видео потока  
**.unsee-overlay** - затемнение видео потока  
**.unsee-video** - видео поток  
**.unsee-lost-face** - лицо главного  
**.unsee-timer** - таймер
