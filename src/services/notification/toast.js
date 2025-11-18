class ToastService {
  constructor() {
    this.toasts = [];
    this.container = null;
    this.init();
  }

  init() {
    if (typeof window === "undefined") return;

    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }
  }

  /**
   * Show a toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, warning, info)
   * @param {number} duration - Duration in ms (default: 3000)
   */
  show(message, type = "info", duration = 3000) {
    const id = Date.now();
    const toast = this.createToast(id, message, type);

    this.container.appendChild(toast);
    this.toasts.push({ id, element: toast });

    setTimeout(() => {
      toast.style.transform = "translateX(0)";
      toast.style.opacity = "1";
    }, 10);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }

    return id;
  }

  /**
   * Create toast element
   * @param {number} id - Toast ID
   * @param {string} message - Toast message
   * @param {string} type - Toast type
   * @returns {HTMLElement} Toast element
   */
  createToast(id, message, type) {
    const toast = document.createElement("div");
    toast.id = `toast-${id}`;

    const colors = {
      success: { bg: "#10b981", icon: "✓" },
      error: { bg: "#ef4444", icon: "✕" },
      warning: { bg: "#f59e0b", icon: "⚠" },
      info: { bg: "#3b82f6", icon: "ℹ" },
    };

    const { bg, icon } = colors[type] || colors.info;

    toast.style.cssText = `
      min-width: 300px;
      max-width: 400px;
      padding: 16px 20px;
      background: ${bg};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      pointer-events: auto;
      cursor: pointer;
      transform: translateX(400px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    toast.innerHTML = `
      <span style="font-size: 18px; flex-shrink: 0;">${icon}</span>
      <span style="flex: 1;">${message}</span>
      <button 
        onclick="window.toastService.remove(${id})" 
        style="
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: opacity 0.2s;
        "
        onmouseover="this.style.opacity='1'"
        onmouseout="this.style.opacity='0.8'"
      >
        ×
      </button>
    `;

    toast.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        this.remove(id);
      }
    });

    return toast;
  }

  /**
   * Remove a toast
   * @param {number} id - Toast ID
   */
  remove(id) {
    const toastIndex = this.toasts.findIndex((t) => t.id === id);
    if (toastIndex === -1) return;

    const { element } = this.toasts[toastIndex];

    element.style.transform = "translateX(400px)";
    element.style.opacity = "0";

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.toasts.splice(toastIndex, 1);
    }, 300);
  }

  clear() {
    this.toasts.forEach(({ id }) => this.remove(id));
  }

  success(message, duration) {
    return this.show(message, "success", duration);
  }

  error(message, duration) {
    return this.show(message, "error", duration);
  }

  warning(message, duration) {
    return this.show(message, "warning", duration);
  }

  info(message, duration) {
    return this.show(message, "info", duration);
  }
}

const toastService = new ToastService();

if (typeof window !== "undefined") {
  window.toastService = toastService;
}

export default toastService;
