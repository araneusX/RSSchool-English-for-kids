import { clearInnerHTML, turnAttributes } from './utils';
import components from './components';

class CustomComponent {
  constructor(props = {}) {
    this.state = props.state;
    this.component = this.render();
    this.node = this.component.node;
    this.children = this.component.children;
    this.empty = (method) => { throw new Error(`Empty method ${method}`); };
    if (this.component.id) {
      components[this.component.id] = this;
    }
  }

  refresh(newState) {
    this.state = newState;
    this.empty('refresh');
  }

  rerender() {
    this.children.forEach((item) => {
      delete components[item.id];
    });
    delete components[this.id];
    
    const component = this.render();

    if (this.id) {
      components[this.id] = this;
    };

    clearInnerHTML(this.node);
    component.children.forEach((item) => {
      this.node.append(item.node);
    });

    turnAttributes(this.node, component.attributes);
    this.children = component.children;
  }

  render() {
    this.empty('render');
  }
}

export default CustomComponent;
