import { DIV, CustomComponent } from '../../my_modules/htmlComponents';
import Categories from './Categories';
import Cards from './Cards';
import Statistics from './Statistics';

/* props = {
  mode: 'play'/'train'
  current: <category>
  categories: [<{id, name}>,<{...}>],
  onCategoryChange
  data
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
    switch (this.props.current) {
      case 'main':
        content.push(new Categories({
          mode: this.props.mode,
          categories: this.props.categories,
          onCategoryChange: this.props.onCategoryChange,
        }));
        break;
      case 'statistics':
        content.push(new Statistics({
          categories: this.props.categories,
          data: this.props.data,
          onCategoryChange: this.props.onCategoryChange,
        }));
        break;
      case 'difficult': {
        const words = this.props.data.getSortedStatisticsBy('difficulty').data;
        const cardSet = words.slice(0, 8).filter((word) => word.statistics.difficulty > 0);
        content.push(new Cards({
          mode: this.props.mode,
          data: this.props.data,
          onCategoryChange: this.props.onCategoryChange,
          cardSet,
        }));
      }
        break;
      default:
        content.push(new Cards({
          mode: this.props.mode,
          data: this.props.data,
          onCategoryChange: this.props.onCategoryChange,
          cardSet: this.props.data.getCategory(this.props.current).data,
        }));
    }

    return (
      DIV({}, content));
  }
}

export default MainContainer;
