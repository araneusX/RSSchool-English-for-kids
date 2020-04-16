import { DIV, CustomComponent } from '../../my_modules/htmlComponents';
import MenuButton from './MenuButton';
import ModeButton from './ModeButton';
import style from './style.css';

/* props = {mode: 'train'/'play', menu: 'open'/'close', onModeClick, onMenuClick} */
class Header extends CustomComponent {
  constructor(props) {
    super(props);
  }

  refresh(newProps) {
    this.props = newProps;
    const newChildrenProps = {menu: newProps.menu, mode: newProps.mode};
    this.refreshChildren(newChildrenProps);
  }

  render() {
    return (
      DIV({ className: style.header }, [
        DIV({ className: style.wrapper }, [
          new MenuButton({ open: false, onMenuClick: this.props.onMenuClick }),
          new ModeButton({ mode: this.props.mode, onModeClick: this.props.onModeClick }),
        ]),
      ])
    );
  }
}

export default Header;
