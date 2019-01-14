
class Welcome {
  static loop(){
    setTimeout(() => {
      elem.style.display = 'block';
      elem.innerHTML = this.splitString(string, i);
      i++;

      if (i < string.length + 1) {
        this.loop();
        return;
      }

      elem.setAttribute('class', 'blink');
    }, 200)
  }

  static splitString(string, index) {
    return string.substring(0, index);
  }

  static submitUsername(event) {
    username = usernameInput.value
  }
}
