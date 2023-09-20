export function type0 () {
  let item = [4]
  item[0] = 'Печать'
  item[1] = 'На почту'
  item[2] = 'Очистить'
  item[3] = 'Завершить'
  return item
}

export function type1 (ind) {
  let item = [5]
  item[0] = 'На главную'
  item[1] = 'Печать'
  item[2] = 'На почту'
  item[3] = 'Очистить'
  item[4] = 'Завершить'
  return item[ind]
}

export function setType2 () {
  let name = 'специалиста'
  return name
}

export function type2 (ind) {
  let item = [6]
  item[0] = 'К выбору ' + setType2()
  item[1] = 'На главную'
  item[2] = 'Печать'
  item[3] = 'На почту'
  item[4] = 'Очистить'
  item[5] = 'Завершить'
  return item[ind]
}

export function type3 (ind) {
  let item = [7]
  item[0] = 'К выбору онкологии'
  item[1] = 'К выбору болезни'
  item[2] = 'На главную'
  item[3] = 'Печать'
  item[4] = 'На почту'
  item[5] = 'Очистить'
  item[6] = 'Завершить'
  return item[ind]
}
