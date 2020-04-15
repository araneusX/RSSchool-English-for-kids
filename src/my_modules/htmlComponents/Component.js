import components from './components';

export default class Component {
  constructor(id, HTMLElement, childrenComponents = null, attributes = {}) {
    if (id) {
      if (components[id]) {
        throw new Error(`Duplicate component id: ${id}`);
      }
      components[id] = this;
      this.id = id;
    }

    this.node = HTMLElement;
    this.children = childrenComponents;
    this.attributes = attributes;
  }
}
