import { DIV, CustomComponent } from '../../../my_modules/htmlComponents';
import Card from './Card';
import style from './style.css';

/* props = {mode: 'train'/'play', categories:, onCategoryClick, getSrc} */
class Cards extends CustomComponent {
  constructor(props) {
    super(props);

    this.node.addEventListener('click', (e) => {
      if (e.toElement.dataset.card) {
        const audio = new Audio(`/src/assets/data/card/sound/${e.toElement.dataset.card}.mp3`);
        audio.play();
      }
      if (e.toElement.dataset.rotate) {
        const classRotate = e.toElement.dataset.rotate;
        const modNode = e.toElement.parentNode;
        modNode.classList.add(classRotate);

        modNode.parentNode.addEventListener('mouseleave', () => {
          modNode.classList.remove(classRotate);
        }, { once: true });
      }
    });
  }

  render() {
    const currentId = this.props.categories[this.props.current].id;
    const cardSet = this.props.data.getCategory(currentId).data;
    const content = cardSet.map(
      (card) => new Card({ mode: this.props.mode, card }),
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

export default Cards;
