import Swiper, { Navigation, Pagination } from "swiper";

Swiper.use([Navigation, Pagination]);

const selectors = {
	arrow: "[data-slider-arrow]",
	cardImageWrapper: "[data-card-image-wrapper]"
};

const modifiers = {
	initialized: "initialized"
};

class Slider {
	constructor(container, options) {
		this.container = container;

		this.options = {
			slidesPerView: "auto",
			spaceBetween: 0,
			navigation: false,
			pagination: false,
			on: {
				afterInit: () => {
					this.setArrowsVerticalPosition();
					this.container.classList.add(modifiers.initialized);
				},
				beforeResize: () => {
					this.setArrowsVerticalPosition();
				},
				update: () => {
					this.setArrowsVerticalPosition();
				}
			},
			...options
		};

		this.init();
	}

	init() {
		if (!this.container) {
			return null;
		}

		this.cardImageWrapper =
			this.container.querySelector(selectors.cardImageWrapper) ?? null;

		this.slider = new Swiper(this.container, this.options);
	}

	destroy(deleteInstance = false, clearStyles = false) {
		if (!this.slider) {
			return null;
		}

		this.slider.destroy(deleteInstance, clearStyles);
	}

	setArrowsVerticalPosition() {
		if (!this.options.navigation || !this.cardImageWrapper) {
			return null;
		}

		const arrows = this.container.querySelectorAll(selectors.arrow);

		if (!arrows) {
			return null;
		}

		const position = `${this.cardImageWrapper.offsetHeight / 2}px`;

		arrows.forEach((arrow) => {
			arrow.style.top = position;
		});
	}
}

export default Slider;
