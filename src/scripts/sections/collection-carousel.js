import { register } from "@shopify/theme-sections";
import Slider from "../components/slider/slider";

const selectors = {
	sliderContainer: ".js-collection-carousel-container",
	arrowNext: ".js-collection-carousel-next",
	arrowPrev: ".js-collection-carousel-prev",
	pagination: ".js-collection-carousel-pagination"
};

const modifiers = {
	active: "active",
	initialized: "initialized"
};

register("collection-carousel", {
	onLoad: function () {
		this.initSlider();
	},
	initSlider() {
		this.sliderContainers = [
			...this.container.querySelectorAll(selectors.sliderContainer)
		];
		this.sliderArrowsPrev = [
			...this.container.querySelectorAll(selectors.arrowPrev)
		];
		this.sliderArrowsNext = [
			...this.container.querySelectorAll(selectors.arrowNext)
		];
		this.sliderPagination = [
			...this.container.querySelectorAll(selectors.pagination)
		];

		if (!this.sliderContainers.length) {
			return null;
		}

		this.sliderContainers.forEach((slider, index) => {
			this.options = {
				slidesPerView: "auto",
				spaceBetween: 0,
				navigation: {
					nextEl: this.sliderArrowsNext[index],
					prevEl: this.sliderArrowsPrev[index]
				},
				pagination: {
					el: this.sliderPagination[index],
					type: "bullets"
				},
				on: {
					afterInit: () => {
						slider.classList.add(modifiers.initialized);
					}
				}
			};

			this.slider = new Slider(slider, this.options);
		});
	},
	onUnload: function () {
		if (!this.slider) {
			return false;
		}

		this.slider.destroy();
	}
});
