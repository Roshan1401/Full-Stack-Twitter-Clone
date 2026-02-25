import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Input from "../Input/Input";
import TxtArea from "../Input/TxtArea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../Redux/profile/profileSlice";
import { setUserInfo } from "../../Redux/auth/authSlice";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

function EditProfile({ onClose }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState({
    avatar: null,
    banner: null,
  });
  const currentUser = useSelector((state) => state.auth.userInfo);

  const [avatar, setAvatar] = useState(currentUser?.avatar || "/userLogo1.jpg");
  const [banner, setBanner] = useState(currentUser?.banner || "/banner.jpg");

  useEffect(() => {
    setAvatar(currentUser?.avatar || "/userLogo1.jpg");
    setBanner(currentUser?.banner || "/banner.jpg");
  }, [currentUser]);

  const dispatch = useDispatch();
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
        dispatch(setUserInfo(data.data.user));
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
                  ? selectedFile?.banner?.preview
                  : banner?.url || "/banner.jpg"
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
                  ? selectedFile?.avatar?.preview
                  : avatar?.url || "/userLogo1.jpg"
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

        {loading && <LoadingSpinner />}
      </form>
    </>
  );
}

export default EditProfile;
