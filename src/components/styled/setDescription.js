export function getDescription (val) {
  switch (val) {
    case 0: return getSpecialist()
    case 1: return getDiagnostic()
    case 2: return getExam()
    case 3: return getDisease()
  }
}

export function getSpecialist () {
  let str = ''
  str += 'В данном разделе можно пройти опрос (консультацию)'
  str += ' узкого специалиста\n'
  return str
}

export function getDiagnostic () {
  let str = ''
  str += 'В данном разделе можно измерить артериальное давление,'
  str += ' температуру, сатурацию и глюкозу крови'
  str += ''
  return str
}

export function getExam () {
  let str = ''
  str += 'Комлексное обследование - это измерение всех показателей здоровья'
  str += ''
  str += ''
  return str
}

export function getDisease () {
  let str = ''
  str += 'В данном разделе можно пройти опрос по симптомам болезней и определить риск развития'
  str += ''
  str += ''
  return str
}
