const header = document.getElementById('header')
const loadingScreen = document.getElementById('loading-screen')
const chooseSongDiv = document.getElementById('choose-song')
const lyricContainer = document.getElementById('lyric-container')
const song = document.getElementById('audio')
const video = document.getElementById('video')
const pressStart = document.getElementById('press-start')
const chooseSongH2 = document.getElementById('choose-song-h2')
const roarH2 = document.getElementById('choose-roar')
const everlongH2 = document.getElementById('choose-everlong')
const wonderfulWorldH2 = document.getElementById('choose-wonderful-world')
const gangsterH2 = document.getElementById('choose-gangster')
const bustaH2 = document.getElementById('choose-busta')
const scoreDiv = document.getElementById("score-div")
const scoreArea = document.getElementById("score")
const highScoreArea = document.getElementById("high-score")
const strikesDiv = document.getElementById('strikes')
const strikesCount = document.getElementById("strikesP")
const strikesQuit = document.getElementById("strikesQuit")
const strikesHeader = document.getElementById("strikes-header")
const loseBox = document.getElementById("lose")
const highScoreBox = document.getElementById('highscore-div')
const usernameForm = document.getElementById('username-form')
const usernameInput = document.getElementById('username-input')
const elem = document.getElementById('terminal');
const tenStrikes = document.getElementById('ten-strikes')
const songStore = []
const lyricStore = []

let n = 0
let duration = 0
let counter = -1
let gameOver = false
let string = elem.innerHTML;
let i = 0;
let correctLetters = ""
let letters = ""
let currentScore
let strikes
let thisSong
let lyrics
let delay
let username
let countdown
let interval
let timeout
let countdownTimeout
