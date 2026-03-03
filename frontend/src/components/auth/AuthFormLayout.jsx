import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./AuthForm.css";

function AuthFormLayout({
  title,
  onSubmit,
  fields,
  buttonText = "Submit",
  bottomLinkUrl,
  bottomLinkText,
  bottomDescription,
  containerClass = "auth-container",
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={`auth-container ${containerClass || ""}`}>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{title}</h2>

          {fields.map((field) => (
            <div key={field.name}>
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                {...register(field.name, field.validation)}
              />
              {errors[field.name] && (
                <p className="error-text">{errors[field.name].message}</p>
              )}
            </div>
          ))}

          <button type="submit">{buttonText}</button>
        </form>

        {bottomLinkUrl && bottomLinkText && (
          <p className="text-white">
            {bottomDescription}&nbsp;
            <Link
              to={bottomLinkUrl}
              className="underline underline-offset-3 hover:text-[#1d4ed8]"
            >
              {bottomLinkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthFormLayout;
