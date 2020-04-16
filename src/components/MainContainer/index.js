import { DIV, CustomComponent } from '../../my_modules/htmlComponents';
import Categories from './Categories';
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      DIV({ className: style.container }, [
        new Categories({
          mode: this.props.mode,
          categories: this.props.categories,
          onCategoryClick: this.props.onCategoryClick,
        })
      ])
    );
  }
}

export default MainContainer;
