import { DIV, CustomComponent } from '../../../my_modules/htmlComponents';
import Category from './Category';
import style from './style.css';

/* props = {mode: 'train'/'play', categories: , onCategoryChange, getSrc} */
class Categories extends CustomComponent {
  constructor(props) {
    super(props);

    this.node.addEventListener('click', (e) => {
      if (e.toElement.dataset.category) {
        this.props.onCategoryChange(e.toElement.dataset.category);
      }
    });
  }

  render() {
    const content = this.props.categories.map(
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
