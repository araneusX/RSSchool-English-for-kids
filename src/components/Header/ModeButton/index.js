import { BUTTON, CustomComponent, DIV } from '../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {mode: 'train'/'play', onModeClick, current} */
class ModeButton extends CustomComponent {
  constructor(props) {
    super(props);
    this.node.addEventListener('click', this.props.onModeClick);
  }

  refresh(newProps) {
    this.props = newProps;
    if (this.props.current === 'statistics') {
      this.node.classList.add(style.statistics);
    } else {
      this.node.classList.remove(style.statistics);
      if (this.props.mode === 'play') {
        this.node.classList.add(style.play);
        this.node.classList.remove(style.train);
      } else {
        this.node.classList.remove(style.play);
        this.node.classList.add(style.train);
      }
    }
  }

  render() {
    const classMode = this.props.mode === 'play' ? style.play : style.train;
    const classCurrent = this.props.current === 'statistics' ? style.statistics : '';
    return (
      BUTTON({ className: `${style.button} ${classMode} ${classCurrent}` }, [
        DIV({ className: style.rect }),
      ])
    );
  }
}

export default ModeButton;
