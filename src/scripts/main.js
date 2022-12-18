import settings from "@savchukoleksii/shopify-theme-settings-tool";
import * as sections from "@shopify/theme-sections";
import Swiper, { Navigation, Pagination } from "swiper";

Swiper.use([Navigation, Pagination]);

global.Swiper = Swiper;


window.theme = window.theme || {};

/*================ Components ================*/
require("./components/slider/slider");

/*================ Sections ================*/
require("./sections/dynamic-header");
require("./sections/collection-carousel");
require("./sections/product-carousel");

(async () => {
	try {
		await Promise.all([
			settings.load(),
			DOMContentLoadedPromise
		]);
	} catch (error) {}

	sections.load("*");

})();
