import {
  DIV, CustomComponent, IMG, P,
} from '../../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {result: >=0} */
class EndScreen extends CustomComponent {
  render() {
    let access;
    let message;
    if (this.props.result === 0) {
      access = 'success';
      message = 'YOU WIN!';
    } else {
      access = 'failure';
      message = `${this.props.result} errors!`;
    }
    const audio = new Audio(`/src/assets/sound/${access}.mp3`);
    audio.play();

    return (
      DIV({ className: style.screen }, [
        IMG({
          className: style.image,
          alt: access,
          src: `/src/assets/img/${access}.jpg`,
        }),
        P({ className: style.text }, [
          message,
        ]),
      ])
    );
  }
}

export default EndScreen;
