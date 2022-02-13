import { LitElement } from 'lit';
export declare class App extends LitElement {
    static styles: import("lit").CSSResult;
    name: string;
    count: number;
    render(): import("lit-html").TemplateResult<1>;
    private _onClick;
    sayHello(name: string): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-app': App;
    }
}
//# sourceMappingURL=app.d.ts.map