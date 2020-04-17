import { DIV, CustomComponent } from '../../my_modules/htmlComponents';
import Categories from './Categories';
import Cards from './Cards';

import style from './style.css';

/* props = {
  mode: 'train'/'play',
  categories: [<{id, name}>,<{...}>],
  onCategoryClick,
  getSrc,
  getContent,
  getStatistic
} */
class MainContainer extends CustomComponent {
  refresh(newProps) {
    if (this.props.current !== newProps.current) {
      this.props = newProps;
      this.rerender();
    } else {
      this.props = newProps;
      this.refreshChildren(newProps);
    }
  }

  render() {
    const content = [];
    if (this.props.current === 'main') {
      content.push(new Categories({
        mode: this.props.mode,
        categories: this.props.categories,
        onCategoryClick: this.props.onCategoryClick,
      }));
    } else {
      content.push(new Cards({
        mode: this.props.mode,
        current: this.props.current,
        data: this.props.data,
        categories: this.props.categories,
      }));
    }
    return (
      DIV({ className: style.container }, content));
  }
}

export default MainContainer;
