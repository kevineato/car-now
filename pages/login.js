import React from 'react'

class Login extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    let formEmail = e.currentTarget.elements["email"].value
    let formPass = e.currentTarget.elements["password"].value

    let email = sessionStorage.getItem("email")
    let password = sessionStorage.getItem("password")

    if (formEmail === email && formPass === password) {
      sessionStorage.setItem("loggedIn", "true")
      location.replace("http://localhost:3000")
    } else {
      alert("Invalid email or password.")
    }
  }

  render() {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center">
        <form method="post" onSubmit={e => this.handleSubmit(e)}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" name="password" id="inputPassword" className="form-control my-3" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <a className="btn btn-lg btn-success btn-block" type="button" href="/register">Register</a>
        </form>
      </div>
    )
  }
}

export default Login
