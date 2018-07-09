const songStore = []

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
    fetch('http://localhost:3000/api/v1/songs')
    .then(response => response.json())
    .then(data => {
      data.forEach((object) => {
        new Song(object)
      })
    })
  }


  sendScore(){
    fetch(`http://localhost:3000/api/v1/songs/${this.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({username: `${this.username}`, score: `${this.score}`})
  }).then(res=>res.json())
  }



}
