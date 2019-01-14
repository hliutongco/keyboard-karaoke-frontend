document.addEventListener("DOMContentLoaded", function(){

  Welcome.loop();

  usernameInput.focus()

  usernameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    Welcome.submitUsername(event)
    Menu.songMenu()

    document.addEventListener('keydown', getSong)
  })

  function getSong(){
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
      console.log(video);
      video.addEventListener('ended', finishGame, { once: true })
      document.addEventListener('keydown', startTyping, false)
    }
  }

  function startTyping(event){
    Game.typing(event)

    if(gameOver){
      document.removeEventListener('keydown', startTyping, false)
      document.addEventListener('keydown', getSong)
      n = 0
      duration = 0
    }
  }

  function finishGame(event){
    Game.finishGame()
    document.removeEventListener('keydown', startTyping, false)
    document.addEventListener('keydown', getSong)
    n = 0
    duration = 0
  }

  Song.getSongs()
  Lyric.getLyrics()
})
