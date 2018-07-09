document.addEventListener("DOMContentLoaded", function(){

  const header = document.getElementById('header')
  const chooseSongDiv = document.getElementById('choose-song')
  const lyricContainer = document.getElementById('lyric-container')
  const song = document.getElementById('audio')
  const video = document.getElementById('video')
  const strikesDiv = document.getElementById('strikes')
  const scoreDiv = document.getElementById("score-div")
  const pressStart = document.getElementById('press-start')
  const chooseSongH2 = document.getElementById('choose-song-h2')
  const roarH2 = document.getElementById('choose-roar')
  const everlongH2 = document.getElementById('choose-everlong')
  const wonderfulWorldH2 = document.getElementById('choose-wonderful-world')
  const gangsterH2 = document.getElementById('choose-gangster')
  const bustaH2 = document.getElementById('choose-busta')
  const scoreBox = document.getElementById('score-div')
  const scoreArea = document.getElementById("score")
  const highScoreArea = document.getElementById("high-score")
  const strikeBox = document.getElementById('strikes')
  const strikesCount = document.getElementById("strikesP")
  const loseBox = document.getElementById("lose")
  const highScoreBox = document.getElementById('highscore-div')
  const usernameForm = document.getElementById('username-form')
  const usernameInput = document.getElementById('username-input')
  const elem = document.getElementById('terminal');
  const tenStrikes = document.getElementById('ten-strikes')

  let counter = -1
  let gameOver = false
  let string = elem.innerHTML;
  let len = string.length;
  let i = 0;
  let currentScore
  let strikes
  let thisSong
  let lyrics
  let delay
  let username
  let countdown
  let interval

  function loop() {
    setTimeout(function() {
      elem.style.display = 'block';
      elem.innerHTML = splitString(string, i);
      i++;

      if (i < len + 1) {
        loop();
        return;
      }

      elem.setAttribute('class', 'blink');
    }, 200)
  }

  function splitString(string, index) {
    return string.substring(0, index);
  }

  loop();


  usernameInput.focus()
  usernameForm.addEventListener('submit', submitUsername)

  function submitUsername(event){
    event.preventDefault()
    username = usernameInput.value
    songMenu()
  }

  function songMenu(){
    header.classList.add('hidden')
    pressStart.classList.add('hidden')
    chooseSongDiv.classList.remove('hidden')
    document.addEventListener('keydown', menuSelect)
  }

  function menuSelect(event){
    const array = [wonderfulWorldH2, everlongH2, roarH2, gangsterH2, bustaH2]
    const mp3Src = ['mp3s/what-a-wonderful-world.mp3', 'mp3s/everlong.mp3', 'mp3s/Roar.mp3', 'mp3s/gangster.mp3', 'mp3s/busta.wav']
    const currentTimeArr = [6, 34, 66, 63, 8]

    // if user presses down
    if(event.which === 40){
      if(counter > 3){
        return
      }
      else if(counter === -1){
        counter += 1
        array[counter].classList.add('song-select')
        song.src = mp3Src[counter]
        song.currentTime = currentTimeArr[counter];
        song.play()
      }
      else {
        array[counter].classList.remove('song-select')
        song.pause()
        counter += 1

        array[counter].classList.add('song-select')
        song.src = mp3Src[counter]
        song.currentTime = currentTimeArr[counter];
        song.play()
      }
    }
    // if user presses up
    else if(event.which === 38){
      if(counter < 1){
        return
      }
      else {
      array[counter].classList.remove('song-select')
      song.pause()
      counter -= 1

      array[counter].classList.add('song-select')
      song.src = mp3Src[counter]
      song.currentTime = currentTimeArr[counter];
      song.play()
      }
    }
    else if(event.which === 13){
      if(!array[counter]){
        return
      }

      song.pause()
      array[counter].classList.remove('song-select')
      document.removeEventListener('keydown', menuSelect)
      chooseSong(array[counter].id)
    }
  }

  function chooseSong(id){
    if(id === 'choose-roar'){
      video.src = 'video/Roar.mp4'
      song.src = 'mp3s/Roar.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 1)
      thisSong = songStore.find((object) => object.id === 1)
      delay = 19500

    }
    else if(id === 'choose-everlong'){
      video.src = 'video/everlong.mp4'
      song.src = 'mp3s/everlong.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 4)
      thisSong = songStore.find((object) => object.id === 4)
      delay = 34000
    }
    else if(id === 'choose-wonderful-world'){
      video.src = 'video/what-a-wonderful-world.mp4'
      song.src = 'mp3s/what-a-wonderful-world.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 2)
      thisSong = songStore.find((object) => object.id === 2)
      delay = 6020
    }
    else if(id === 'choose-gangster'){
      video.src = 'video/gangster.mp4'
      song.src = 'mp3s/gangster.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 3)
      thisSong = songStore.find((object) => object.id === 3)
      delay = 26200
    }
    else if(id === 'choose-busta'){
      video.src = 'video/busta.mp4'
      song.src = 'mp3s/busta.wav'
      lyrics = lyricStore.filter((object) => object.song_id === 5)
      thisSong = songStore.find((object) => object.id === 5)
      delay = 8500
    }

    chooseSongDiv.classList.add('hidden')
    loseBox.classList.add('hidden')
    scoreBox.classList.add('hidden')
    highScoreBox.classList.add('hidden')
    if(thisSong.id === 5){
      pressStart.innerHTML = "<h2>Press Enter To Play Song  <br/><br/> There are NO strikes! </h2>"
    }
    else {
      pressStart.innerHTML = "<h2>Press Enter To Play Song <br/><br/> You get a strike when you can't complete a lyric!</h2>"
    }    pressStart.classList.remove('hidden')
    document.addEventListener('keydown', startGame)
  }

  function startGame(event){
    if(event.which === 13){
      document.removeEventListener('keydown', startGame)
      chooseSongDiv.classList.add('hidden')
      pressStart.classList.add('hidden')
      lyricContainer.innerHTML = ''

      countdown = 4
      strikes = 0
      currentScore = 0
      renderStrikes()
      renderScore()
      renderHighScore()
      strikeBox.classList.remove('hidden')
      scoreBox.classList.remove('hidden')
      highScoreBox.classList.remove('hidden')


      video.classList.remove('hidden')
      video.addEventListener('ended', finishGame, { once: true })
      document.addEventListener('keydown', typing, false)
      song.currentTime = 0;
      video.currentTime = 0;
      song.play()
      video.play()
      setTimeout(displayCountdown, delay - 4000)
      setTimeout(displayLyrics, delay)
    }
  }

  function displayCountdown(){
    interval = setInterval(function(){
      lyricContainer.innerHTML = `<h2>${--countdown}</h2>`
    }, 1000)
  }

  function displayLyrics(){
    window.clearInterval(interval)
    let n = 0
    let duration = 0
    gameOver = false

    function displayLine(){
      if(lyrics[n] && !gameOver){
        const words = document.createElement('p')

        // build the words with span elements around the letters
        for (let i = 0; i < lyrics[n].content.length; i++) {
          const span = document.createElement("span");
          span.classList.add("span");
          span.innerHTML = lyrics[n].content[i];
          words.appendChild(span);
        }

        if(thisSong.id !== 5){
          tallyStrikes()
        }

        lyricContainer.innerHTML = words.innerHTML
        duration = lyrics[n].duration * 1000
        n++
        setTimeout(displayLine, duration)

      }
    }

    displayLine()

  }

  function typing(event) {
    const spans = document.querySelectorAll('.span');
    const typed = String.fromCharCode(event.which);

    for (let i = 0; i < spans.length; ++i) {
      if (spans[i].innerHTML.toLowerCase() === typed.toLowerCase()) {
        if (spans[i].classList.contains("bg")) { // if it already has class with the bg color then check the next one
          continue;
        }
        else if (!spans[i].classList.contains("bg") && !spans[i-1] || spans[i-1].classList.contains("bg")) {
          spans[i].classList.add("bg");
          tallyScore()
        }
      }
    }
  }

  function tallyStrikes(){
    let array = lyricContainer.querySelectorAll('span')
    let length = lyricContainer.querySelectorAll('span').length - 1
    let last = array[length]
    if (last){
      if (!last.classList.contains("bg")){
        strikes +=1
        renderStrikes()
        if (strikes === 10){
          document.removeEventListener('keydown', typing, false)
          gameOver = true
          song.pause()
          video.pause()
          chooseSongDiv.classList.remove('hidden')
          finalScore()
          strikeBox.classList.add('hidden')
          loseBox.classList.remove('hidden')


          // this counter is for the song select menu
          counter = -1
          document.addEventListener('keydown', menuSelect)
        }
      }
    }
  }

  function renderStrikes(){
    if(thisSong.id === 5){
      strikesCount.innerText = `∞`
      tenStrikes.classList.add('hidden')
    }
    else {
      strikesCount.innerText = `${strikes}`
      tenStrikes.classList.remove('hidden')
    }
  }

   function tallyScore(){
     if(!gameOver){
       currentScore += 1
     }
       renderScore()
   }

   function renderScore(){
      scoreArea.innerText = `${currentScore}`
   }

  function finalScore(){
      if (gameOver === true && currentScore > thisSong.score){
        thisSong.score = currentScore
        thisSong.username = username
        thisSong.sendScore()
        renderHighScore()
      }
    }

  function renderHighScore(){
    highScoreArea.innerText = `${thisSong.username} - ${thisSong.score}`
  }

  function finishGame(){
    audio.pause()
    gameOver = true
    strikesCount.innerText = `You beat the song with ${strikes} strikes!`
    chooseSongDiv.classList.remove('hidden')
    finalScore()

    // this counter is for the song select menu
    counter = -1
    document.addEventListener('keydown', menuSelect)
  }

})

Song.getSongs()
Lyric.getLyrics()
