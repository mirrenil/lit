import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-app')
export class App extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      border: solid 1px grey;
      background-color: darkblue;
      color: white;
      padding: 30px;
      max-width: 400px;
    }
    button {
      background-color: lightblue;
      color: grey;
      border-radius: 5rem;
      font-size: 1.5rem;
      padding: 1rem;
    }
  `;
  //@property renderar om när den har fått en input
  @property()
  name = 'FED21G';
  //@property gör att man inte behöver kalla på render, sidan renderas automatiskt!
  @property({type: Number})
  count = 0;

  override render() {
    return html`
      <h1>${this.sayHello(this.name)}!</h1>
      // Event listeners
      <button @click=${this._onClick} part="button">
        Du har klickat ${this.count} gång/er
      </button>
    `;
  }
  // plussar countern varje gång man klickar
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
