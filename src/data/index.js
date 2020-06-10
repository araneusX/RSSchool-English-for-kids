import AppData from './AppData';

const getJSON = (url) => new Promise((resolve) => {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';

  request.send();
  request.onload = () => {
    resolve(request.response);
  };
});


const getStartState = () => new Promise((resolve) => {
  const startState = {
    mode: 'train',
    menu: 'close',
    current: 'main',
  };

  getJSON('./assets/data/category/category.json')
    .then((data) => {
      startState.categories = data;
    })
    .then(() => {
      getJSON('./assets/data/card/card.json')
        .then((data) => {
          startState.data = new AppData(data);
          resolve(startState);
        });
    });
});

export default getStartState;
