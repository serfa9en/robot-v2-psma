export function getNameStr (number) {
  switch (number) {
    case 0: return 'ui/setResultDiseaseCountOncologyMammaryCancer'
    case 1: return 'ui/setResultDiseaseCountOncologyStomachCancer'
    case 2: return 'ui/setResultDiseaseCountOncologyEsophagealCarcinoma'
    case 3: return 'ui/setResultDiseaseCountOncologyBladderCancer'
    case 4: return 'ui/setResultDiseaseCountOncologyLungCancer'
    case 5: return 'ui/setResultDiseaseCountOncologyMelanoma'
    case 6: return 'ui/setResultDiseaseCountOncologySkinCancer'
    case 7: return 'ui/setResultDiseaseCountOncologyThroatCancer'
    case 8: return 'ui/setResultDiseaseCountOncologyLaryngealCancer'
    case 9: return 'ui/setResultDiseaseCountOncologyThyroidCancer'
    case 10: return 'ui/setResultDiseaseCountOncologyBowelCancer'
  }
}

export function getOncologyName (number) {
  switch (number) {
    case 0: return 'Рак молочной железы'
    case 1: return 'Рак желудка'
    case 2: return 'Рак пищевода'
    case 3: return 'Рак предстательной железы, рак мочевого пузыря'
    case 4: return 'Рак легкого'
    case 5: return 'Меланома'
    case 6: return 'Рак кожи'
    case 7: return 'Рак органов полости рта и глотки'
    case 8: return 'Рак гортани'
    case 9: return 'Рак щитовидной железы'
    case 10: return 'Рак кишечника'
  }
}

export function getContextOncology (number) {
  switch (number) {
    case 0: return 'рака молочной железы'
    case 1: return 'рака желудка'
    case 2: return 'рака пищевода'
    case 3: return 'рака предстательной железы и(или) рака мочевого пузыря'
    case 4: return 'рака легкого'
    case 5: return 'меланомы'
    case 6: return 'рака кожи'
    case 7: return 'рака органов полости рта и глотки'
    case 8: return 'рака гортани'
    case 9: return 'рака щитовидной железы'
    case 10: return 'рака кишечника'
  }
}

export function getPathOncology (number) {
  switch (number) {
    case 0: return number + '_mammary_cancer'
    case 1: return number + '_stomach_cancer'
    case 2: return number + '_esophageal_carcinoma'
    case 3: return number + '_bladder_cancer'
    case 4: return number + '_lung_cancer'
    case 5: return number + '_melanoma'
    case 6: return number + '_skin_cancer'
    case 7: return number + '_throat_cancer'
    case 8: return number + '_laryngeal_cancer'
    case 9: return number + '_thyroid_cancer'
    case 10: return number + '_bowel_cancer'
  }
}

export function getQuestion (number, index) {
  // number - номер болезни
  // index - индекс вопроса
  switch (number) {
    case 0: return getMammaryCancer(index)        // рак молочной железы
    case 1: return getStomachCancer(index)        // рак желудка
    case 2: return getEsophagealCarcinoma(index)  // рак пищевода
    case 3: return getBladderCancer(index)        // рак мочевого пузыря
    case 4: return getLungCancer(index)           // рак легкого
    case 5: return getMelanoma(index)             // меланома
    case 6: return getSkinCancer(index)           // рак кожи
    case 7: return getThroatCancer(index)         // рак глотки
    case 8: return getLaryngealCancer(index)      // рак гортани
    case 9: return getThyroidCancer(index)        // рак щитовидной железы
    case 10: return getBowelCancer(index)         // рак кишечника
  }
}

export function getPoints (number, index) {
  // number - номер болезни
  // index - индекс вопроса
  switch (number) {
    case 0: return getMammaryCancerPoint(index)        // рак молочной железы
    case 1: return getStomachCancerPoint(index)        // рак желудка
    case 2: return getEsophagealCarcinomaPoint(index)  // рак пищевода
    case 3: return getBladderCancerPoint(index)        // рак мочевого пузыря
    case 4: return getLungCancerPoint(index)           // рак легкого
    case 5: return getMelanomaPoint(index)             // меланома
    case 6: return getSkinCancerPoint(index)           // рак кожи
    case 7: return getThroatCancerPoint(index)         // рак глотки
    case 8: return getLaryngealCancerPoint(index)      // рак гортани
    case 9: return getThyroidCancerPoint(index)        // рак щитовидной железы
    case 10: return getBowelCancerPoint(index)         // рак кишечника
  }
}

export function getLengthPoints (number) {
  switch (number) {
    case 0: return 6
    case 1: return 6
    case 2: return 4
    case 3: return 6
    case 4: return 6
    case 5: return 9
    case 6: return 8
    case 7: return 9
    case 8: return 12
    case 9: return 7
    case 10: return 4
  }
}

