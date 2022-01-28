
# inertia vue placeholder middleware

  
This package adds a component placeholder middleware for inertia vue. instead of the InertiaProgressBar you can show predefined components while inertia is loading the requested page.

## Usage
install

    npm i inertia-vue-placeholder-middleware -S

import and setup

	import { createInertiaApp } from "@inertiajs/inertia-vue3";
    import { Inertia } from  "@inertiajs/inertia";
    import  inertiaPlaceholder  from  "inertia-vue-placeholder-middleware/dist";

    createInertiaApp({
		title: (title) =>  `${title} - ${appName}`,
		resolve: (name) => {
			return  require(`./Pages/${name}.vue`);
		},
		setup({ el, app, props, plugin }) {
			const  vueApp = createApp({ render: () =>  h(app, props) })
				.use(plugin)
				.mixin({ methods: { route } })
				.mount(el);
			inertiaPlaceholder().init(vueApp, Inertia, (name) => {
				return  require(`./Placeholder/${name}Placeholder.vue`).default;
			});
			return  vueApp;
		},
    });

Update inertia link in vue template

    <Link href="/" placeholder="Dashboard" timeout="100"/>

## Configuration

inertiaPlaceholder() accepts following options:

|Option|Description  |
|--|--|
|placeholderAttr (default = placeholder)|defines the name of the html attribute to look for the component name  |
|timeoutAttr(default = timeout)|defines the name of the html attribute to look for the timeout value  |

