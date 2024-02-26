import { override, addWebpackPlugin } from "customize-cra";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";

const addWorkboxPlugin = (config) => {
  // Add WorkboxWebpackPlugin to the webpack configuration
  return override(addWebpackPlugin(new WorkboxWebpackPlugin.GenerateSW()))(
    config
  );
};

export default addWorkboxPlugin;
