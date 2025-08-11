import { createRoot } from 'react-dom/client';
import MultiStepForm from '../components/multiStepForm/multiStepForm';
import '../styles/globals.css';

class MultiStepFormElement extends HTMLElement {
  connectedCallback() {
    const container = document.createElement('div');
    this.appendChild(container);

    const root = createRoot(container);

    root.render(
      <MultiStepForm
        onSubmit={(detail) => {
          this.dispatchEvent(
            new CustomEvent('formSubmit', {
              detail,
              bubbles: true,
              composed: true,
            }),
          );
        }}
      />,
    );
  }
}

customElements.define('multi-step-form', MultiStepFormElement);
