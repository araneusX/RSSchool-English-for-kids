/* eslint-disable no-useless-constructor */
import {
  DIV, IMG, CustomComponent, P,
} from '../../../../my_modules/htmlComponents';
import ItemContainer from '../../Item';
import style from './style.css';

/* props = {mode: 'train'/'play', card: {id, category, word, translation }} */
class Card extends CustomComponent {
  constructor(props) {
    super(props);
  }

  refresh(newProps) {
    if (newProps.mode === 'play') {
      this.node.classList.add(style.play);
    } else {
      this.node.classList.remove(style.play);
    }
    this.props = newProps;
    if (newProps.rightResult && newProps.rightResult.includes(this.props.card.id)) {
      this.node.classList.add(style.right);
    }
    this.props = newProps;
  }

  render() {
    const classPlay = this.props.mode === 'play' ? style.play : '';

    return (
      DIV({ className: `${style.wrapper} ${classPlay}` }, [
        ItemContainer({ className: style.container }, [
          DIV({ className: style.front }, [
            IMG({
              className: style.image,
              alt: this.props.card.word,
              src: `/assets/data/card/img/${this.props.card.id}.jpg`,
            }),
            P({ className: style.word }, [this.props.card.word]),
            DIV({ className: style.trap, 'data-card': this.props.card.id }),
            IMG({
              className: style.rotateBtn,
              src: '/assets/img/rotate.svg',
              alt: 'rotate',
              'data-rotate': style.rotate,
            }),
          ]),
          DIV({ className: style.back }, [
            IMG({
              className: style.image,
              alt: this.props.card.word,
              src: `/assets/data/card/img/${this.props.card.id}.jpg`,
            }),
            P({ className: style.translation }, [this.props.card.translation]),
          ]),
        ]),
      ])
    );
  }
}

export default Card;
