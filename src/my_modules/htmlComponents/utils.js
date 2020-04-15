export const clearInnerHTML = (HTMLelement) => {
  while (HTMLelement.firstChild) {
    HTMLelement.removeChild(HTMLelement.firstChild);
  }
};

export const turnAttributes = (element, attributes) => {
  console.log(attributes);
  
  const el = element;
  Object.keys(attributes).forEach((attribute) => {
    switch (attribute) {
      case 'className':
        el.className = attributes.className;
        break;
      case 'id':
        el.id = attributes.id;
        break;
      case 'value':
        el.value = attributes.value;
        break;
      default:
        el.setAttribute(attribute, attributes[attribute]);
    }
  });
  return el.id;
};

export const turnContent = (element, content) => {
  const childComponents = [];
  content.forEach((item) => {
    if (item.node instanceof HTMLElement) {
      element.append(item.node);
      item.parentNode = element;
      childComponents.push(item);
    } else {
      const textNode = item.node ? document.createTextNode(item.node) : document.createTextNode(item);
      element.append(textNode);
    }
  });
  return childComponents;
};