import { DIV } from '../../../my_modules/htmlComponents';
import style from './style.css';

export default (param = {}, children = []) => {
  const thisParam = param;
  thisParam.className = Object.prototype.hasOwnProperty.call(param, 'className')
    ? `${param.className} ${style.item}`
    : style.item;

  return (
    DIV(thisParam, children)
  );
};
