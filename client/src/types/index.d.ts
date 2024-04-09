// Declaration file telling TypeScript how to handle imports of CSS modules.
declare module "*.module.css" {
  // Define a content constant with the type 'Record<string, string>'.
  const content: Record<string, string>;
  // Export default export of the module, allowing TypeScript to provide type checking and auto-completion for CSS class names when using CSS modules.
  export default content;
}
