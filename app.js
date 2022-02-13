var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let App = class App extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'FED21G';
        this.count = 0;
    }
    render() {
        return html `
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
    }
    _onClick() {
        this.count++;
        this.dispatchEvent(new CustomEvent('count-changed'));
    }
    sayHello(name) {
        return `Hello, ${name}`;
    }
};
App.styles = css `
    :host {
      display: block;
      border: solid 1px grey;
      background-color: rebeccapurple;
      color: white;
      padding: 30px;
      max-width: 400px;
    }
    button {
      background-color: orange;
      color: white;
      border-radius: 5rem;
      font-size: 1.5rem;
      padding: 1rem;
    }
  `;
__decorate([
    property()
], App.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], App.prototype, "count", void 0);
App = __decorate([
    customElement('my-app')
], App);
export { App };
//# sourceMappingURL=app.js.map