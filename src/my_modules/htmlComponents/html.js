import { turnAttributes, turnContent } from './utils';
import Component from './Component';

const createHTMLElement = (tagName, attributes, content) => {
  const element = document.createElement(tagName);
  turnAttributes(element, attributes);

  const childComponents = turnContent(element, content);

  const component = new Component(
    element,
    childComponents,
    attributes,
  );

  return component;
};

export const BODY = (attributes = {}, content = []) => {
  const element = document.body;
  turnAttributes(element, attributes);
  const childComponents = turnContent(element, content);
  return new Component(element, childComponents, attributes);
};

export const DIV = (attributes = {}, content = []) => createHTMLElement('div', attributes, content);

export const SPAN = (attributes = {}, content = []) => createHTMLElement('span', attributes, content);

export const BUTTON = (attributes = {}, content = []) => createHTMLElement('button', attributes, content);

export const H1 = (attributes = {}, content = []) => createHTMLElement('h1', attributes, content);

export const H2 = (attributes = {}, content = []) => createHTMLElement('h2', attributes, content);

export const H3 = (attributes = {}, content = []) => createHTMLElement('h3', attributes, content);

export const H4 = (attributes = {}, content = []) => createHTMLElement('h4', attributes, content);

export const P = (attributes = {}, content = []) => createHTMLElement('p', attributes, content);

export const IMG = (attributes = {}) => createHTMLElement('img', attributes, []);

export const UL = (attributes = {}, content = []) => createHTMLElement('ul', attributes, content);

export const LI = (attributes = {}, content = []) => createHTMLElement('li', attributes, content);

export const A = (attributes = {}, content = []) => createHTMLElement('a', attributes, content);
