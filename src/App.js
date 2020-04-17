import { BODY } from './my_modules/htmlComponents';
import Page from './components/Page';
import getStartState from './data';
import './assets/style.css';

/*  startState = {
      mode: 'train',
      menu: 'close',
      current: 'main',
      categories = {
        main: [<categories>],
        <name>: {<category>}, 
      },
      data: [],
    };
*/

const startApp = (state) => {
  const appState = state;
  let App;

  function refreshApp() {
    App.refresh(appState);
  }

  function onMenuClick() {
    appState.menu = appState.menu === 'open' ? 'close' : 'open';
    refreshApp();
  }

  function closeMenu() {
    appState.menu = 'close';
    refreshApp();
  }

  function onModeClick() {
    appState.mode = appState.mode === 'train' ? 'play' : 'train';
    refreshApp();
  }

  function onCategoryClick(e) {
    if (e.toElement.dataset.category) {
      appState.current = e.toElement.dataset.category;
      appState.menu = 'close';
      refreshApp();
    }
  }

  appState.onMenuClick = onMenuClick;
  appState.onModeClick = onModeClick;
  appState.onCategoryClick = onCategoryClick;
  appState.closeMenu = closeMenu;

  App = new Page(appState);

  BODY({}, [
    App,
  ]);
};

getStartState().then((startState) => {
  startApp(startState);
});
