export interface IView {
	element: HTMLElement;
	createElement(tagName: string, className?: string): HTMLElement;
	addChild(child: Node): void;
	render(): HTMLElement;
}
