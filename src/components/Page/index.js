import { components, DIV } from '../../my_modules/htmlComponents';
import Header from '../Header'
import style from './style.css';

const Page = 
  DIV({component: 'Page', className: style.container}, [
    Header
  ]);

export default Page;