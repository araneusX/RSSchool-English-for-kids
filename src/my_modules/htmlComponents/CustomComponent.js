import { clearInnerHTML, turnAttributes } from './utils';

class CustomComponent {
  constructor(props = {}) {
    this.props = props;
    this.component = this.render();
    this.node = this.component.node;
    this.children = this.component.children;
  }

  refresh(newProps) {
    this.props = newProps;
    this.refreshChildren(newProps);
  }

  refreshChildren(newProps) {
    this.children.forEach((child) => {
      if (child.hasOwnProperty('props')) {
        const newChildProps = {};
        let isRefreshed = true;
        
        Object.keys(child.props).forEach((key) => {
          if (child.props.hasOwnProperty(key)) {
            if (newProps.hasOwnProperty(key) && child.props[key] !== newProps[key]) {
              newChildProps[key] = newProps[key];
              isRefreshed = false;
            } else {
              newChildProps[key] = child.props[key];
            }
          }
        });

        if (!isRefreshed) {
          child.refresh(newChildProps);
        }
      } else {
        child.refresh(newProps);
      }
    })
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

  render() {}
}

export default CustomComponent;
