import { register } from "@shopify/theme-sections";
import Slider from "components/slider/slider";

const selectors = {
	section: ".collection-carousel-section",
	opener: "[data-tab-target]",
	tab: "[data-tab-content]",
	sliderContainer: ".js-collection-carousel-container",
	arrowNext: ".js-collection-carousel-next",
	arrowPrev: ".js-collection-carousel-prev",
	pagination: ".js-collection-carousel-pagination"
};

const modifiers = {
	active: "active",
	initialized: "initialized"
};

const classes = {
	tab: "js-tab"
};

const data = {
	tabTarget: "data-tab-target",
	id: "id"
};

register("collection-carousel", {
	onLoad: function () {
		this.initElements();
		this.initEvents();
		this.initStylesSiblingSections();
	},
	initEvents() {
		this.container.addEventListener("click", this.initTabs.bind(this));
	},
	initElements() {
		this.initSlider();
		this.tabs = [...this.container.querySelectorAll(selectors.opener)];
		this.tabContents = [...this.container.querySelectorAll(selectors.tab)];
		this.section = document.querySelector(selectors.section);
	},
	initStylesSiblingSections() {
		if (!this.section) {
			return null;
		}

		const styles = `
    		position: relative;
			z-index: 1;`;

		if (this.section.previousSibling) {
			this.section.previousSibling.style = styles;
		}

		if (this.section.nextSibling) {
			this.section.nextSibling.style = styles;
		}
	},
	initTabs(e) {
		let target = e.target;

		if (!target.classList.contains(classes.tab)) {
			return null;
		}

		this.tabs.forEach((tab) => {
			tab.classList.remove(modifiers.active);
			target.classList.add(modifiers.active);
		});

		this.tabContents.forEach((tabContent) => {
			tabContent.classList.remove(modifiers.active);
			let contentId = tabContent.getAttribute(data.id);
			let tabId = target.getAttribute(data.tabTarget).substring(1);

			if (contentId === tabId) {
				tabContent.classList.add(modifiers.active);
			}
		});
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
