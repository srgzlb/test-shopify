import { register } from "@shopify/theme-sections";
import Slider from "../components/slider/slider";

const selectors = {
    addToCart: "[data-add-to-cart-form]",
	sliderContainer: ".js-product-carousel-container",
	arrowNext: ".js-product-carousel-next",
	arrowPrev: ".js-product-carousel-prev",
	pagination: ".js-product-carousel-pagination"
};

const modifiers = {
	active: "active",
	initialized: "initialized"
};

register("product-carousel", {
	onLoad: function () {
		this.initSlider();
        this.container.addEventListener("click", this.initAddToCart.bind(this));
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
                centeredSlides: true,
				navigation: {
					nextEl: this.sliderArrowsNext[index],
					prevEl: this.sliderArrowsPrev[index]
				},
				pagination: {
					el: this.sliderPagination[index],
					type: "bullets"
				},
                breakpoints: {
                    1024: {
                        centeredSlides: false
                    },
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
    initAddToCart() {
		this.addToCartBtns = [
			...this.container.querySelectorAll(selectors.addToCart)
		];

		if (!this.addToCartBtns.length) {
			return null;
		}

		this.addToCartBtns.forEach((button) => {
            console.log(button)
		});
	},
	onUnload: function () {
		if (!this.slider) {
			return false;
		}

		this.slider.destroy();
	}
});
