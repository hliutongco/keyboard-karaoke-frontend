class Menu {
  static songMenu(){
    header.classList.add('hidden')
    pressStart.classList.add('hidden')
    chooseSongDiv.classList.remove('hidden')
  }

  static menuSelect(event) {
    const array = [wonderfulWorldH2, everlongH2, roarH2, gangsterH2, bustaH2]
    const mp3Src = ['mp3s/what-a-wonderful-world.mp3', 'mp3s/everlong.mp3', 'mp3s/roar.mp3', 'mp3s/gangster.mp3', 'mp3s/busta.wav']
    const currentTimeArr = [6, 34, 66, 63, 8]

    switch(event.which){
      // if user presses down
      case 40:
        if(counter < -1 || counter > 3){
          return
        }
        else if(counter <= 3 && counter >= 0) {
          array[counter].classList.remove('song-select')
          song.pause()
        }
        counter += 1
        array[counter].classList.add('song-select')
        song.src = mp3Src[counter]
        song.currentTime = currentTimeArr[counter];
        song.play()
        break;
      // if user presses up
      case 38:
        if(counter >= 1){
          array[counter].classList.remove('song-select')
          song.pause()
          counter -= 1

          array[counter].classList.add('song-select')
          song.src = mp3Src[counter]
          song.currentTime = currentTimeArr[counter];
          song.play()
        }
        break;
      // if user presses Enter
      case 13:
        if(array[counter]){
          song.pause()
          array[counter].classList.remove('song-select')
          this.chooseSong(array[counter].id)
        }
        break;
    }
  }

  static chooseSongHelper(vidURL, songURL, songId, delayNum){
    video.src = vidURL
    song.src = songURL
    console.log(songStore);
    console.log(songId);
    lyrics = lyricStore.filter((object) => object.song_id === songId)
    thisSong = songStore.find((object) => object.id === songId)
    delay = delayNum
    console.log(thisSong);
  }

  static chooseSong(id){
    switch(id){
      case 'choose-roar':
        this.chooseSongHelper('video/Roar.mp4', 'mp3s/roar.mp3', 1, 19500)
        break;
      case 'choose-everlong':
        this.chooseSongHelper('video/everlong.mp4', 'mp3s/everlong.mp3', 4, 34000)
        break;
      case 'choose-wonderful-world':
        this.chooseSongHelper('video/what-a-wonderful-world.mp4', 'mp3s/what-a-wonderful-world.mp3', 2, 6020)
        break;
      case 'choose-gangster':
        this.chooseSongHelper('video/gangster.mp4', 'mp3s/gangster.mp3', 3, 26200)
        break;
      case 'choose-busta':
        this.chooseSongHelper('video/busta.mp4', 'mp3s/busta.wav', 5, 8500)
        break;
    }

    chooseSongDiv.classList.add('hidden')
    loseBox.classList.add('hidden')
    scoreDiv.classList.add('hidden')
    highScoreBox.classList.add('hidden')
    strikesP.classList.add('hidden')
    console.log(thisSong);
    if(thisSong.id === 5){
      pressStart.innerHTML = `
      <h1> Press <span class="green">Enter</span> To Play Song </h1>
      <h2> <li>There are <span class="green">NO</span> strikes!</li> </h2>
      <h2> <li>Typos decrease your score!</li> </h2>
      `
    }
    else {
      pressStart.innerHTML = `
      <h1> Press <span class="green">Enter</span> To Play Song </h1>
      <h2> <li>You get a strike when you can't complete a lyric!</li> </h2>
      <h2> <li>Typos decrease your score!</li> </h2>
      `
    }
    pressStart.classList.remove('hidden')
  }
}
