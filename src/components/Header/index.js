import { DIV } from '../../my_modules/htmlComponents';
import MenuButton from './MenuButton';
import ModeButton from './ModeButton';
import style from './style.css';

const Header = (
  DIV({ className: style.header }, [
    DIV({ className: style.wrapper }, [
      new MenuButton(),
      new ModeButton(),
    ]),
  ])
);

export default Header;
