import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Input from "../Input/Input";
import TxtArea from "../Input/TxtArea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../Redux/profile/profileSlice";

function EditProfile({ onClose }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState({
    avatar: null,
    banner: null,
  });

  const [avatar, setAvatar] = useState(
    useSelector((state) => state.auth.userInfo?.avatar),
  );
  const [banner, setBanner] = useState(
    useSelector((state) => state.auth.userInfo?.banner),
  );

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userInfo);
  const username = currentUser?.username;
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setSelectedFile((prev) => ({
      ...prev,
      [type]: {
        file,
        preview,
      },
    }));
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/user/profile/${username}`,
        {
          withCredentials: true,
        },
      );

      const data = res.data;

      if (data.success) {
        // console.log(data);
        dispatch(setUserProfile(data.data));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (selectedFile.avatar) {
        formData.append("avatar", selectedFile.avatar.file);
      }
      if (selectedFile.banner) {
        formData.append("banner", selectedFile.banner.file);
      }
      formData.append("name", data.name);
      formData.append("bio", data.bio);

      const res = await axios.put(
        "http://localhost:5000/api/v1/user/edit",
        formData,
        {
          withCredentials: true,
        },
      );

      const result = res.data;
      console.log("Update profile result", result);
      if (result.success) {
        reset();
        onClose();
        await fetchUserProfile();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center gap-10 text-white">
          <div className="flex cursor-pointer items-center justify-center rounded-full px-2 py-1 text-2xl hover:bg-[rgba(67,67,67,0.7)]">
            <button onClick={onClose}>✕</button>
          </div>
          <h1 className="text-xl">Edit Profile</h1>
          <button
            type="submit"
            className="ml-auto cursor-pointer rounded-2xl bg-white px-4 py-2 text-sm font-bold text-black hover:bg-[rgba(200,198,198,0.94)]"
          >
            Save
          </button>
        </div>

        <div className="relative">
          <div className="relative h-45 w-full border">
            <img
              src={
                selectedFile.banner
                  ? selectedFile.banner.preview
                  : banner.url || "/banner.jpg"
              }
              className="h-full w-full object-cover blur-[2px]"
              alt=""
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
              <div className="cursor-pointer rounded-full bg-[rgba(67,67,67,0.7)] p-2 hover:bg-white hover:text-black">
                <label className="cursor-pointer">
                  <Camera />
                  <Input
                    type="file"
                    hidden
                    accept="image/"
                    {...register("banner")}
                    onChange={(e) => handleFileChange(e, "banner")}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="bottom absolute inset-x-0 top-28 ml-5 h-33.5 w-33.5 overflow-hidden rounded-full border-4 border-black bg-gray-300">
            <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
              <div className="cursor-pointer rounded-full bg-[rgba(67,67,67,0.7)] p-2 hover:bg-white hover:text-black">
                <label className="cursor-pointer">
                  <Camera />
                  <Input
                    type="file"
                    hidden
                    accept="image/"
                    {...register("avatar")}
                    onChange={(e) => handleFileChange(e, "avatar")}
                  />
                </label>
              </div>
            </div>
            <img
              src={
                selectedFile.avatar
                  ? selectedFile.avatar.preview
                  : avatar.url || "/userLogo1.jpg"
              }
              className="opacity-0.1 h-full w-full object-cover"
              alt="Profile"
            />
          </div>
        </div>
        <div className="h-20" />

        <div>
          <Input
            className="rounded-sm text-white"
            {...register("name")}
            placeholder="Name"
          />
          <Input
            className="rounded-sm text-white"
            {...register("bio")}
            placeholder="Bio"
          />
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
    </>
  );
}

export default EditProfile;
