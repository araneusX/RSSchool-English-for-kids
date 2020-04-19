import {
  DIV, SELECT, OPTION, P, TR, TD, TABLE, COLGROUP, COL, CustomComponent,
} from '../../../my_modules/htmlComponents';
import StatisticsButton from './StatisticsButton';
import style from './style.css';

/*
props = {
  categories: [<{id, name}>,<{...}>],
  data
}
*/
class Statistics extends CustomComponent {
  constructor(props) {
    super(props);

    this.selectedData = this.props.data;
    this.selectValue = 'all';
    this.sort = {
      word: 1,
      train: 1,
      view: 1,
      mistake: 1,
      difficulty: 1,
    };

    this.node.addEventListener('click', (e) => {
      if (e.toElement.dataset.key) {
        const { key } = e.toElement.dataset;
        if (key === 'word') {
          this.selectedData = this.selectedData.getSortedBy(key);
        } else {
          this.selectedData = this.selectedData.getSortedStatisticsBy(key);
        }

        if (this.sort[key] === -1) {
          this.selectedData.data.reverse();
        }
        this.sort[key] *= -1;
        this.rerender();
      } else if (e.toElement.dataset.action) {
        const { action } = e.toElement.dataset;
        if (action === 'reset') {
          this.props.data.resetStatistics();
          this.selectedData = this.props.data;
          this.rerender();
        } else {
          this.props.onCategoryChange('difficult');
        }
      }
    });
  }

  onCategorySelect(id) {
    this.selectValue = id;
    if (id === 'all') {
      this.selectedData = this.props.data;
    } else {
      this.selectedData = this.props.data.getCategory(id);
    }
    this.rerender();
  }

  render() {
    const options = [{ id: 'all', name: 'All' }, ...this.props.categories];
    const selectContent = options.map((item) => {
      const param = item.id === this.selectValue
        ? { value: item.id, selected: 'selected' }
        : { value: item.id };
      return OPTION(param, [item.name]);
    });

    const select = SELECT({ className: style.categoriesSelect }, selectContent);
    select.node.addEventListener('change', () => { this.onCategorySelect(select.node.value); });

    let words;
    if (this.selectedData) {
      words = this.selectedData.data;
    } else {
      words = this.props.data.data;
    }

    const tableContent = [];
    words.forEach((word) => {
      tableContent.push(
        TR({}, [
          TD({ className: `${style.td} ${style.word}` }, [word.word]),
          TD({ className: style.td, rowspan: '2' }, [word.statistics.train]),
          TD({ className: style.td, rowspan: '2' }, [word.statistics.view]),
          TD({ className: style.td, rowspan: '2' }, [word.statistics.mistake]),
          TD({ className: style.td, rowspan: '2' }, [`${word.statistics.difficulty}%`]),
        ]),
        TR({}, [
          TD({ className: `${style.td} ${style.translation}` }, [word.translation]),
        ]),
      );
    });

    return (
      DIV({ className: style.container }, [
        DIV({ className: style.wrapper }, [
          DIV({ className: style.buttonWrapper }, [
            new StatisticsButton({ content: 'Repeat difficult words', attribute: 'repeat' }),
            new StatisticsButton({ content: 'Reset', attribute: 'reset' }),
          ]),
          DIV({ className: style.categories }, [
            P({ className: style.categoriesName }, ['Category']),
            select,
          ]),
          TABLE({ className: style.table }, [
            COLGROUP({}, [
              COL({ className: style.wordCol }),
              COL({ className: style.dataCol }),
              COL({ className: style.dataCol }),
              COL({ className: style.dataCol }),
              COL({ className: style.dataCol }),
            ]),
            TR({ className: style.theader }, [
              TD({ className: style.td, 'data-key': 'word' }, ['Words']),
              TD({ className: style.td, 'data-key': 'train' }, ['Train']),
              TD({ className: style.td, 'data-key': 'view' }, ['Play']),
              TD({ className: style.td, 'data-key': 'mistake' }, ['Mistakes']),
              TD({ className: style.td, 'data-key': 'difficulty' }, ['Difficulty']),
            ]),
            ...tableContent,
          ]),
        ]),
      ])
    );
  }
}

export default Statistics;
