class Login {
  constructor() {  
    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', this.doLogin);
    const registerForm = document.querySelector('#register-form');
    registerForm.addEventListener('submit', this.doRegister);
    }

  doLogin(event) {
    event.preventDefault();
    const loginUsername = document.querySelector("#username").value;
    const loginPassword = document.querySelector("#password").value;
    const loginBody = {
      username: loginUsername,
      password: loginPassword
        };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
            },
      body: JSON.stringify(loginBody)
        };
        
      return fetch('/login/', fetchOptions)
       .then(user =>   window.location.href = '/');
  }

 doRegister(event) {
    event.preventDefault();
    const registerUsername = document.querySelector("#reg-username").value;
    const registerPassword = document.querySelector("#reg-password").value;
    const registerBody = {
      username: registerUsername,
      password: registerPassword
        };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
            },
      body: JSON.stringify(registerBody)
        };
        
      return fetch('/register/', fetchOptions)
       .then(user =>   window.location.href = '/');
     }
}
// Init app
new Login();