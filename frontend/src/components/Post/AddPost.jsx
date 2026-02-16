import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input.jsx";
import userLogo from "../../assets/userLogo1.jpg";
import Avatar from "../Avatar/Avatar.jsx";
import TxtArea from "../Input/TxtArea.jsx";
import { FiImage } from "react-icons/fi";
import "./AddPost.css";
import { useDispatch } from "react-redux";
import { addPost } from "../../Redux/posts/postSlice.js";
import axios from "axios";

function AddPost({ variant = "inline", onClose }) {
  const [selectFile, setSelectFile] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("postContent", data.postContent);
      selectFile.forEach((f) => {
        formData.append("files", f.file);
      });

      const res = await axios.post(
        "http://localhost:5000/api/v1/post/",
        formData,
        {
          withCredentials: true,
        },
      );

      const result = res.data;

      if (result.success) {
        // console.log("Post created successfully", result.data);
        dispatch(addPost(result.data));
        setLoading(false);
        onClose && onClose();
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
      className={`add-post add-post--${variant} relative`}
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

      {loading && (
        <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.7)]">
          <svg
            className="h-7 w-7 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            aria-label="Loading"
            role="img"
          >
            <path
              fill="rgba(116, 192, 252, 1)"
              d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8-79.3 23.6-137.1 97.1-137.1 184.1 0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256 512 397.4 397.4 512 256 512S0 397.4 0 256c0-116 77.1-213.9 182.9-245.4 16.9-5 34.8 4.6 39.8 21.5z"
            />
          </svg>
        </div>
      )}
    </form>
  );
}

export default AddPost;
