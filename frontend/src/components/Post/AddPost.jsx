import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input.jsx";
import Avatar from "../Avatar/Avatar.jsx";
import TxtArea from "../Input/TxtArea.jsx";
import { FiImage } from "react-icons/fi";
import "./AddPost.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../Redux/posts/postSlice.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import { useApi } from "../../hooks/useApi.js";

function AddPost({ variant = "inline", onClose }) {
  const [selectFile, setSelectFile] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(false);
  const { request } = useApi();

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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("postContent", data.postContent);
      selectFile.forEach((f) => {
        formData.append("files", f.file);
      });

      const result = await request("POST", "/post/", formData);

      if (result) {
        dispatch(addPost(result));
        onClose && onClose();
      }

      reset();
      setSelectFile([]);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
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
          <Avatar imgUrl={user?.avatar?.url || "/userLogo1.jpg"} />
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
                ) : file.file.type.startsWith("video/") ? (
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

      {loading && <LoadingSpinner />}
    </form>
  );
}

export default AddPost;
