import React, {useState, useEffect} from 'react'
import loinBackground from "../attachments/skkolqw9.bmp";

const Login = ({setUser}) => {
  const [signup, setSignup] = useState(false)
  const [invalidLogin, setinvalidLogin] = useState(false)
  const [invalidSignup, setInvalidSignup] = useState({
    username: false,
    usernameTaken: false, 
    password: false,
    passwordConfirmation: false
  })

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: ""
  })

  useEffect(() => {
    setFormData({
      username: "",
      password: "",
      passwordConfirmation: ""
    })
  }, [signup])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (signup) {
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({
          ...formData,
          password_confirmation: formData.passwordConfirmation
        })
      })
      .then(r => r.json())
      .then(d => {
        if (d.errors) {
          let errors = {
            username: false,
            usernameTaken: false, 
            password: false,
            passwordConfirmation: false
          }

          if (d.errors.includes("Password can't be blank")) {
            errors = {
              ...errors,
              password: true
            }
          } 

          if (d.errors.includes("Username can't be blank")) {
            errors = {
              ...errors,
              username: true
            }
          }

          if (d.errors.includes("Username has already been taken")) {
            errors = {
              ...errors,
              usernameTaken: true
            }
          }

          if (d.errors.includes("Password confirmation doesn't match Password")) {
            errors = {
              ...errors,
              passwordConfirmation: true
            }
          }

          setInvalidSignup(errors)
        } else {
          setFormData({
            username: "",
            password: "",
            passwordConfirmation: ""
          })
          setSignup(v => !v)
        }
      })
    } else {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        })
      })
      .then(r => r.json())
      .then(d => {
        if (d.errors && d.errors[0] === "Invalid username or password") {
          setinvalidLogin(true)
        } else if (d.errors) {
          alert("Unknown error")
        } else {
          setUser(d)
        }
      })
    }
  }

  return (
    <div className='Login absolute h-screen w-screen'>
      <img src={loinBackground} alt="loinBackground" className='h-screen w-screen pointer-events-none' />

      <div className={`login-box absolute select-none top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 h-96 w-96 ${signup && 'taller-login'} bg-white rounded-md p-8 shadow-lg`}>
        
        <div className='login-header-div w-full text-center'>
          <h1 className="login-header text-neutral-700 text-3xl">Welcome to Harmony!</h1>
          <h2 className="subtext text-neutral-500">We're glad you're here.</h2>
        </div>

        <div className={`login-form w-full mt-7 flex ${signup && 'justify-center'}`}>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <label className={`login-label ${invalidLogin || invalidSignup.username || invalidSignup.usernameTaken ? 'text-red-400' : 'text-neutral-500'} text-xs mb-2`} htmlFor="">USERNAME {invalidLogin && '- Invalid username or password.'}{invalidSignup.usernameTaken &&  "- Username is taken."}{invalidSignup.username && "- Username can't be blank."}</label>
            <input type="text" id='username' name='username' className='login-user bg-neutral-200 w-80 font-normal text-neutral-700 p-2' onChange={handleChange} value={formData.username} />
            <label className={`login-label ${invalidLogin || invalidSignup.password || invalidSignup.passwordConfirmation  ? 'text-red-400' : 'text-neutral-500'} text-xs mt-5 mb-2`}  htmlFor="">PASSWORD {invalidLogin && '- Invalid username or password.'}{invalidSignup.password && "- Password can't be blank."}{invalidSignup.passwordConfirmation && "- Passwords don't match."}</label>
            <input type="password" id='password' name='password' className='login-pass bg-neutral-200 w-80 p-2 text-neutral-700' onChange={handleChange} value={formData.password}/>
            { signup && 
              <>
                <label className={`login-label ${invalidSignup.passwordConfirmation  ? 'text-red-400' : 'text-neutral-500'} text-xs mt-5 mb-2`}  htmlFor="">CONFIRM PASSWORD {invalidSignup.passwordConfirmation && "- Passwords don't match."}</label>
                <input type="password" id='passwordConfirmation' name='passwordConfirmation' className='login-pass bg-neutral-200 w-80 p-2 text-neutral-700' onChange={handleChange} value={formData.passwordConfirmation}/> 
              </>
              }
            <button className="login-button w-80 h-12 bg-yellow-500 mt-9 text-neutral-700 font-bold transition-all hover:bg-yellow-600 active:bg-yellow-700 rounded-md">{signup ? "Signup" : 'Login'}</button>
          </form>
        </div>
        

        { !signup && 
            <div className='signup? absolute right-10 top-44 text-center'>
              <h1 className='text-neutral-600 text-sm'>Don't have an account yet?</h1>
              <h2 className='text-yellow-500 text-sm border-b-2 w-fit border-b-yellow-500 cursor-pointer' onClick={() => {
                setSignup(v => !v) 
                setinvalidLogin(false)
                setInvalidSignup({
                  username: false,
                  password: false,
                  passwordConfirmation: false
                })
                }}>Sign up!</h2>
            </div>
              }
      </div>
    </div>
  )
}

export default Login