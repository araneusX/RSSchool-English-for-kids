import Game from '../../../my_modules/Game';
import { DIV, CustomComponent } from '../../../my_modules/htmlComponents';
import Card from './Card';
import EndScreen from './EndScreen';
import StartButton from './StartButton';
import Stars from './Stars';
import style from './style.css';

/* props = {mode: 'train'/'play', categories:, onCategoryClick, getSrc} */
class Cards extends CustomComponent {
  constructor(props) {
    super(props);

    this.gameResult = -1;
    this.allResults = [];

    this.isPlay = false;
    this.rightResult = [];

    this.node.addEventListener('click', (e) => {
      if (e.toElement.dataset.game) {
        this.onGame();
      }

      if (e.toElement.dataset.card) {
        const current = e.toElement.dataset.card;
        if (this.isPlay) {
          if (!this.rightResult.includes(current)) {
            this.game.check(current);
          }
        } else if (this.props.mode === 'train') {
          const audio = new Audio(`/src/assets/data/card/sound/${current}.mp3`);
          audio.play();
        }
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

  onGame() {
    if (!this.isPlay) {
      this.game = new Game(
        this.props.data,
        [...this.cardSet],
        this.onRight.bind(this),
        this.onMistake.bind(this),
        this.onEnd.bind(this),
      );
      this.isPlay = true;
      this.game.start();
      this.refreshChildren({ isPlay: this.isPlay });
    }
  }

  onRight(id) {
    this.rightResult.push(id);
    const result = [...this.rightResult];
    this.allResults.push(true);
    const allResults = [...this.allResults];
    this.refreshChildren({ rightResult: result, allResults });
  }

  onMistake() {
    this.allResults.push(false);
    const allResults = [...this.allResults];
    this.refreshChildren({ allResults });
  }

  onEnd(result) {
    this.isPlay = false;
    this.rightResult = [];
    this.allResults = [];


    this.gameResult = result;
    this.rerender();

    this.gameResult = -1;
    setTimeout(() => { this.rerender(); }, 3000);
  }

  refresh(newProps) {
    if (newProps.mode === 'train' && this.props.mode === 'play') {
      this.isPlay = false;
      this.rightResult = [];
      this.allResults = [];
      this.props = newProps;
      this.rerender();
    } else {
      this.props = newProps;
      this.refreshChildren(
        {
          ...newProps,
          isPlay: this.isPlay,
          rightResult: this.rightResult,
          allResults: this.allResults,
        },
      );
    }
  }

  render() {
    let content;

    if (this.gameResult >= 0) {
      content = [new EndScreen({ result: this.gameResult })];
    } else {
      this.cardSet = this.props.data.getCategory(this.props.current).data;
      const cards = this.cardSet.map(
        (card) => new Card({ mode: this.props.mode, card, rightResult: this.rightResult || [] }),
      );

      content = [
        DIV({ className: style.stars }, [
          new Stars({ mode: this.props.mode, allResults: this.allResults || [] }),
        ]),
        DIV({ className: style.startButton }, [
          new StartButton({ mode: this.props.mode, isPlay: this.isPlay || false }),
        ]),
        DIV({ className: style.wrapper }, [
          ...cards,
        ]),
      ];
    }

    return (
      DIV({ className: style.categories }, [
        ...content,
      ])
    );
  }
}

export default Cards;
