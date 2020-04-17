import { DIV, CustomComponent } from '../../../my_modules/htmlComponents';
import Category from './Category';
import style from './style.css';

/* props = {mode: 'train'/'play', categories: , onCategoryClick, getSrc} */
class Categories extends CustomComponent {
  constructor(props) {
    super(props);

    this.node.addEventListener('click', this.props.onCategoryClick);
  }

  render() {
    const content = this.props.categories.main.map(
      (category) => new Category({ mode: this.props.mode, category }),
    );

    return (
      DIV({ className: style.categories }, [
        DIV({ className: style.wrapper }, [
          ...content,
        ]),
      ])
    );
  }
}

export default Categories;
