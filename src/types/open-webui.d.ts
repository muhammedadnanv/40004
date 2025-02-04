interface OpenWebUIConfig {
  container: HTMLElement;
  theme?: 'light' | 'dark';
  defaultModel?: string;
  features?: {
    chat?: boolean;
    voiceInput?: boolean;
    codeHighlighting?: boolean;
    markdownSupport?: boolean;
  };
  branding?: {
    name?: string;
    logo?: string;
  };
}

interface OpenWebUI {
  init(config: OpenWebUIConfig): void;
  destroy(): void;
}

interface Window {
  OpenWebUI?: OpenWebUI;
}