import {
  getCardiologist,
  getNeurologist,
  getGastroenterologist,
  getGynecologist,
  getUrologist,
  getColoproctologist,
  getOphthalmologist,
  getOtorinolaryngologist,
  getEndocrinologist
} from '../dataStorage/specialist_question'

export function getName (number) {
  switch (number) {
    case 0: return 'Кардиолог'
    case 1: return 'Невролог'
    case 2: return 'Гастроэнтеролог'
    case 3: return 'Гинеколог'
    case 4: return 'Уролог'
    case 5: return 'Колопроктолог'
    case 6: return 'Офтальмолог'
    case 7: return 'Оториноларинголог'
    case 8: return 'Эндокринолог'
  }
}

export function getDescription (number) {
  switch (number) {
    case 0: return 'кардиолога'
    case 1: return 'невролога'
    case 2: return 'гастроэнтеролога'
    case 3: return 'гинеколога'
    case 4: return 'уролога'
    case 5: return 'колопроктолога'
    case 6: return 'офтальмолога'
    case 7: return 'оториноларинголога'
    case 8: return 'эндокринолога'
  }
}

export function getResultGood (number) {
  switch (number) {
    case 0: return 'кардиологу'
    case 1: return 'неврологу'
    case 2: return 'гастроэнтерологу'
    case 3: return 'гинекологу'
    case 4: return 'урологу'
    case 5: return 'колопроктологу'
    case 6: return 'офтальмологу'
    case 7: return 'оториноларингологу'
    case 8: return 'эндокринологу'
  }
}

export function getLength (number) {
  switch (number) {
    case 0: return 7
    case 1: return 4
    case 2: return 6
    case 3: return 6
    case 4: return 4
    case 5: return 5
    case 6: return 4
    case 7: return 6
    case 8: return 6
  }
}

export function getQuestion (specialistNum, index) {
  switch (specialistNum) {
    case 0: return getCardiologist(index)
    case 1: return getNeurologist(index)
    case 2: return getGastroenterologist(index)
    case 3: return getGynecologist(index)
    case 4: return getUrologist(index)
    case 5: return getColoproctologist(index)
    case 6: return getOphthalmologist(index)
    case 7: return getOtorinolaryngologist(index)
    case 8: return getEndocrinologist(index)
  }
}

export function getPath (specialistNum) {
  switch (specialistNum) {
    case 0: return specialistNum + '_cardiologist'
    case 1: return specialistNum + '_neurologist'
    case 2: return specialistNum + '_gastroenterologist'
    case 3: return specialistNum + '_gynecologist'
    case 4: return specialistNum + '_urologist'
    case 5: return specialistNum + '_coloproctologist'
    case 6: return specialistNum + '_ophtalmologist'
    case 7: return specialistNum + '_otorinolaringologist'
    case 8: return specialistNum + '_endocrinologist'
  }
}
