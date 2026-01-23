import React from 'react'
import {useForm} from 'react-hook-form'
import Input from '../Input/Input';
import userLogo from "../../assets/userLogo1.jpg"
import Avatar from '../Avatar/Avatar.jsx'
import TxtArea from "../Input/TxtArea.jsx"
import { FiImage } from 'react-icons/fi'
import "../Home/AddPost.css"

function AddPost({variant ="inline", onClose}) {

    const {register, handleSubmit, watch,formState: {errors}} = useForm({
        defaultValues: {
            postContent: "",
            images: null
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    const content = watch("postContent")
    
    return (
        <form className={`add-post add-post--${variant}`} onSubmit={handleSubmit(onSubmit)}>
            {
                variant === "modal" && (
                    <div className='add-post-modal-header'>
                        <button type="button" onClick={onClose}>✕</button>
                    </div>
                )
            }
            <div className='add-post-main'>
                                <div className='avatar'>
                                    <Avatar imgUrl={userLogo} />
                                </div>
                                <div className='tweet'>
                                    <TxtArea {
                                        ...register("postContent", 
                                            { required: "Post can't be empty", 
                                                maxLength: {
                                                    value: 280,
                                                    message: "Post is too long"
                                                }
                                            })
                                    }/>

                                    {errors.postContent && (
                                        <p className='error'>{errors.postContent.message}nklsglsk</p>
                                    )}
                                    
                                    <div className='post-options'>
                                        <label>
                                        <FiImage className='image-icon' size={22} />
                                        <Input type= "file" 
                                               className="file-input"
                                               hidden
                                               multiple
                                               accept='image/*'
                                               {...register("images")}   />
                                        </label>
                                        <button type='submit' disabled={!content}>Post</button>
                                    </div>
                                </div>
                                </div>
                            </form>
    )
}

export default AddPost
