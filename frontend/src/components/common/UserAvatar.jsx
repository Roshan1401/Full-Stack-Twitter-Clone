import Avatar from "../Avatar/Avatar";

function UserAvatar({ user, size = "default" }) {
  const sizeClasses = {
    small: "h-8 w-8",
    default: "h-12 w-12",
    large: "h-24 w-24",
  };

  return (
    <Avatar
      imgUrl={user?.avatar?.url || "/userLogo1.jpg"}
      className={sizeClasses[size]}
    />
  );
}

export default UserAvatar;
