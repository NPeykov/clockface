const s_hand_long = 101 
const m_hand_long = 80
const h_hand_long = 50

const secondHand = document.getElementById("second-hand")
const minuteHand = document.getElementById("minute-hand")
const hourHand = document.getElementById("hour-hand")

const dateFormat = document.getElementById("date-format")

function drawTimeInfo() {
  let time = new Date()
  ubicateSecondHand(time)
  ubicateMinuteHand(time)
  ubicateHourHand(time)
  drawDateFormat(time)
}

function ubicateSecondHand(time) {
  let seconds = time.getSeconds()
  let x = 150 + Math.round(Math.sin(Math.PI / 30 * seconds) * s_hand_long)
  let y = 150 + Math.round(- Math.cos(Math.PI / 30 * seconds) * s_hand_long)
  setHandPoint(secondHand, x, y)
}

function ubicateMinuteHand(time) {
  let minutes = time.getMinutes()
  let x = 150 + Math.round(Math.sin(Math.PI / 30 * minutes) * m_hand_long)
  let y = 150 + Math.round(- Math.cos(Math.PI / 30 * minutes) * m_hand_long)
  setHandPoint(minuteHand, x, y)
}

function ubicateHourHand(time) {
  let hours = time.getHours()
  let x = 150 + Math.round(Math.sin(Math.PI / 6 * hours) * h_hand_long)
  let y = 150 + Math.round(- Math.cos(Math.PI / 6 * hours) * h_hand_long)
  setHandPoint(hourHand, x, y)
}

function setHandPoint(hand, x, y) {
  hand.setAttribute("x2", x)
  hand.setAttribute("y2", y)
}

function drawDateFormat(time) {
  let format = ''
  let day = time.getDate()
  let month = time.getMonth() + 1
  let year = time.getFullYear()

  if(day < 10) {
    day = `0${day}`
  }
  if(month < 10) {
    month = `0${month}`
  }

  format = `${month}/${day}/${year}`
  
  dateFormat.innerHTML = format
}

function drawHourVectors() {
  for(var i = 1; i <= 12; i++) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      el.setAttribute('x1', '150');
      el.setAttribute('x2', '150');
      el.setAttribute('y1', '285');
    if(i % 3 == 0) {
      el.setAttribute('y2', '260');
      el.setAttribute('transform', 'rotate(' + (i*360/12) + ' 150 150)');
      el.setAttribute('style', 'stroke: #17202a; stroke-width: 3.5; stroke-linecap: round');
    } else {
      el.setAttribute('y2', '262');
      el.setAttribute('transform', 'rotate(' + (i*360/12) + ' 150 150)');
      el.setAttribute('style', 'stroke: #17202a; stroke-width: 2; stroke-linecap: round');
    }
    document.querySelector('svg').appendChild(el);
  }
}

function drawNonHourVectors() {
  for(var i = 1; i <= 60; i++) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    el.setAttribute('x1', '150');
    el.setAttribute('y1', '285');
    el.setAttribute('x2', '150');
    el.setAttribute('y2', '270');
    el.setAttribute('transform', 'rotate(' + (i*360/60) + ' 150 150)');
    el.setAttribute('style', 'stroke: #17202a; stroke-width: 1');
    document.querySelector('svg').appendChild(el);
  }
}

function drawVectors() {
  drawNonHourVectors()
  drawHourVectors()
}

function renderAll() {
  drawVectors()
  drawTimeInfo()
}

renderAll()

