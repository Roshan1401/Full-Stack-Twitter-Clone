import React from 'react'
import logo from "../../assets/logo3.png"
import Input from '../Input/Input'
import { useForm } from "react-hook-form"
import "../LogIn/Login.css"
import { Link } from "react-router-dom" 

function Login() {
     const { register, handleSubmit } = useForm()
    
        const submit = async () => {
    
        }
    return (
       <div className='login-Container'>
            <div className='logo'>
                <img src={logo} alt="Logo" />
            </div>
            <div className='form-container'>
                <form onSubmit={handleSubmit(submit)}>
                    <h2>Log In</h2>
                    <Input
                        placeholder="Enter Your Email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        placeholder="Enter Your Password"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <button type='submit'>Log In</button>

                </form>
                <p>Create an account?&nbsp;
                    <Link
                        to="/signup"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
