import { register } from "@shopify/theme-sections";

const selectors = {
	body: "body",
	topBar: {
		container: "[data-header-topbar]"
	},
	header: {
		container: "[data-header-content]"
	},
	search: {
		container: "[data-search-container]",
		opener: "[data-search-opener]",
		close: "[data-search-close]"
	},
	menuMobile: {
		mobileMenuOpener: "[data-open-mobmenu]",
		mobileMenuCloser: "[data-menu-close]",
		mobileMenuContainer: "[data-mobmenu-container]",
		mobileMenuDropdown: "[data-mobmenu-dropdown]",
		mobileParentLink: "[data-mob-parent-link]",
		mobileDropdownMenuClose: "[data-mobdropdown-close]"
	},
	menuDesktop: {
		container: "[data-menu-dropdown]",
		dropItem: "[data-dropdown-item]",
		item: "[data-menu-item]"
	}
};

const classes = {
	active: "active",
	child: "only-child"
};

const modifiers = {
	active: "active",
	headerSticky: "header--sticky",
	mobileMenuOpened: "mobile-menu-opened",
	mobileDropdownOpened: "mobile-dropdown-opened",
	overflow: "overflow-hidden-body",
	searchView: "header__search--view",
	searchActive: "header-search-active",
	scrolled: "page-scrolled"
};

register("dynamic-header", {
	onLoad: function () {
		this.initElements();
		this.initEvents();
	},
	initElements () {
		this.searchContainer = this.container.querySelector(selectors.search.container);
		this.searchOpener = this.container.querySelector(selectors.search.opener);
		this.searchCloser = this.container.querySelector(selectors.search.close);
		this.headerContainer = this.container.querySelector(selectors.header.container);
		this.topBar = this.container.querySelector(selectors.topBar.container);
		this.mobileMenuOpener = this.container.querySelector(selectors.menuMobile.mobileMenuOpener);
		this.mobileMenuCloser = this.container.querySelector(selectors.menuMobile.mobileMenuCloser);
		this.mobileMenuContainer = this.container.querySelector(selectors.menuMobile.mobileMenuContainer);

		this.mobileParentLinkArray = [...this.container.querySelectorAll(selectors.menuMobile.mobileParentLink)];
		this.mobileDropdownMenuClose = [...this.container.querySelectorAll(selectors.menuMobile.mobileDropdownMenuClose)];
		this.desktopDropdownsArray = [...this.container.querySelectorAll(selectors.menuDesktop.container)];
		this.desktopMenuItemsArray = [...this.container.querySelectorAll(selectors.menuDesktop.item)];
	},
	initEvents () {
		this.initDesktopMenuOpenClose();
		this.initOnlyOneDropdownChild();
		this.searchOpener.addEventListener("click", this.initSearchOpen.bind(this));
		this.searchCloser.addEventListener("click", this.initSearchClose.bind(this));
		this.mobileMenuOpener.addEventListener("click", this.initMobileMenuOpen.bind(this));
		this.mobileMenuCloser.addEventListener("click", this.initMobileMenuClose.bind(this));

		this.mobileParentLinkArray.forEach((link) => {
			link.addEventListener("click", this.initMobileDropdownOpen.bind(this));
		});
		this.mobileMenuContainer.addEventListener("click",this.initMobileDropdownClose.bind(this));
		window.addEventListener("scroll", this.initHeaderScroll.bind(this));
		window.addEventListener("resize", this.initHeaderHeight.bind(this));
	},
	initSearchOpen: function (e) {
		e.preventDefault();

		if (!this.searchContainer) {
			return false;
		}

		document.querySelector(selectors.body).classList.add(modifiers.searchActive);
		document.querySelector(selectors.body).classList.remove(modifiers.overflow);
		this.mobileMenuContainer.classList.remove(modifiers.mobileMenuOpened);
		this.searchContainer.classList.add(modifiers.searchView);
	},
	initSearchClose: function (e) {
		e.preventDefault();

		if (!this.searchContainer) {
			return false;
		}

		document.querySelector(selectors.body).classList.remove(modifiers.searchActive);
		this.searchContainer.classList.remove(modifiers.searchView);
	},
	initHeaderScroll: function () {
		const headerTopBarHeight = this.topBar.offsetHeight;
		const headerContainerHeight = this.headerContainer.offsetHeight;

		if (!headerContainerHeight) {
			return false;
		}

		const body = document.querySelector(selectors.body);

		if (window.scrollY > headerTopBarHeight) {
			this.headerContainer.classList.add(modifiers.headerSticky);
			body.classList.add(modifiers.scrolled);
			this.initHeaderHeight();
		} else {
			this.headerContainer.classList.remove(modifiers.headerSticky);
			body.classList.remove(modifiers.scrolled);
			document.documentElement.style.setProperty("--header-height", "0");
		}
	},
	initHeaderHeight: function () {
		const setHeaderHeight = () => {
			const headerContainerHeight = this.headerContainer.offsetHeight;
			document.documentElement.style.setProperty(
				"--header-height",
				headerContainerHeight + "px"
			);
		};

		setHeaderHeight();
	},
	overflowBody: function () {
		document.querySelector(selectors.body).classList.toggle(modifiers.overflow);
	},
	initMobileMenuOpen: function (e) {
		e.preventDefault();

		const target = e.target;
		const opener = target.closest(selectors.menuMobile.mobileMenuOpener);

		if (!opener) {
			return false;
		}

		this.mobileMenuContainer.classList.add(modifiers.mobileMenuOpened);
		this.overflowBody();
	},
	initMobileMenuClose: function (e) {
		e.preventDefault();

		const target = e.target;
		const closer = target.closest(selectors.menuMobile.mobileMenuCloser);

		if (!closer) {
			return false;
		}

		this.mobileMenuContainer.classList.remove(modifiers.mobileMenuOpened);
		this.overflowBody();
	},
	initMobileDropdownOpen: function (e) {
		const target = e.target;
		const openerLink = target.closest(
			selectors.menuMobile.mobileParentLink
		);

		if (!openerLink) {
			return false;
		}

		this.mobileMenuContainer.classList.add(modifiers.mobileMenuOpened);
		openerLink.classList.add(modifiers.mobileDropdownOpened);
	},
	initMobileDropdownClose: function (e) {
		const target = e.target;
		const closerLink = target.closest(
			selectors.menuMobile.mobileDropdownMenuClose
		);

		if (!closerLink || !target) {
			return false;
		}

		this.mobileDropdownMenuClose.forEach((element) => {
			let parentMobLink = element.closest(
				selectors.menuMobile.mobileParentLink
			);
			parentMobLink.classList.remove(modifiers.mobileDropdownOpened);
		});
	},
	initOnlyOneDropdownChild: function () {
		if (!this.desktopDropdownsArray.length) {
			return false;
		}

		this.desktopDropdownsArray.forEach((child) => {
			const children = child.querySelectorAll(
				selectors.menuDesktop.dropItem
			);
			if (children.length === 1) {
				children[0].classList.add(classes.child);
			}
		});
	},
	initDesktopMenuOpenClose: function () {
		if (!this.desktopMenuItemsArray.length) {
			return false;
		}

		this.desktopMenuItemsArray.forEach((element) => {
			element.addEventListener("mouseover", function () {
				if (!element.classList.contains(classes.active)) {
					element.classList.add(modifiers.active);
				}
			});
			element.addEventListener("mouseout", function () {
				if (element.classList.contains(classes.active)) {
					element.classList.remove(modifiers.active);
				}
			});
		});
	}
});