// рак молочной железы
export function getMammaryCancer (index) {
  const question = [6]
  question[0] = 'Отмечаете ли вы изменение формы молочной железы или выделение из соска?'
  question[1] = 'Страдаете (страдали) ли вы бесплодием или длительной лактацией?'
  question[2] = 'Вы переносили операции или травмы на молочной железе?'
  question[3] = 'Вы отмечали наличие у себя мастопатии (уплотнения, новообразования в молочной железе, втяжения, трещины или выделения из сосков, ощущение тяжести или распирания в области железы, тупые ноющие боли)'
  question[4] = 'Вы отмечали наличие у кровных родственников злокачественных новообразований кишечника, молочной железы, тела матки?'
  question[5] = 'Вы старше 50 лет?'
  return (question[index])
}

// рак желудка
export function getStomachCancer (index) {
  const question = [6]
  question[0] = 'Страдаете ли вы язвенной болезнью желудка более 10 лет?'
  question[1] = 'Вы старше 40 лет?'
  question[2] = 'Отмечали ли вы снижение аппетита, потеря веса, слабость, отвращение к пище, тяжесть после приема пищи?'
  question[3] = 'Страдают ли ваши кровные родственники раком желудка?'
  question[4] = 'Выявляли у вас когда-либо аденоматозные полипы желудка?'
  question[5] = 'Вы страдаете атрофическим гастритом?'
  return (question[index])
}

// рак пищевода
export function getEsophagealCarcinoma (index) {
  const question = [4]
  question[0] = 'Отмечали ли вы нарушения проходимости пищи?'
  question[1] = 'Были ли у вас операции на пищевода?'
  question[2] = 'Вы испытываете боль и затруднения при глотании?'
  question[3] = 'Вы старше 50 лет?'
  return (question[index])
}

// рак мочевого пузыря
export function getBladderCancer (index) {
  const question = [6]
  question[0] = 'Отмечали ли вы кровь в моче?'
  question[1] = 'Была ли ранее у вас острая задержка мочи?'
  question[2] = 'Вы испытываете боли при мочеиспускании или неприятные ощущения?'
  question[3] = 'Вы старше 50 лет?'
  question[4] = 'В вашей семье есть родственники, страдающие рак мочевого пузыря или предстательной железы?'
  question[5] = 'Вы испытываете ночное мочеиспускание, неполное опорожнение мочевого пузыря, вялая струя мочи, мочеиспускание малыми порциями?'
  return (question[index])
}

// рак легкого
export function getLungCancer (index) {
  const question = [6]
  question[0] = 'Испытываете ли вы слабость, одышку, боли в грудной клетке?'
  question[1] = 'Бывает ли у вас кровохарканье?'
  question[2] = 'Отмечали ли вы у себя длительный кашель?'
  question[3] = 'Если вы курите, замечали ли вы у себя изменения в кашле?'
  question[4] = 'Вы работаете на вредном предприятии (контакт с асбестом, цементом и др.)?'
  question[5] = 'Вы курите?'
  return (question[index])
}

// меланома
export function getMelanoma (index) {
  const question = [9]
  question[0] = 'Отмечали ли появление зуда, покалывания в области родинки?'
  question[1] = 'Замечали ли вы быстрый рост родимого пятна?'
  question[2] = 'Замечали ли вы увеличение, уплотнение, кровоточивость родимого пятна?'
  question[3] = 'Вы имеете более 50 родимых пятен?'
  question[4] = 'Вы имеете пигментное пятно более 1,5 см.?'
  question[5] = 'Ваши родственники страдают меланомой?'
  question[6] = 'Вы часто контактируете с химическими канцерогенами, ионизирующим излучением?'
  question[7] = 'Вы подвержены частым воздействиям солнечных лучей?'
  question[8] = 'Вы имеете светлую кожу, светлые волосы и глаза?'
  return (question[index])
}

// рак кожи
export function getSkinCancer (index) {
  const question = [8]
  question[0] = 'Отмечали ли появление зуда, покалывания в области родинки?'
  question[1] = 'Замечали ли вы быстрый рост родимого пятна?'
  question[2] = 'Замечали ли вы увеличение, уплотнение, кровоточивость родимого пятна?'
  question[3] = 'Вы отмечали увеличение лимфатических узлов?'
  question[4] = 'Вы замечали разрастания на некоторых участках кожи в виде бородавок?'
  question[5] = 'Вы отмечали болезненные уплотнения и длительно незаживающие язвы на коже?'
  question[6] = 'Вы подвержены частым воздействиям солнечных лучей?'
  question[7] = 'Вы старше 50 лет?'
  return (question[index])
}

