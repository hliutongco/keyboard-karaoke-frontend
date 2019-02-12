class Lyric {
  constructor(object){
    this.id = object.id
    this.song_id = object.song_id
    this.start = object.start
    this.duration = object.duration
    this.content = object.content

    lyricStore.push(this)
  }

  static getLyrics(){
    data.forEach((songObject) => {
      songObject["lyrics"].forEach((object) => {
        new Lyric(object)
      })
    })
  }
}
