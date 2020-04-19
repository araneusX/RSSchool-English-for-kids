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
      if (Object.prototype.hasOwnProperty.call(child, 'props')) {
        const newChildProps = {};
        let isFresh = true;

        Object.keys(child.props).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(child.props, key)) {
            if (Object.prototype.hasOwnProperty.call(newProps, key)
                && child.props[key] !== newProps[key]) {
              newChildProps[key] = newProps[key];
              isFresh = false;
            } else {
              newChildProps[key] = child.props[key];
            }
          }
        });

        if (!isFresh) {
          child.refresh(newChildProps);
        }
      } else {
        child.refresh(newProps);
      }
    });
  }

  rerender() {
    const component = this.render();

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
