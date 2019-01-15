class Menu {
  static songMenu(){
    header.classList.add('hidden')
    pressStart.classList.add('hidden')
    chooseSongDiv.classList.remove('hidden')
  }

  static menuSelect(event) {
    console.log(event);
    const array = [wonderfulWorldH2, everlongH2, roarH2, gangsterH2, bustaH2]
    const mp3Src = ['mp3s/what-a-wonderful-world.mp3', 'mp3s/everlong.mp3', 'mp3s/roar.mp3', 'mp3s/gangster.mp3', 'mp3s/busta.wav']
    const currentTimeArr = [6, 34, 66, 63, 8]
    console.log(event.which);

    switch(event.which){
      // if user presses down
      case 40:
        if(counter === -1){
          counter += 1
          array[counter].classList.add('song-select')
          song.src = mp3Src[counter]
          song.currentTime = currentTimeArr[counter];
          song.play()
        }
        else if(counter <= 3 && counter >= 0) {
          array[counter].classList.remove('song-select')
          song.pause()
          counter += 1

          array[counter].classList.add('song-select')
          song.src = mp3Src[counter]
          song.currentTime = currentTimeArr[counter];
          song.play()
        }
        break;
      // if user presses up
      case 38:
        console.log(counter);
        console.log(array[counter]);
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
        console.log(this);
        console.log(array, counter);
        if(array[counter]){
          song.pause()
          array[counter].classList.remove('song-select')
          this.chooseSong(array[counter].id)
        }
        break;
    }
  }

  static chooseSongHelper(vidURL, songURL, songId, delayNum){
    // temporary patch: if songStore is empty, exit the function
    if(songStore === []){
      return
    }

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
    scoreBox.classList.add('hidden')
    highScoreBox.classList.add('hidden')
    console.log(thisSong);
    if(thisSong.id === 5){
      pressStart.innerHTML = "<h2>Press Enter To Play Song  <br/><br/> There are NO strikes! </h2>"
    }
    else {
      pressStart.innerHTML = "<h2>Press Enter To Play Song <br/><br/> You get a strike when you can't complete a lyric!</h2>"
    }
    pressStart.classList.remove('hidden')
  }
}
