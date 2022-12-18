import { register } from "@shopify/theme-sections";
import Slider from "../components/slider/slider";

const selectors = {
    addToCartButton: "[data-add-to-cart]",
	sliderContainer: ".js-product-carousel-container",
	arrowNext: ".js-product-carousel-next",
	arrowPrev: ".js-product-carousel-prev",
	pagination: ".js-product-carousel-pagination"
};

const data = {
	name: "name",
	id: "id",
	value: "value"
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
    initAddToCart(e) {
		e.preventDefault();

		this.addToCartButtons = [
			...this.container.querySelectorAll(selectors.addToCartButton)
		];

		if (!this.addToCartButtons.length) {
			return null;
		}

		let target = e.target
		let elements = [...target.parentNode.children].filter((child) => child !== target);

		elements.forEach((el) => {
			let attr = el.getAttribute(data.name);
			if (attr === data.id) {
				let value = el.getAttribute(data.value);
				console.log(`Product with ID ${value} added to cart`);
			}
		})
	},
	onUnload: function () {
		if (!this.slider) {
			return false;
		}

		this.slider.destroy();
	}
});
