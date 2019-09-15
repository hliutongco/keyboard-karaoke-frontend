class Game {
  static startGame(event){
    chooseSongDiv.classList.add('hidden')
    pressStart.classList.add('hidden')
    lyricContainer.innerHTML = ''

    // n = 0
    // duration = 0
    countdown = 4
    strikes = 0
    currentScore = 0
    letters = ""

    Scoring.renderStrikes()
    Scoring.renderScore()
    Scoring.renderHighScore()
    strikesHeader.classList.remove('hidden')
    strikesCount.classList.remove('hidden')
    strikesQuit.classList.add('hidden')
    strikesDiv.classList.remove('hidden')
    scoreDiv.classList.remove('hidden')
    highScoreBox.classList.remove('hidden')


    video.classList.remove('hidden')
    song.currentTime = 0;
    video.currentTime = 0;
    song.play()
    video.play()
    countdownTimeout = setTimeout(() => this.displayCountdown(), delay - 4000)
    timeout = setTimeout(() => this.displayLyrics(), delay)
  }


  static displayCountdown(){
    interval = setInterval(() => {
      lyricContainer.innerHTML = `<h2 id="countdown">${--countdown}</h2>`
    }, 1000)
  }

  // setTimeout(() => {
  //   this.displayLine(lyrics[n])
  //   n++
  //   setTimeout(() => {
  //     this.displayLine(lyrics[n])
  //     n++
  //     setTimeout(() => {
  //       this.displayLine(lyrics[n])
  //       n++
  //       setTimeout(() => {
  //         this.displayLine(lyrics[n])
  //       }, lyrics[n].duration * 1000)
  //     }, lyrics[n].duration * 1000)
  //   }, lyrics[n].duration * 1000)
  // }, lyrics[n].duration * 1000)

  static displayLyrics(){
    window.clearInterval(interval)

    function delay(duration, getNextLyric) {
      if(!gameOver){
        timeout = setTimeout(() => {
          getNextLyric();
        }, duration * 1000);
      }
    }

    function run(generatorFunction) {
      const generatorObj = generatorFunction((callbackValue) => generatorObj.next(callbackValue));
      generatorObj.next()
    }

    run(function* createGenerator(getNextLyric) {
      for(var n = 0; n < lyrics.length; n++) {
        this.displayLine(lyrics[n]);
        yield delay(lyrics[n].duration, getNextLyric);
      }
    }.bind(this));

  }

  static displayLine(currentLyric){
      correctLetters = ""
      letters = currentLyric.content
      const words = document.createElement('p')

      // build the words with span elements around the letters
      for (let i = 0; i < currentLyric.content.length; i++) {
        const span = document.createElement("span");
        span.innerHTML = currentLyric.content[i];
        span.classList.add("span")
        words.appendChild(span);
      }

      if(thisSong.id !== 5){
        Scoring.tallyStrikes()
      }

      lyricContainer.innerHTML = words.innerHTML
  }

  static typing(event) {
    const spans = document.querySelectorAll('.span');
    const typedLetter = String.fromCharCode(event.which);

    let nextLetter = letters.length === correctLetters.length ? "" : letters.slice(correctLetters.length)[0]

    if(typedLetter.toLowerCase() === nextLetter.toLowerCase()){
      // This was because of Arthur
      // Yay!
      spans[correctLetters.length].classList.add("bg");
      correctLetters = correctLetters + letters.slice(correctLetters.length)[0]
      Scoring.tallyScore()
    }
    else if(nextLetter) {
      Scoring.minusScore()
    }

  }


  static finishGame(){
    video.pause()
    gameOver = true
    strikesHeader.classList.add('hidden')
    tenStrikes.classList.add('hidden')
    strikesCount.innerText = `You beat the song with ${strikes} strikes!`
    chooseSongDiv.classList.remove('hidden')
    Scoring.finalScore()

    // this counter is for the song select menu
    counter = -1
  }
}
