import {
  DIV, IMG, CustomComponent, P,
} from '../../../../my_modules/htmlComponents';
import ItemContainer from '../../Item';
import style from './style.css';

/* props = {mode: 'train'/'play', category: {id, name}} */
class Category extends CustomComponent {
  refresh(newProps) {
    if (newProps.mode === 'play') {
      this.node.classList.add(style.play);
    } else {
      this.node.classList.remove(style.play);
    }

    this.props = newProps;
  }

  render() {
    const classPlay = this.props.mode === 'play' ? style.play : '';

    return (
      ItemContainer({ className: `${style.container} ${classPlay}` }, [
        DIV({ className: style.innerWrapper }, [
          IMG({
            className: style.image,
            alt: this.props.category.name,
            src: `/assets/data/category/img/${this.props.category.id}.jpg`,
          }),
          DIV({ className: style.shadow }),
        ]),
        P({ className: style.name }, [this.props.category.name]),
        DIV({ className: style.trap, 'data-category': this.props.category.id }),
      ])
    );
  }
}

export default Category;
