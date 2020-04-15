import { BUTTON, CustomComponent, DIV } from '../../../my_modules/htmlComponents';
import style from './style.css';

class ModeButton extends CustomComponent {
  constructor() {
    super({ state: 'train' });

    this.node.addEventListener('click', () => {
      this.refresh(this.state === 'train' ? 'play' : 'train');
    });
  }

  refresh(newState) {
    this.state = newState;
    if (this.state === 'play') {
      this.node.classList.add(style.play)
      this.node.classList.remove(style.train)
    } else {
      this.node.classList.remove(style.play)
      this.node.classList.add(style.train)
    }
  }

  render() {

    return (
      BUTTON({ className: `${style.button} ${style.train}` }, [
        DIV({ className: style.rect })
      ])
    );
  }
}

export default ModeButton;
