import { createApp } from "vue";

const mount = (
  RenderElement, rootElement, props
) => {
  const app = createApp(RenderElement, props);
  app.mount(rootElement);

  return () => {
    app.unmount()
  }
}

export default mount;