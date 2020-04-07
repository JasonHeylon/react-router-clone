import { createContext } from "react";
import History from "./history";

export interface IContext {
  currentPath: string;
  history?: History;
}

const context = createContext<IContext>({
  currentPath: window.location.pathname
});

export default context;
