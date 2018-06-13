import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js'
import '@polymer/paper-input/paper-input.js'
import '@polymer/paper-progress/paper-progress.js'
import '@polymer/paper-styles/shadow.js'
import '@polymer/paper-styles/typography.js'
import '@polymer/paper-styles/color.js'

/**
 * `paper-loginscreen`
 * Material login screen, built using Polymer
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaperLoginscreen extends PolymerElement {
  static get template() {
    return html`
    <style>
      #loginForm {
          width: 450px;
          height: 450px;
          background: var(--login-form-background-color, white);
          @apply --shadow-elevation-12dp;
          @apply --login-form;
      }

      #loginFormContent {
          padding: 48px;
      }

      #loginFormContent>* {
          margin-top: 8px;
          margin-bottom: 8px;
      }

      #loginBtn {
          margin-top: 24px;
          float: right;
          background-color: var(--login-btn-background-color, var(--paper-indigo-500));
          color: var(--login-btn-text-color, white);
          --paper-button-raised-keyboard-focus: {
              background-color: var(--login-btn-raised-background-color, var(--paper-pink-a200)) !important;
              color: var(--login-btn-text-color, white) !important;
          }
          ;

          @apply --login-btn;
      }

      #loginBtn[disabled] {
          background-color: var(--login-btn-disabled-background-color, var(--paper-indigo-100));
      }

      h1 {
          @apply --paper-font-display1;
          margin: 0;
          @apply --login-title;
      }

      h2 {
          @apply --paper-font-title;
          margin: 0;
          @apply --login-subtitle;
      }

      paper-progress {
          width: 100%;
      }

      #errorMsg {
          margin-top: 16px;
          color: var(--login-error-label-color, var(--error-color));
          @apply --paper-font-menu;
      }
    </style>

    <div id="loginForm">
        <paper-progress disabled="[[!loading]]" indeterminate></paper-progress>
        <div id="loginFormContent">
            <h1>[[title]]</h1>
            <h2>[[subtitle]]</h2>
            <div id="errorMsg">[[errorMsg]]</div>
            <paper-input id="userInput" value="{{username}}" disabled="[[loading]]" type="text" label="[[userInputLabel]]" required
                error-message="[[userInputErrMsg]]"></paper-input>
            <paper-input id="passInput" value="{{password}}" disabled="[[loading]]" type="password" label="[[passwordInputLabel]]" required
                error-message="[[passwordInputErrMsg]]"></paper-input>
            <paper-button on-click="_login" disabled="[[loading]]" id="loginBtn" raised class="indigo">[[loginBtnText]]</paper-button>
            <slot name="links"></slot>
        </div>
    </div>
  `;
  }
  static get properties() {
    return {
      /**
      * Title of the loginscreen
      */
      title: String,

      /**
      * Subtitle of the loginscreen
      */
      subtitle: String,

      /**
      * Error message to show (example : "Invalid username")
      */
      errorMsg: String,

      /**
      * Content of the username field
      */
      username: {
        type: String,
        notify: true
      },

      /**
      * Content of the password field
      */
      password: {
        type: String,
        notify: true
      },

      /**
      * When true, all fields are disabled and the progress bar is visible
      */
      loading: {
        type: Boolean,
        value: false
      },

      /**
      * Placeholder of the username field
      */
      userInputLabel: {
        type: String,
        value: "Username"
      },

      /** 
      * Error message of the username field
      */
      userInputErrMsg: {
        type: String,
        value: "Username required"
      },

      /**
      * Placeholder of the password field
      */
      passwordInputLabel: {
        type: String,
        value: "Password"
      },

      /** 
      * Error message of the password field
      */
      passwordInputErrMsg: {
        type: String,
        value: "Password required"
      },

      /** 
      * Login button label
      */
      loginBtnText: {
        type: String,
        value: "Login"
      }
    }
  }

  ready() {
    super.ready();
    var self = this;
    this.$.loginForm.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {//Enter 
        self._login();
        return false;
      }
    });

  }

  _login() {
    if (this.$.userInput.validate() && this.$.passInput.validate()) {
      this.dispatchEvent(new CustomEvent('login-btn-click', { bubbles: true, composed: true }));
    }
  }

}

window.customElements.define('paper-loginscreen', PaperLoginscreen);
