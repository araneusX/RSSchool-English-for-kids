import { BUTTON, CustomComponent, DIV } from '../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {mode: 'train'/'play'} */

class ModeButton extends CustomComponent {
  constructor(props) {
    super(props);
    this.node.addEventListener('click', this.props.onModeClick);
  }

  refresh(newProps) {
    this.props = newProps;
    if (this.props.mode === 'play') {
      this.node.classList.add(style.play)
      this.node.classList.remove(style.train)
    } else {
      this.node.classList.remove(style.play)
      this.node.classList.add(style.train)
    }
  }

  render() {
    const classMode = this.props.mode === 'play' ? style.play : style.train;

    return (
      BUTTON({ className: `${style.button} ${classMode}`}, [
        DIV({ className: style.rect })
      ])
    );
  }
}

export default ModeButton;
