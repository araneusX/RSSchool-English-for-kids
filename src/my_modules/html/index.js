export class CustomComponent {
  constructor() {
    const component = this.render();
    this.node = component.node;
    this.children = component.children;
    this.props = component.props;
    this.refresh = component.refresh;

    if (!this.action) {
      this.action = this.action = component.action;
    }
  }

  render() {}
}

export const components = {};

class Component {
  constructor (name, props, HTMLElement, childrenComponents = null) {
    if (name) {
      if (components[name]) {
        throw new Error('Duplicate component name');
      }
      components[name] = this;
    }
    
    this.node = HTMLElement;
    this.children = childrenComponents;
    this.props = props;
  }

  refresh (newProps) {
    if (newProps && this.props) {
      for (let prop in this.props) {
        if (newProps[prop] && this.props[prop] !== newProps[prop]) {
          this.props = newProps;
          if (this.action) {
            this.action(newProps);
          }
          return;
        }
      }
    }
  }
}

const turnAttributes = (element, attributes) => {
  const el = element;
  let component = {};
  Object.keys(attributes).forEach((attribute) => {
    switch (attribute) {
      case 'className': {
        const classNames = attributes.className.split(' ');
        classNames.forEach((className) => {
          el.classList.add(className);
        });
        break;
      }
      case 'id':
        el.id = attributes.id;
        break;
      case 'value':
        el.value = attributes.value;
        break;
      case 'component':
        component = attributes.component;
        break;
      default:
        el.setAttribute(attribute, attributes[attribute]);
    }
  });
  return component;
};

const turnContent = (element, content) => {
  const childComponents = [];
  content.forEach((item) => {
    if (item.node instanceof HTMLElement) {
      element.append(item.node);
      childComponents.push(item);
    } else {
      const textNode = document.createTextNode(item.node);
      element.append(textNode);
    }
  });
  return childComponents;
};

const createHTMLElement = (tagName, attributes, content) => {
  const element = document.createElement(tagName);
  
  const componentSettings = turnAttributes(element, attributes);
  const childComponents = turnContent(element, content);
  
  const { name = null, props = null} = componentSettings;
  
  const component = new Component (
    name,
    props, 
    element, 
    childComponents
  );

  return component;
};

export const BODY = (attributes = {}, content = []) => {
  const element = document.body;
  turnAttributes(element, attributes);
  const childComponents = turnContent(element, content);
  new Component ('body', element, childComponents);
};

export const DIV = (attributes = {}, content = []) => createHTMLElement('div', attributes, content);

export const SPAN = (attributes = {}, content = []) => createHTMLElement('span', attributes, content);

export const BUTTON = (attributes = {}, content = []) => createHTMLElement('button', attributes, content);

export const H1 = (attributes = {}, content = []) => createHTMLElement('h1', attributes, content);

export const H2 = (attributes = {}, content = []) => createHTMLElement('h2', attributes, content);

export const H3 = (attributes = {}, content = []) => createHTMLElement('h3', attributes, content);

export const H4 = (attributes = {}, content = []) => createHTMLElement('h4', attributes, content);

export const P = (attributes = {}, content = []) => createHTMLElement('p', attributes, content);

export const IMG = (attributes = {}, content = []) => createHTMLElement('img', attributes, content);
