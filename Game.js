class Game {
  static startGame(event){
    chooseSongDiv.classList.add('hidden')
    pressStart.classList.add('hidden')
    lyricContainer.innerHTML = ''

    n = 0
    duration = 0
    countdown = 4
    strikes = 0
    currentScore = 0
    letters = ""

    Scoring.renderStrikes()
    Scoring.renderScore()
    Scoring.renderHighScore()
    strikesHeader.classList.remove('hidden')
    strikesP.classList.remove('hidden')
    strikesDiv.classList.remove('hidden')
    scoreDiv.classList.remove('hidden')
    highScoreBox.classList.remove('hidden')


    video.classList.remove('hidden')
    song.currentTime = 0;
    video.currentTime = 0;
    song.play()
    video.play()
    setTimeout(() => this.displayCountdown(), delay - 4000)
    setTimeout(() => this.displayLyrics(), delay)
  }


  static displayCountdown(){
    interval = setInterval(() => {
      lyricContainer.innerHTML = `<h2>${--countdown}</h2>`
    }, 1000)
  }

  static displayLyrics(){
    window.clearInterval(interval)

    this.displayLine()
  }

  static displayLine(){
    console.log("n: ", n);
    console.log("n: ", duration);
    if(lyrics[n] && !gameOver){
      correctLetters = ""
      // incorrectLetters = ""
      letters = lyrics[n].content
      const words = document.createElement('p')

      // build the words with span elements around the letters
      for (let i = 0; i < lyrics[n].content.length; i++) {
        const span = document.createElement("span");
        span.innerHTML = lyrics[n].content[i];
        span.classList.add("span")
        words.appendChild(span);
      }

      if(thisSong.id !== 5){
        Scoring.tallyStrikes()
      }

      lyricContainer.innerHTML = words.innerHTML
      duration = lyrics[n].duration * 1000
      n++;

      timeout = setTimeout(() => this.displayLine(), duration)

    }
  }

  static typing(event) {
    const spans = document.querySelectorAll('.span');
    const typedLetter = String.fromCharCode(event.which);

    console.log("letters: ", letters);
    console.log("correct letters: ", correctLetters);
    let nextLetter = letters.length === correctLetters.length ? "" : letters.slice(correctLetters.length)[0]
    console.log("next letter: ", nextLetter);

    // without this if statement, nextLetter will throw an error
    // if letters is an empty string (which it is by default)
    // if(nextLetter){
    //   nextLetter = nextLetter.toLowerCase();
    // }

    if(typedLetter.toLowerCase() === nextLetter.toLowerCase()){
      console.log(spans);
      console.log(correctLetters.length);
      console.log(spans[correctLetters.length]);
      // This was because of Arthur
      // Yay!
      spans[correctLetters.length].classList.add("bg");
      correctLetters = correctLetters + letters.slice(correctLetters.length)[0]
      Scoring.tallyScore()
    }
    else if(nextLetter) {
      Scoring.minusScore()
    }


    // for (let i = 0; i < spans.length; ++i) {
    //   if (spans[i].innerHTML.toLowerCase() === typed.toLowerCase()) {
    //     if (spans[i].classList.contains("bg")) { // if it already has class with the bg color then check the next one
    //       continue;
    //     }
    //     else if (!spans[i].classList.contains("bg") && !spans[i-1] || spans[i-1].classList.contains("bg")) {
    //       spans[i].classList.add("bg");
    //       Scoring.tallyScore()
    //     }
    //   }
    // }
  }


  static finishGame(){
    audio.pause()
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
