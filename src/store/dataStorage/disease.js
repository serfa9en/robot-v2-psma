export function getDiseaseName (number) {
  switch (number) {
    case 0: return 'Сахарный диабет'
    case 1: return 'Рефлюксная болезнь'
    case 2: return 'Депрессия'
    case 3: return 'Простатит'
  }
}

export function getContextDisease (number) {
  switch (number) {
    case 0: return 'сахарного диабета'
    case 1: return 'рефлюксной болезни'
    case 2: return 'депрессии'
    case 3: return 'простатита'
  }
}
