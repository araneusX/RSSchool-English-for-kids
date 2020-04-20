import Game from '../../../my_modules/Game';
import { DIV, P, CustomComponent } from '../../../my_modules/htmlComponents';
import Card from './Card';
import EndScreen from './EndScreen';
import StartButton from './StartButton';
import Stars from './Stars';
import style from './style.css';

/* props = {mode: 'train'/'play', categories:, onCategoryChange, data} */
class Cards extends CustomComponent {
  constructor(props) {
    super(props);
    this.gameResult = -1;
    this.allResults = [];

    this.isPlay = false;
    this.rightResult = [];

    this.node.addEventListener('click', (e) => {
      if (e.target.dataset.game) {
        this.onGame();
      }

      if (e.target.dataset.card) {
        const current = e.target.dataset.card;
        if (this.isPlay) {
          if (!this.rightResult.includes(current)) {
            this.game.check(current);
          }
        } else if (this.props.mode === 'train') {
          const audio = new Audio(`/assets/data/card/sound/${current}.mp3`);
          audio.play();
          this.props.data.addTrain(current);
        }
      }

      if (e.target.dataset.rotate) {
        const classRotate = e.target.dataset.rotate;
        const modNode = e.target.parentNode.parentNode;
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
        [...this.props.cardSet],
        this.onRight.bind(this),
        this.onMistake.bind(this),
        this.onEnd.bind(this),
      );
      this.isPlay = true;
      this.game.start();
      this.refreshChildren({ isPlay: this.isPlay });
    } else {
      this.game.repeat();
    }
  }

  onRight(id) {
    this.rightResult.push(id);
    const result = [...this.rightResult];
    this.allResults.push(true);
    this.allResults = this.allResults.length < 9
      ? [...this.allResults]
      : this.allResults.slice(-8);
    this.refreshChildren({ rightResult: result, allResults: this.allResults });
  }

  onMistake() {
    this.allResults.push(false);
    this.allResults = this.allResults.length < 9
      ? [...this.allResults]
      : this.allResults.slice(-8);
    this.refreshChildren({ allResults: this.allResults });
  }

  onEnd(result) {
    this.gameResult = result;
    this.rerender();
    setTimeout(() => { this.props.onCategoryChange('main'); }, 3000);
  }

  refresh(newProps) {
    if (newProps.mode === 'train' && this.props.mode === 'play' && this.isPlay) {
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
    } else if (this.props.cardSet.length > 0) {
      const cards = this.props.cardSet.map(
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
    } else {
      content = [
        P({ className: style.noWords }, [
          'No words in this category!',
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
