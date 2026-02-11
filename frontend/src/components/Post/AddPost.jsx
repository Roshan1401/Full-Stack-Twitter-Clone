import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input.jsx";
import userLogo from "../../assets/userLogo1.jpg";
import Avatar from "../Avatar/Avatar.jsx";
import TxtArea from "../Input/TxtArea.jsx";
import { FiImage } from "react-icons/fi";
import "./AddPost.css";

function AddPost({ variant = "inline", onClose, addNewPost }) {
  const [selectFile, setSelectFile] = useState([]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    // console.log(files);

    setSelectFile((prev) => [...prev, ...files]);
    // e.target.value(null)
    // console.log(selectFile);
  };

  const removeFile = (ItemIndex) => {
    setSelectFile((prev) => prev.filter((_, index) => index !== ItemIndex));
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      postContent: "",
      images: null,
    },
  });

  const onSubmit = async (data) => {
    // console.log("Form data", data);

    try {
      const formData = new FormData();
      formData.append("postContent", data.postContent);
      selectFile.forEach((f) => {
        formData.append("files", f.file);
      });

      const res = await fetch("http://localhost:5000/api/v1/post/", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        // console.log("Post created successfully", result.data);
        addNewPost(result.data);
      }

      reset();
      setSelectFile([]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const postContent = watch("postContent");

  return (
    <form
      className={`add-post add-post--${variant}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {variant === "modal" && (
        <div className="add-post-modal-header">
          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>
      )}
      <div className="add-post-main">
        <div className="avatar">
          <Avatar imgUrl={userLogo} />
        </div>
        <div className="tweet">
          <TxtArea
            {...register("postContent", {
              required: "Post can't be empty",
              validate: (value) => value.trim() !== "" || "Post can't be empty",
              maxLength: {
                value: 280,
                message: "Post is too long",
              },
            })}
          />

          <div className="file-preview-container">
            {selectFile.map((file, index) => (
              <div className="file-previw-item" key={index}>
                {file.file.type.startsWith("image/") ? (
                  <img
                    src={file.preview}
                    className="file-preview"
                    alt="preview"
                  />
                ) : file.type.startsWith("video/") ? (
                  <video
                    src={file.preview}
                    className="file-preview"
                    controls
                    muted
                  />
                ) : null}

                <div className="file-preview-close">
                  <button type="button" onClick={() => removeFile(index)}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {errors.postContent && (
            <p className="error">{errors.postContent.message}</p>
          )}

          <div className="post-options">
            <label>
              <FiImage className="image-icon" size={22} />
              <Input
                type="file"
                className="file-input"
                hidden
                multiple
                accept="image/*,video/*"
                {...register("files", {
                  onChange: (e) => {
                    handleFiles(e);
                  },
                })}
              />
            </label>
            <button
              type="submit"
              disabled={!postContent?.trim() && selectFile.length === 0}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddPost;
