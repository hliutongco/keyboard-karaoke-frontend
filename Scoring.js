class Scoring {
  static tallyStrikes(){
    let array = lyricContainer.querySelectorAll('span')
    let length = lyricContainer.querySelectorAll('span').length - 1
    let last = array[length]

    if (last){
      if (!last.classList.contains("bg")){
        strikes +=1
        this.renderStrikes()
        if (strikes === 10){
          gameOver = true
          song.pause()
          video.pause()
          chooseSongDiv.classList.remove('hidden')
          this.finalScore()
          strikeBox.classList.add('hidden')
          loseBox.classList.remove('hidden')


          // this counter is for the song select menu
          counter = -1
        }
      }
    }
  }

  static renderStrikes(){
    if(thisSong.id === 5){
      strikesCount.innerText = `∞`
      tenStrikes.classList.add('hidden')
    }
    else {
      strikesCount.innerText = `${strikes}`
      tenStrikes.classList.remove('hidden')
    }
  }

   static tallyScore(){
     if(!gameOver){
       currentScore += 1
     }
       this.renderScore()
   }

   static renderScore(){
      scoreArea.innerText = `${currentScore}`
   }

  static finalScore(){
      if (gameOver === true && currentScore > thisSong.score){
        thisSong.score = currentScore
        thisSong.username = username
        thisSong.sendScore()
        this.renderHighScore()
      }
    }

  static renderHighScore(){
    highScoreArea.innerText = `${thisSong.username} - ${thisSong.score}`
  }

}
