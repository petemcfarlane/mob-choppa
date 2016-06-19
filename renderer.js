const {ipcRenderer} = require('electron');

const phrases = [
  'Time to change fool!',
  'Get to the chopper!',
  'Bye bye',
  'You ARE the weakest link',
  'Tag out',
  'Have a break, have a katkit',
  'You idiot, you\'ll kill us alllll!!!',
  'Game over man!'
]

let durationMin = 6
let timeout
let silent = false

ipcRenderer.on('toggleSounds', (event, duration) => {
  silent = !silent
})

ipcRenderer.on('setDuration', (event, duration) => {
  durationMin = duration
  new Notification('Mob Choppa', {
    body: 'Duration changed to ' + duration + ' min',
    silent: true
  })
  clearTimeout(timeout)
  timer()
})

const audio = new Audio('./get-to-the-choppa.mp3')

function timer () {
  timeout = setTimeout(() => {
    if (!silent) {
      audio.play()
    }

    new Notification('Mob Choppa', {
      body: phrases[Math.floor(Math.random() * phrases.length)],
      silent: true
    })

    timer()

  }, durationMin * 60 * 1000)
}

timer();
