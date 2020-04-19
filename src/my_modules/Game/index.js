
class Game {
  constructor(appData, category, onRight, onMistake, onEnd) {
    this.wordSet = this.shuffle(category);
    this.mistakes = 0;
    this.appData = appData;
    this.rightSound = new Audio('/assets/sound/right.mp3');
    this.mistakeSound = new Audio('/assets/sound/mistake.mp3');
    this.isProgress = false;
    this.isStarted = false;
    this.onMistake = onMistake;
    this.onRight = onRight;
    this.onEnd = onEnd;
  }

  shuffle(arr) {
    let j; let
      temp;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  play() {
    if (!this.isProgress) {
      this.isProgress = true;
      if (this.wordSet.length > 0) {
        this.currentWord = this.wordSet.pop();
        this.audio = new Audio(`/assets/data/card/sound/${this.currentWord.id}.mp3`);
        this.audio.play();
        this.audio.addEventListener('ended', () => { this.isProgress = false; });
        this.appData.addView(this.currentWord.id);
      } else {
        this.onEnd(this.mistakes);
      }
    }
  }

  check(id) {
    if (!this.isProgress) {
      this.isProgress = true;
      if (id === this.currentWord.id) {
        this.appData.addRight(this.currentWord.id);
        this.rightSound.play();
        this.onRight(id);
        this.rightSound.addEventListener('ended', () => {
          this.isProgress = false;
          this.play();
        }, { once: true });
      } else {
        this.appData.addMistake(this.currentWord.id);
        this.mistakes += 1;
        this.mistakeSound.play();
        this.onMistake(id);
        this.mistakeSound.addEventListener('ended', () => {
          this.isProgress = false;
          this.audio.play();
          this.appData.addView(this.currentWord.id);
        }, { once: true });
      }
    }
  }

  start() {
    if (!this.isStarted) {
      this.isStarted = true;
      this.play();
    }
  }

  repeat() {
    if (!this.isProgress) {
      this.isProgress = true;
      this.audio.play();
    }
  }
}

export default Game;
