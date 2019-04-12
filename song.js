class Song {
  constructor(object){
    this.id = object._id
    this.name = object.name
    this.username = object.player
    this.score = object.score


    songStore.push(this)
  }

  static getSongs(){
    return fetch('https://keyboard-karaoke-node-backend.herokuapp.com/songs')
    .then(response => response.json())
    .then(data => {
      data.forEach((object) => {
        new Song(object)
      })
    }).then(console.log("finished creating songs", songStore))
  }


  sendScore(){
    fetch(`https://keyboard-karaoke-node-backend.herokuapp.com/songs/${this.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({username: `${this.username}`, score: `${this.score}`})
  }).then(res=>res.json())
  }



}
