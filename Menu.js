class Menu {
  static songMenu(){
    header.classList.add('hidden')
    pressStart.classList.add('hidden')
    chooseSongDiv.classList.remove('hidden')
  }

  static menuSelect(event) {
    const array = [wonderfulWorldH2, everlongH2, roarH2, gangsterH2, bustaH2]
    const mp3Src = ['https://keyboard-karaoke-node-backend.herokuapp.com/waww-mp3', 'https://keyboard-karaoke-node-backend.herokuapp.com/everlong-mp3', 'https://keyboard-karaoke-node-backend.herokuapp.com/roar-mp3', 'https://keyboard-karaoke-node-backend.herokuapp.com/gangster-mp3', 'https://keyboard-karaoke-node-backend.herokuapp.com/busta-mp3']
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

    const compare = (a, b) => {
       let comparison = 0;
       if (a.lyric_order > b.lyric_order) {
         comparison = 1;
       }
       else if (a.lyric_order  < b.lyric_order) {
         comparison = -1;
       }
       return comparison;
     }

    const sortedLyrics = lyricStore.sort(compare);
    lyrics = sortedLyrics.filter((lyric) => lyric.song_id === songId)
    thisSong = songStore.find((object) => object.name === songId)
    delay = delayNum
  }

  static chooseSong(id){
    switch(id){
      case 'choose-roar':
        this.chooseSongHelper('https://keyboard-karaoke-node-backend.herokuapp.com/Roar-video', 'https://keyboard-karaoke-node-backend.herokuapp.com/roar-mp3', "roar", 19500)
        break;
      case 'choose-everlong':
        this.chooseSongHelper('https://keyboard-karaoke-node-backend.herokuapp.com/everlong-video', 'https://keyboard-karaoke-node-backend.herokuapp.com/everlong-mp3', "everlong", 34000)
        break;
      case 'choose-wonderful-world':
        this.chooseSongHelper('https://keyboard-karaoke-node-backend.herokuapp.com/waww-video', 'https://keyboard-karaoke-node-backend.herokuapp.com/waww-mp3', "what a wonderful world", 6020)
        break;
      case 'choose-gangster':
        this.chooseSongHelper('https://keyboard-karaoke-node-backend.herokuapp.com/gangster-video', 'https://keyboard-karaoke-node-backend.herokuapp.com/gangster-mp3', "gangster paradise", 26200)
        break;
      case 'choose-busta':
        this.chooseSongHelper('https://keyboard-karaoke-node-backend.herokuapp.com/busta-video', 'https://keyboard-karaoke-node-backend.herokuapp.com/busta-mp3', "look at me now", 8500)
        break;
    }

    chooseSongDiv.classList.add('hidden')
    loseBox.classList.add('hidden')
    scoreDiv.classList.add('hidden')
    highScoreBox.classList.add('hidden')
    strikesDiv.classList.add('hidden')

    if(thisSong.id === 5){
      pressStart.innerHTML = `
      <h1> Instructions </h1>
      <h2> There are NO strikes! </h2>
      <h2> Typos decrease your score! </h2>
      <h2> Press <span class="red">ESC</span> anytime to return to the menu </h2>
      <h2> Press <span class="red">Enter</span> To Start </h2>
      `
    }
    else {
      pressStart.innerHTML = `
      <h1> Instructions </h1>
      <h2> You get a strike when you can't complete a lyric! </h2>
      <h2> Typos decrease your score! </h2>
      <h2> Press <span class="red">ESC</span> anytime to return to the menu </h2>
      <h2> Press <span class="red">Enter</span> To Start </h2>
      `
    }
    pressStart.classList.remove('hidden')
  }
}
