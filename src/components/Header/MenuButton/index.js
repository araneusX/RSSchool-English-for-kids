import { DIV, BUTTON, CustomComponent } from '../../../my_modules/htmlComponents';
import style from './style.css';

class MenuButton extends CustomComponent {
  constructor() {
    super({ state: 'close' });
    
    this.node.addEventListener('click', () => {
      this.refresh(this.state === 'open' ? 'close' : 'open');
    });
  }

  refresh(newState) {
    this.state = newState;
    if (this.state === 'open') {
      this.node.classList.add(style.open);
    } else {
      this.node.classList.remove(style.open);
    }
  }

  render() {
    return (
      BUTTON({ id: 'MenuButton', className: style.button },
        [
          DIV({ className: style.hatch }),
          DIV({ className: style.hatch }),
          DIV({ className: style.hatch }),
        ])
    );
  }
}

export default MenuButton;
