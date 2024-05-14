class SimpleToggle extends HTMLElement {
    constructor() {
      super();
      this.button = document.createElement('button');
      this.button.textContent = 'Show';
      this.button.className = 'showHideButton';
      this.button.onclick = () => this.toggleContent();
      this.content = document.createElement('div');
      this.content.style.display = 'none';
      this.template = document.createElement('template');
      this.template.innerHTML = this.getAttribute('c');
      this.append(this.button, this.content);
    }
    toggleContent() {
      if (this.content.style.display === 'none') {
        this.content.appendChild(this.template.content.cloneNode(true));
        this.content.style.display = 'block';
        this.button.textContent = 'Hide';
      } else {
        this.content.innerHTML = '';
        this.content.style.display = 'none';
        this.button.textContent = 'Show';
      }
    }
  }
  customElements.define('s-t', SimpleToggle);
