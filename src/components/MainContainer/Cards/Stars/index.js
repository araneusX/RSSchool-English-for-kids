import { DIV, CustomComponent } from '../../../../my_modules/htmlComponents';
import style from './style.css';

/* props = {mode:, allResults: []} */
class Stars extends CustomComponent {
  refresh(newProps) {
    this.props = newProps;
    this.rerender();
  }

  render() {
    const content = this.props.allResults.map((value) => (
      DIV({ className: `${style.star} ${value ? style.starWin : style.starLose}` })
    ));

    return (
      DIV({ className: style.container }, [
        ...content,
      ])
    );
  }
}

export default Stars;
