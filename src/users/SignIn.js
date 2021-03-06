import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signInUser as signIn } from '../actions/user'
import { Link } from 'react-router-dom'
import Title from '../components/Title'
// import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

export class SignIn extends PureComponent {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const { email, password } = this.state
      this.props.signIn({ email, password })
    }
  }

  validateAll() {
    return this.validateEmail() &&
      this.validatePassword()
  }

  validateEmail() {
    const { email } = this.state

    // this is wrong! (TIP: use https://validatejs.org/)
    if (email.match(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/)) {
      this.setState({
        emailError: null
      })
      return true
    }

    if (email === '') {
      this.setState({
        emailError: 'Please provide your email address'
      })
      return false
    }

    this.setState({
      emailError: 'Please provide a valid email address'
    })
    return false
  }

  validatePassword() {
    const { password } = this.state

    if (password.length < 6) {
      this.setState({
        passwordError: 'Password is too short'
      })
      return false
    }

    if (password.match(/[a-zA-Z]+/) && password.match(/[0-9]+/)) {
      this.setState({
        passwordError: null
      })
      return true
    }

    this.setState({
      passwordError: 'Password should contain both letters and numbers'
    })
    return false
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, this.validateField(name))
  }

  validateField = name => _ => {
    switch(name) {
      case 'email' :
        return this.validateEmail()
      case 'password' :
        return this.validatePassword()
      default :
        return this.validateAll()
    }
  }

  render() {
    const {
      email, emailError,
      password, passwordError,
    } = this.state

    console.table(this.state)

    return (
      <Paper style={{ padding: '2rem', margin: '2rem auto' }} className="sign-up form">
        <Title content="Sign In" />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField
              type="email"
              label={emailError || 'Your email'}
              onChange={this.handleChange('email')}
              value={email}
              error={!!emailError}
            />
          </div>
          <div className="input">
            <TextField
              type="password"
              label={passwordError || 'Your password'}
              onChange={this.handleChange('password')}
              value={password}
              error={!!passwordError}
            />
          </div>
          <Button type="submit" raised color="primary">
            Sign in
          </Button>
          <p>No account yet?
            <Link to="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </p>
        </form>
      </Paper>
    )
  }
}

export default connect(null, { signIn })(SignIn)
