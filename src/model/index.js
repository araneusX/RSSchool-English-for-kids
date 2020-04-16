export const getJSON = (url) => {
  return new Promise ((resolve) => {
    const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  
  request.send();
  request.onload = () => {
    resolve(request.response);
  }
  })
}

export const loadData = () => {
  return new Promise((resolve) => {
    const categories = [];
    getJSON('/src/assets/data/category/category.json')
      .then((data) => {
        data.forEach((item) => {
          categories.push({id: item.access, name: item.category})
        })
      });
    resolve(categories);
  });
} 

const appState = {
  mode: 'train',
  menu: 'close',
  current: 'main',
}