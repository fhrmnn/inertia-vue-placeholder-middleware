import { Router } from "@inertiajs/inertia/types/router";
import { App } from "@vue/runtime-core";

interface IInertiaPluginConfig {
  placeholderAttr: string;
  timeoutAttr: string;
}

const init = (
  vue: App<any>,
  inertiaInstance: Router,
  resolvePlaceholder: (name: string) => any,
  component: any,
  timeout: number | undefined,
  config: IInertiaPluginConfig
) => {
  inertiaInstance.on("start", (event: any) => {
    const compName = event?.explicitOriginalTarget?.attributes[config.placeholderAttr]?.value;
    const compTimeout = parseInt(event?.explicitOriginalTarget?.attributes[config.timeoutAttr]?.value || "0");

    if (!compName) {
      return;
    }

    component = resolvePlaceholder(compName);

    timeout = window.setTimeout(
      () =>
        // @ts-ignore
        inertiaInstance.swapComponent({
          component: component,
          page: {
            component: compName + "Placeholder",
            // @ts-ignore
            props: vue.$page.props,
            url: "",
            version: window.btoa(compName),
            scrollRegions: [],
            rememberedState: {},
            resolvedErrors: {},
          },
          preserveState: true,
        }),
      !isNaN(compTimeout) ? compTimeout : 0
    );
  });

  inertiaInstance.on("finish", () => {
    if (timeout) window.clearTimeout(timeout);
  });
};

const useInertiaPlaceholderPlugin = (config: IInertiaPluginConfig) => {
  const defaultConfig: IInertiaPluginConfig = {
    placeholderAttr: "placeholder",
    timeoutAttr: "timeout",
  };
  const component = undefined;
  const timeout: number | undefined = undefined;

  return {
    init: (vue: App<any>, inertiaInstance: Router, resolvePlaceholder: (name: string) => any) =>
      init(vue, inertiaInstance, resolvePlaceholder, component, timeout, { ...defaultConfig, ...config }),
  };
};

export default useInertiaPlaceholderPlugin;
