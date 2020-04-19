import { DIV, CustomComponent } from '../../my_modules/htmlComponents';
import Header from '../Header';
import Menu from '../Menu';
import MainContainer from '../MainContainer';
import style from './style.css';

/* props = {
    mode: 'train'/'play',
    menu: 'close'/'open,
    current: 'main',
    onMenuClick,
    onModeClick
  }
*/
class Page extends CustomComponent {
  render() {
    return (
      DIV({ className: style.container }, [
        DIV({ className: style.headerPlace }),
        new Header({
          menu: this.props.menu,
          mode: this.props.mode,
          current: this.props.current,
          onMenuClick: this.props.onMenuClick,
          onModeClick: this.props.onModeClick,
        }),
        new Menu({
          menu: this.props.menu,
          mode: this.props.mode,
          current: this.props.current,
          categories: this.props.categories,
          onCategoryChange: this.props.onCategoryChange,
          closeMenu: this.props.closeMenu,
          onMenuClick: this.props.onMenuClick,
        }),
        new MainContainer({
          mode: this.props.mode,
          current: this.props.current,
          categories: this.props.categories,
          onCategoryChange: this.props.onCategoryChange,
          data: this.props.data,
        }),
      ])
    );
  }
}

export default Page;