// рак глотки
export function getThroatCancer (index) {
  const question = [9]
  question[0] = 'Чувствуете ли вы онемение языка?'
  question[1] = 'Испытываете ли вы припухлость, утолщение языка длительное время?'
  question[2] = 'Беспокоит ли вас затруднение жевания, глотания, движения челюстью или языком?'
  question[3] = 'Испытываете ли вы боль в полости рта?'
  question[4] = 'Имеете ли вы длительно незаживающую язву в полости рта?'
  question[5] = 'Контактируете ли вы с продуктами переработки нефти?'
  question[6] = 'Имеете ли вы контакт с жидкими смолами?'
  question[7] = 'Травмировали ли вы многократно слизистую оболочку полости рта?'
  question[8] = 'Вы курите или часто употребляете крепкие спиртные напитки?'
  return (question[index])
}

// рак гортани
export function getLaryngealCancer (index) {
  const question = [12]
  question[0] = 'Отмечаете ли вы осиплость голоса более 2 недель подряд?'
  question[1] = 'Заметили ли вы снижение веса?'
  question[2] = 'Ощущаете ли вы затруднения дыхания?'
  question[3] = 'Беспокоит ли вас непроходимая боль в ухе?'
  question[4] = 'Испытываете ли вы боль или затруднения при глотании?'
  question[5] = 'Отмечали и вы увеличение лимфатических узлов на шее?'
  question[6] = 'Вы заметили охриплость или изменения тембра голоса?'
  question[7] = 'Бывает ли, что вам тяжело откашляться?'
  question[8] = 'Ощущаете ли присутствие инородного тела в гортани?'
  question[9] = 'Вы курите?'
  question[10] = 'Вы страдаете хроническим ларингитом или фарингитом?'
  question[11] = 'Вы страдаете папилломатозом гортани?'
  return (question[index])
}

// рак щитовидной железы
export function getThyroidCancer (index) {
  const question = [7]
  question[0] = 'Вы испытываете чувство давления в области шеи, охриплость, нарушение глотания?'
  question[1] = 'Вы пребывали в районах с повышенным уровнем радиации (Чернобыль, Маяк и т.д.)?'
  question[2] = 'В вашей семье кто-либо страдает раком щитовидной железы?'
  question[3] = 'Вам проводили лечение радиоактивными лучами шеи и головы в детстве и юношеском возрасте?'
  question[4] = 'Вы отмечали повышенный уровень гормонов щитовидной железы?'
  question[5] = 'Вы имеете доброкачественные образования в области шеи?'
  question[6] = 'Вы старше 50 лет?'
  return (question[index])
}

// рак кишечника
export function getBowelCancer (index) {
  const question = [4]
  question[0] = 'Вы отмечали кровь в кале?'
  question[1] = 'У вас имеются полипы толстого кишечника, образования, разрастания в области ануса?'
  question[2] = 'В вашей семье кто-либо страдает раком желудочно-кишечного тракта?'
  question[3] = 'Вы старше 45 лет?'
  return (question[index])
}

// рак молочной железы
export function getMammaryCancerPoint (index) {
  let points = [6]
  points = [6, 3, 6, 3, 3, 3]
  return (points[index])
}

// рак желудка
export function getStomachCancerPoint (index) {
  let points = [6]
  points = [2, 2, 3, 3, 3, 3]
  return (points[index])
}

// рак пищевода
export function getEsophagealCarcinomaPoint (index) {
  let points = [4]
  points = [5, 5, 5, 3]
  return (points[index])
}

// рак мочевого пузыря
export function getBladderCancerPoint (index) {
  let points = [6]
  points = [5, 3, 2, 2, 2, 3]
  return (points[index])
}

// рак легкого
export function getLungCancerPoint (index) {
  let points = [6]
  points = [3, 10, 3, 5, 3, 5]
  return (points[index])
}

// меланома
export function getMelanomaPoint (index) {
  let points = [9]
  points = [2, 5, 5, 2, 2, 2, 2, 2, 2]
  return (points[index])
}

// рак кожи
export function getSkinCancerPoint (index) {
  let points = [8]
  points = [2, 5, 7, 7, 3, 4, 3, 3]
  return (points[index])
}

// рак глотки
export function getThroatCancerPoint (index) {
  let points = [9]
  points = [7, 7, 7, 8, 9, 6, 6, 4, 3]
  return (points[index])
}

// рак гортани
export function getLaryngealCancerPoint (index) {
  let points = [12]
  points = [4, 3, 3, 3, 4, 7, 7, 4, 7, 5, 5, 5]
  return (points[index])
}

// рак щитовидной железы
export function getThyroidCancerPoint (index) {
  let points = [7]
  points = [3, 5, 5, 3, 3, 3, 3]
  return (points[index])
}

// рак кишечника
export function getBowelCancerPoint (index) {
  let points = [4]
  points = [3, 3, 3, 2]
  return (points[index])
}
