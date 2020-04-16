import { DIV, BUTTON, CustomComponent } from '../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {menu: 'close'/'open'} */

class MenuButton extends CustomComponent {
  constructor(props) {
    super(props);
    
    this.node.addEventListener('click', this.props.onMenuClick);
  }

  render() {
    const classMode = this.props.open ? style.open :  '';
    return (
      BUTTON({ id: 'MenuButton', className: `${style.button} ${classMode}` },
        [
          DIV({ className: style.hatch }),
          DIV({ className: style.hatch }),
          DIV({ className: style.hatch }),
        ])
    );
  }
}

export default MenuButton;
