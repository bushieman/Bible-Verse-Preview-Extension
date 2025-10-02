import ReactDOM from "react-dom/client";
import App from "./App.tsx";


export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    let selectedText: string | null = null;
    // let ui: ReturnType<typeof createShadowRootUi>;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        ui &&
        ui.shadowHost &&
        !ui.shadowHost.contains(event.target as Node)
      ) {
        ui.remove();
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };

    const ui = await createShadowRootUi(ctx, {
      name: "wxt-react-example",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container ) => {
        const wrapper = document.createElement("div");
        container.append(wrapper);


        const root = ReactDOM.createRoot(wrapper);
        root.render(<App text={selectedText ?? undefined}/>);
        document.addEventListener('mousedown', handleClickOutside);
        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    // Listen for mouseup and pass selected text to ui.mount
    document.addEventListener("mouseup", (e) => {
      if (e.ctrlKey && e.altKey) {
        const text = window.getSelection()?.toString().trim();
        selectedText = text ? text : null;
        ui.mount(); // Pass text as a prop
      }
})
},
});

