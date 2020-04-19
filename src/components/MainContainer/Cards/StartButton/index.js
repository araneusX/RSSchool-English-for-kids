import { BUTTON, SPAN, CustomComponent } from '../../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {mode: 'train'/'play', categories:, onCategoryChange, getSrc} */
class StartButton extends CustomComponent {
  refresh(newProps) {
    if (newProps.isPlay !== this.props.isPlay) {
      this.props = newProps;
      this.rerender();
    } else if (newProps.mode === 'play') {
      this.node.classList.add(style.playMode);
    } else {
      this.node.classList.remove(style.playMode);
    }
    this.props = newProps;
  }

  render() {
    const content = this.props.isPlay ? 'REPEAT' : 'START GAME';
    const classMode = this.props.mode === 'play' ? style.playMode : '';
    return BUTTON({ className: `${style.startButton} ${classMode}`, 'data-game': 'game' }, [
      SPAN({ 'data-game': 'game' }, [content]),
    ]);
  }
}

export default StartButton;
