import { BODY } from './my_modules/htmlComponents';
import Page from './components/Page';
import { getJSON } from './model';
import './assets/style.css';


const appState = {
  mode: 'train',
  menu: 'close',
  current: 'main',
}


getJSON('/src/assets/data/category/category.json').then((data)=>{
  
  const categories = [];
  data.forEach((item) => {
    categories.push({id: item.access, name: item.category})
  })

  appState.categories = categories;

  function onMenuClick() {
    appState.menu = appState.menu === 'open' ? 'close' : 'open';
    refreshApp ();
  }

  function closeMenu() {
    appState.menu = 'close';
    refreshApp ();
  }
  
  function onModeClick() {
    appState.mode = appState.mode === 'train' ? 'play' : 'train';
    refreshApp ();
  }
 
  function onCategoryClick(e) {
    if (e.toElement.dataset.category) {
      appState.current = e.toElement.dataset.category;
      refreshApp ();
    }
  }

  appState.onMenuClick = onMenuClick;
  appState.onModeClick = onModeClick;
  appState.onCategoryClick = onCategoryClick;
  appState.closeMenu = closeMenu;

  const App = new Page(appState);

  function refreshApp () {
    App.refresh(appState)
  }
  
  BODY ({}, [
    App
  ]);
});


