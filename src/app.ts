import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-app')
export class App extends LitElement {
  static override styles = css`
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

  @property()
  name = 'FED21G';

  @property({type: Number})
  count = 0;

  override render() {
    return html`
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }

  private _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  sayHello(name: string): string {
    return `Hello, ${name}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': App;
  }
}
