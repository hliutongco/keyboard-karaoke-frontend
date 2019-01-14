class Game {
  static startGame(event){
    if(event.which === 13){
      chooseSongDiv.classList.add('hidden')
      pressStart.classList.add('hidden')
      lyricContainer.innerHTML = ''

      countdown = 4
      strikes = 0
      currentScore = 0
      Scoring.renderStrikes()
      Scoring.renderScore()
      Scoring.renderHighScore()
      strikeBox.classList.remove('hidden')
      scoreBox.classList.remove('hidden')
      highScoreBox.classList.remove('hidden')


      video.classList.remove('hidden')
      song.currentTime = 0;
      video.currentTime = 0;
      song.play()
      video.play()
      setTimeout(() => this.displayCountdown(), delay - 4000)
      setTimeout(() => this.displayLyrics(), delay)
    }
  }


  static displayCountdown(){
    console.log("test");
    interval = setInterval(() => {
      lyricContainer.innerHTML = `<h2>${--countdown}</h2>`
    }, 1000)
  }

  static displayLyrics(){
    window.clearInterval(interval)
    gameOver = false

    this.displayLine()
  }

  static displayLine(){
    console.log("n: ", n);
    console.log("n: ", duration);
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
        Scoring.tallyStrikes()
      }

      lyricContainer.innerHTML = words.innerHTML
      duration = lyrics[n].duration * 1000
      n++;

      setTimeout(() => this.displayLine(), duration)

    }
  }

  static typing(event) {
    const spans = document.querySelectorAll('.span');
    const typed = String.fromCharCode(event.which);

    for (let i = 0; i < spans.length; ++i) {
      if (spans[i].innerHTML.toLowerCase() === typed.toLowerCase()) {
        if (spans[i].classList.contains("bg")) { // if it already has class with the bg color then check the next one
          continue;
        }
        else if (!spans[i].classList.contains("bg") && !spans[i-1] || spans[i-1].classList.contains("bg")) {
          spans[i].classList.add("bg");
          Scoring.tallyScore()
        }
      }
    }
  }


static finishGame(){
  audio.pause()
  gameOver = true
  strikesCount.innerText = `You beat the song with ${strikes} strikes!`
  chooseSongDiv.classList.remove('hidden')
  Scoring.finalScore()

  // this counter is for the song select menu
  counter = -1
}
}
