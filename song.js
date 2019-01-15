class Song {
  constructor(object){
    this.id = object.id
    this.name = object.name
    this.duration = object.duration
    this.username = object.username
    this.score = object.score


    songStore.push(this)
  }

  static getSongs(){
    fetch('https://keyboard-karaoke-v1.herokuapp.com/api/v1/songs')
    .then(response => response.json())
    .then(data => {
      data.forEach((object) => {
        new Song(object)
      })
    }).then(console.log("finished creating songs", songStore))
  }


  sendScore(){
    fetch(`https://keyboard-karaoke-v1.herokuapp.com/api/v1/songs/${this.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({username: `${this.username}`, score: `${this.score}`})
  }).then(res=>res.json())
  }



}
