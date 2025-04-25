export interface IModal {
	modal: HTMLElement;
	renderModal(element: HTMLElement): void;
	onClose(): void;
}

export abstract class Modal implements IModal {
	modal: HTMLElement;

	constructor() {
		this.modal = document.querySelector('#modal-container');
	}

	onClose(): void {
		this.modal.classList.remove('modal_active');
		this.modal.querySelector('.modal__content').innerHTML = '';
		document.body.style.overflow = 'auto';
	}

	renderModal(element: HTMLElement) {
		this.modal.querySelector('.modal__close').addEventListener('click', () => {
			this.onClose();
		});
		this.modal.addEventListener('click', (event: MouseEvent) => {
			if (event.target === this.modal) {
				this.onClose();
			}
		});
		document.body.style.overflow = 'hidden';
		this.modal.style.position = 'fixed';

		this.modal.querySelector('.modal__content').appendChild(element);
		this.modal.classList.add('modal_active');
	}
}
