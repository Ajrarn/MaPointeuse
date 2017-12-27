export function padTime (nombre) {
  if (nombre < 10) {
    return `0${nombre}`
  } else {
    return nombre
  }
}

export function convertSecondesEnMMss (secondesIn) {
  if (secondesIn) {
    let minutes = Math.floor(secondesIn / 60)
    let secondes = secondesIn % 60
    return `${padTime(minutes)}:${padTime(secondes)}`
  } else {
    return '00:00'
  }
}

export function convertMMssEnsecondes (mmss) {
  if (mmss) {
    let mmssArray = mmss.split(':')
    let minutes = Number.parseInt(mmssArray[0])
    let secondes = Number.parseInt(mmssArray[1])
    return minutes * 60 + secondes
  } else {
    return 0
  }
}

export function convertSecondesEnHHmm (secondesIn) {
  if (secondesIn) {
    let heures = Math.floor(secondesIn / 3600)
    let minutes = Math.floor((secondesIn % 3600) / 60)
    return `${padTime(heures)}:${padTime(minutes)}`
  } else {
    return '00:00'
  }
}

export function convertHHmmEnsecondes (hhmm) {
  if (hhmm) {
    let hhmmArray = hhmm.split(':')
    let heures = Number.parseInt(hhmmArray[0])
    let minutes = Number.parseInt(hhmmArray[1])
    return heures * 3600 + minutes * 60
  } else {
    return 0
  }
}

export function convertSecondesEnHHMMss (secondesIn) {
  if (secondesIn) {
    let heures = Math.floor(secondesIn / 3600)
    let minutes = Math.floor((secondesIn % 3600) / 60)
    let secondes = (secondesIn % 3600) % 60
    return `${padTime(heures)}:${padTime(minutes)}:${padTime(secondes)}`
  } else {
    return '00:00'
  }
}

export function convertHHMMssEnsecondes (hhmmss) {
  if (hhmmss) {
    let hhmmssArray = hhmmss.split(':')
    let heures = Number.parseInt(hhmmssArray[0])
    let minutes = Number.parseInt(hhmmssArray[1])
    let secondes = Number.parseInt(hhmmssArray[2])
    return heures * 3600 + minutes * 60 + secondes
  } else {
    return 0
  }
}
