document.addEventListener("DOMContentLoaded", function(){

  Welcome.loop();

  usernameInput.focus()

  usernameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    Welcome.submitUsername(event)
    Menu.songMenu()

    document.addEventListener('keydown', getSong)
  })

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
  }

  function startTyping(event){
    // if(gameOver){
    //   document.removeEventListener('keydown', startTyping, false)
    //   document.addEventListener('keydown', getSong)
    //   gameOver = false
    //   clearTimeout(timeout)
    //   return
    // }
    Game.typing(event)

  }

  function finishGame(event){
    Game.finishGame()
    document.removeEventListener('keydown', startTyping, false)
    document.addEventListener('keydown', getSong)
    gameOver = false
    clearTimeout(timeout)
  }

  Song.getSongs()
  Lyric.getLyrics()
})
