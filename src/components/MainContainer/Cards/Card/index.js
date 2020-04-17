/* eslint-disable no-useless-constructor */
import {
  DIV, IMG, CustomComponent, P,
} from '../../../../my_modules/htmlComponents';
import ItemContainer from '../../Item';
import style from './style.css';

/* props = {mode: 'train'/'play', card: {id, category, access, word, translation }} */
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
  }

  render() {
    const classPlay = this.props.mode === 'play' ? style.play : '';

    return (
      DIV({ className: style.wrapper }, [
        ItemContainer({ className: `${style.container} ${classPlay}` }, [
          DIV({ className: style.front }, [
            IMG({
              className: style.image,
              alt: this.props.card.word,
              src: `/src/assets/data/card/img/${this.props.card.access}.jpg`,
            }),
            P({ className: style.word }, [this.props.card.word]),
            DIV({ className: style.trap, 'data-card': this.props.card.access }),
          ]),
          DIV({ className: style.back }, [
            P({ className: style.word }, [this.props.card.translation]),
          ]),
          IMG({
            className: style.rotateBtn,
            src: '/src/assets/img/rotate.svg',
            alt: 'rotate',
            'data-rotate': style.rotate,
          }),
        ]),
      ])
    );
  }
}

export default Card;
