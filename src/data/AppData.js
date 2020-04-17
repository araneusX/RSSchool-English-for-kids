
import Data from './Data';

class AppData extends Data {
  constructor(vocabulary) {
    super(vocabulary);
    this.base = [];

    if (localStorage.getItem('statistics')) {
      this.base = JSON.parse(localStorage.statistics);
    }

    this.combineData();
    this.saveStatistics();
  }

  getStatistics(id) {
    for (let j = 0; j < this.base.length; j += 1) {
      if (this.base[j] && this.base[j].id === id) {
        return this.base[j];
      }
    }
    return null;
  }

  combineData() {
    for (let i = 0; i < this.data.length; i += 1) {
      const itemStatistics = this.getStatistics(this.data[i].id);
      this.data[i].statistics = itemStatistics || this.createStatisticsObject(this.data[i].id);
    }
  }

  createStatisticsObject(id) {
    return {
      id,
      view: 0,
      right: 0,
      mistake: 0,
      difficulty: 0,
    };
  }

  saveStatistics() {
    this.base = this.data.map((item) => item.statistics);
    localStorage.setItem('statistics', JSON.stringify(this.base));
  }

  countDifficulty(item) {
    return item.statistics.mistake > 0
      ? Math.round((item.statistics.mistake / item.statistics.view) * 100)
      : 0;
  }

  addView(id) {
    const i = this.findById(id);
    this.data[i].statistics.view += 1;
    this.data[i].statistics.difficulty = this.countDifficulty(this.data[i]);
    this.saveStatistics();
  }

  addRight(id) {
    this.data[this.findById(id)].statistics.right += 1;
    this.saveStatistics();
  }

  addMistake(id) {
    const i = this.findById(id);
    this.data[i].statistics.view += 1;
    this.data[i].statistics.difficulty = this.countDifficulty(this.base[i]);
    this.saveStatistics();
  }

  getCategory(id) {
    const data = [];
    for (let i = 0; i < this.data.length; i += 1) {
      if (this.data[i].category === id) {
        data.push(this.data[i]);
      }
    }
    return new Data(data);
  }
}

export default AppData;
