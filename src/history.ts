type PathChangeEvent = (path: string) => void;

interface IProps {
  onPathChange?: PathChangeEvent;
}

export default class History {
  onPathChange: PathChangeEvent | null = null;
  pathStack: string[];

  constructor({ onPathChange }: IProps) {
    this.patch();
    if (onPathChange) this.onPathChange = onPathChange;
    this.pathStack = [window.location.pathname];
  }

  bindPathChange(handler: PathChangeEvent): void {
    this.onPathChange = handler;
  }

  push(path: string): void {
    window.history.pushState("data", "page", path);
  }

  handlePathChange = (): void => {
    if (this.onPathChange) {
      this.onPathChange(window.location.pathname);
    }
  };

  patch(): void {
    const historyPushState = window.history.pushState;
    const historyReplaceState = window.history.replaceState;

    window.history.pushState = (...args): void => {
      historyPushState.apply(window.history, args);

      this.pathStack.push(window.location.pathname);

      this.handlePathChange();
    };

    window.history.replaceState = (...args): void => {
      historyReplaceState.apply(window.history, args);

      if (this.pathStack.length > 0) {
        this.pathStack[this.pathStack.length - 1] = window.location.pathname;
      } else {
        this.pathStack.push(window.location.pathname);
      }

      this.handlePathChange();
    };

    window.onpopstate = (): void => {
      if (this.pathStack.length > 0) this.pathStack.pop();
      this.handlePathChange();
    };
  }
}
