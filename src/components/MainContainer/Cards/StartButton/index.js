import { BUTTON, CustomComponent } from '../../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {mode: 'train'/'play', categories:, onCategoryClick, getSrc} */
class StartButton extends CustomComponent {
  refresh(newProps) {
    if (newProps.mode === 'play' && !newProps.isPlay) {
      this.node.classList.add(style.playMode);
    } else {
      this.node.classList.remove(style.playMode);
    }
    this.props = newProps;
  }

  render() {
    const classMode = (this.props.mode === 'play' && !this.props.isPlay) ? style.playMode : '';
    return BUTTON({ className: `${style.startButton} ${classMode}`, 'data-game': 'game' }, ['START']);
  }
}

export default StartButton;
