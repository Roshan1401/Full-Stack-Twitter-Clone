import React from 'react'
import Container from '../../container/container'
import logo from "../../assets/logo3.png"
import Input from '../Input/Input'
import { useForm } from "react-hook-form"
import "../SignUp/SignUp.css"
import { Link } from "react-router-dom"

function SignUp() {
    const { register, handleSubmit } = useForm()

    const submit = async () => {

    }
    return (

        <div className='signup-Container'>
            <div className='logo'>
                <img src={logo} alt="Logo" />
            </div>
            <div className='form-container'>
                <form onSubmit={handleSubmit(submit)}>
                    <h2>Sign Up</h2>

                    <Input
                        placeholder="Enter Your Name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        placeholder="Enter username"
                        {...register("username", {
                            required: true,
                        })}
                    />
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
                    <button type='submit'>Sign UP</button>

                </form>
                <p>Already have an account?&nbsp;
                    <Link
                        to="/login"
                    >
                        Log In
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default SignUp
