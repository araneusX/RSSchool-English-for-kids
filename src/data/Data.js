class Data {
  constructor(data) {
    this.data = data;
  }

  findById(id) {
    for (let i = 0; i < this.data.length; i += 1) {
      if (this.data[i].id === id) {
        return i;
      }
    }
    return null;
  }

  getById(id) {
    return this.data[this.findById(id)];
  }

  getSortedBy(key) {
    const sortedData = [...this.data];
    sortedData.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    return new Data(sortedData);
  }

  getSortedStatisticsBy(key) {
    const sortedData = [...this.data];
    sortedData.sort((a, b) => a.statistics[key] - b.statistics[key]);
    return new Data(sortedData);
  }
}

export default Data;
