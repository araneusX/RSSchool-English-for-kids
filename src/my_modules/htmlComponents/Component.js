export default class Component {
  constructor(HTMLElement, childrenComponents = null, attributes = {}) {
    this.node = HTMLElement;
    this.children = childrenComponents;
    this.attributes = attributes;
  }

  refresh(newProps) {
    this.refreshChildren(newProps);
  }


  refreshChildren(newProps) {
    this.children.forEach((child) => {
      if (Object.prototype.hasOwnProperty.call(child, 'props')) {
        const newChildProps = {};
        let isRefreshed = true;

        Object.keys(child.props).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(child.props, key)) {
            if (Object.prototype.hasOwnProperty.call(newProps, key)
                && child.props[key] !== newProps[key]) {
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
    });
  }
}
