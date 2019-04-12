class Lyric {
  constructor(object){
    this.id = object._id
    this.lyric_order = object.lyric_order
    this.song_id = object.song
    this.duration = object.duration
    this.content = object.content

    lyricStore.push(this)
  }

  static getLyrics(){
    return fetch('https://keyboard-karaoke-node-backend.herokuapp.com/lyrics')
    .then(response => response.json())
    .then(data => {
      data.forEach((object) => {
        new Lyric(object)
      })
    })
  }
}
