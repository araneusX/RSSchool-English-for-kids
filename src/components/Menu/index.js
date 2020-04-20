import {
  DIV, UL, LI, CustomComponent,
} from '../../my_modules/htmlComponents';
import MenuButton from '../Header/MenuButton';
import style from './style.css';

/* props = {
  menu: <'open'/'close'>,
  mode: 'train'/'play',
  current: <id>,
  categories: [<{id, name}>,<{...}>],
  action} */
class Menu extends CustomComponent {
  constructor(props) {
    super(props);

    this.node.addEventListener('click', (e) => {
      if (e.target.dataset.category) {
        this.props.onCategoryChange(e.target.dataset.category);
      }
    });
    this.children[0].node.addEventListener('click', this.props.closeMenu);
  }

  refresh(newProps) {
    if (newProps.mode === 'play') {
      this.node.classList.add(style.play);
    } else {
      this.node.classList.remove(style.play);
    }

    if (newProps.menu === 'open') {
      this.node.classList.add(style.open);
    } else {
      this.node.classList.remove(style.open);
    }

    if (newProps.current !== this.props.current) {
      if (newProps.current !== 'difficult') {
        document.getElementById(newProps.current).classList.add(style.current);
      }
      if (this.props.current !== 'difficult') {
        document.getElementById(this.props.current).classList.remove(style.current);
      }
    }

    this.props = newProps;
  }

  render() {
    const classOpen = this.props.menu === 'open' ? style.open : '';
    const classPlay = this.props.mode === 'play' ? style.play : '';
    const categories = [{ id: 'main', name: 'Main Page' }, ...this.props.categories];

    const items = categories.map((item) => {
      const classCurrent = this.props.current === item.id ? style.current : '';
      return (
        LI({
          id: item.id,
          'data-category': item.id,
          className: `${style.menuItem} ${classCurrent}`,
        }, [
          item.name,
        ])
      );
    });

    return (
      DIV({ className: `${style.menu} ${classOpen} ${classPlay}` }, [
        DIV({ className: style.trap }),
        DIV({ className: style.buttonContainer }, [
          DIV({ id: 'statistics', className: style.statistics, 'data-category': 'statistics' }, ['Statistics']),
          new MenuButton({ open: true, onMenuClick: this.props.onMenuClick }),
        ]),
        UL({ className: style.list }, [
          ...items,
        ]),
      ])
    );
  }
}

export default Menu;
