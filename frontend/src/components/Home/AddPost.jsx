import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input/Input';
import userLogo from "../../assets/userLogo1.jpg"
import Avatar from '../Avatar/Avatar.jsx'
import TxtArea from "../Input/TxtArea.jsx"
import { FiImage } from 'react-icons/fi'
import "../Home/AddPost.css"

function AddPost({ variant = "inline", onClose }) {

    const [selectFile, setSelectFile] = useState([])

    const handleFiles = (e) => {
        const files = Array.from(e.target.files)

        setSelectFile((prev) => [...prev, ...files]);
        // e.target.value(null)
    }

    const removeFile = (ItemIndex) => {
        setSelectFile((prev) => prev.filter((_, index) => index !== ItemIndex))
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
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
                            {
                                required: "Post can't be empty",
                                maxLength: {
                                    value: 280,
                                    message: "Post is too long"
                                }
                            })
                    } />

                    <div className="file-preview-container">
                        {selectFile.map((file, index) => (
                            <div className="file-previw-item" key={index}>

                                {file.type.startsWith("image/") ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        className="file-preview"
                                        alt="preview"
                                    />
                                ) : file.type.startsWith("video/") ? (
                                    <video
                                        src={URL.createObjectURL(file)}
                                        className="file-preview"
                                        controls
                                        muted
                                    />
                                ) : null}

                                <div className="file-preview-close">
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {errors.postContent && (
                        <p className='error'>{errors.postContent.message}nklsglsk</p>
                    )}

                    <div className='post-options'>
                        <label>
                            <FiImage className='image-icon' size={22} />
                            <Input type="file"
                                className="file-input"
                                hidden
                                multiple
                                accept="image/*,video/*"
                                {...register("files", {
                                    onChange: (e) => {
                                        handleFiles(e)
                                    }
                                })} />
                        </label>
                        <button type='submit' disabled={!content}>Post</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddPost
