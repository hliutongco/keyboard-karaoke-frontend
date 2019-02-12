document.addEventListener("DOMContentLoaded", function(){

  Song.getSongs()
  Lyric.getLyrics()
// this will eventually be asynchronous
  loadingScreen.classList.add('hidden')

  Welcome.loop();

  usernameInput.focus()

  usernameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    Welcome.submitUsername(event)
    Menu.songMenu()

    resetCounter()

    document.addEventListener('keydown', getSong)
  })

  function resetCounter(){
    counter = -1
  }

  function getSong(event){
    Menu.menuSelect(event);
    if(event.which === 13){
      document.removeEventListener('keydown', getSong)
      document.addEventListener('keydown', startGame)
    }
  }

  function startGame(event){
    if(event.which === 13){
      Game.startGame(event)
      document.removeEventListener('keydown', startGame)
      song.addEventListener('ended', finishGame, { once: true })
      song.addEventListener('pause', finishGame, { once: true })
      document.addEventListener('keydown', startTyping, false)
    }
    else if(event.which === 27){
      Menu.songMenu()
      resetCounter()
      clearTimeout(countdownTimeout)
      clearTimeout(timeout)
      document.removeEventListener('keydown', startGame)
      document.addEventListener('keydown', getSong)
    }
  }

  function startTyping(event){
    if(event.which === 27){
      exitGame()
    }
    else {
      Game.typing(event)
    }
    // if(gameOver){
    //   document.removeEventListener('keydown', startTyping, false)
    //   document.addEventListener('keydown', getSong)
    //   gameOver = false
    //   clearTimeout(timeout)
    //   return
    // }

  }

  function exitGame(){
    clearTimeout(countdownTimeout)
    audio.pause()
    strikesCount.classList.add('hidden')
    strikesQuit.classList.remove('hidden')
  }

  function finishGame(event){
    Game.finishGame()
    resetCounter()
    document.removeEventListener('keydown', startTyping, false)
    document.addEventListener('keydown', getSong)
    gameOver = false
    clearTimeout(timeout)
  }

})
