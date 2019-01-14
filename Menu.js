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
      this.chooseSong(array[counter].id)
    }
  }

  static chooseSongHelper(vidURL, songURL, songId, delayNum){
    video.src = vidURL
    song.src = songURL
    lyrics = lyricStore.filter((object) => object.song_id === songId)
    thisSong = songStore.find((object) => object.id === songId)
    delay = delayNum
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
    scoreBox.classList.add('hidden')
    highScoreBox.classList.add('hidden')
    if(thisSong.id === 5){
      pressStart.innerHTML = "<h2>Press Enter To Play Song  <br/><br/> There are NO strikes! </h2>"
    }
    else {
      pressStart.innerHTML = "<h2>Press Enter To Play Song <br/><br/> You get a strike when you can't complete a lyric!</h2>"
    }
    pressStart.classList.remove('hidden')
  }
}
