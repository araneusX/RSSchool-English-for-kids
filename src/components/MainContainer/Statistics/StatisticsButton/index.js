import { BUTTON, CustomComponent } from '../../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {content, attribute} */
class StatisticsButton extends CustomComponent {
  render() {
    return BUTTON({
      className: style.button,
      'data-action': this.props.attribute,
    },
    [this.props.content]);
  }
}

export default StatisticsButton;
