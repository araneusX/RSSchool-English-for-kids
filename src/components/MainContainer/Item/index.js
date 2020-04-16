import { DIV } from '../../../my_modules/htmlComponents';
import style from './style.css';

export default (param = {}, children = []) => {
  const thisParam = param;
  thisParam.className = param.hasOwnProperty('className') ? `${param.className} ${style.item}` : style.item;
  
  return (
    DIV(thisParam, children)
  );
}