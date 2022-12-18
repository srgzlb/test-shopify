import settings from "@savchukoleksii/shopify-theme-settings-tool";
import * as sections from "@shopify/theme-sections";
import Swiper, { Navigation, Pagination } from "swiper";

Swiper.use([Navigation, Pagination]);

global.Swiper = Swiper;

const DOMContentLoadedPromise = new Promise((resolve) => {
	document.addEventListener("DOMContentLoaded", async () => {
		resolve();
	});
});

window.theme = window.theme || {};

/*================ Components ================*/
require("./components/slider/slider");

/*================ Sections ================*/
// require("./sections/slider");
require("./sections/dynamic-header");
// require("./sections/collection-carousel");

(async () => {
	try {
		await Promise.all([
			settings.load(),
			DOMContentLoadedPromise
		]);

		// document.dispatchEvent(new CustomEvent("theme:all:loaded"));
	} catch (error) {}

	sections.load("*");

})();
