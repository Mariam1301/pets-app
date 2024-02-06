import React, { useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "სახელი აუცილებელი ველია.";
      }

      if (!data.email) {
        errors.email = "ელ-ფოსტა აუცილებელი ველია.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "არასწორი ელ-ფოსტა. მაგ. example@email.com";
      }

      if (!data.password) {
        errors.password = "პაროლი აუცილებელი ველია.";
      }

      return errors;
    },

    onSubmit: (data) => {
      setFormData(data);

      formik.resetForm();
    }
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-fluid">
      <div className="mb-8">
        <span className="p-float-label">
          <InputText
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            autoFocus
            className={
              " h-10 " +
              classNames({
                "p-invalid": isFormFieldValid("name")
              })
            }
          />
          <label
            htmlFor="name"
            className={classNames({
              "p-error": isFormFieldValid("name")
            })}
          >
            სახელი*
          </label>
        </span>
        {getFormErrorMessage("name")}
      </div>
      <div className="mb-8">
        <span className="p-float-label p-input-icon-right">
          <i className="pi pi-envelope" />
          <InputText
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={
              " h-10 " +
              classNames({
                "p-invalid": isFormFieldValid("email")
              })
            }
          />
          <label
            htmlFor="email"
            className={classNames({
              "p-error": isFormFieldValid("email")
            })}
          >
            ელ-ფოსტა*
          </label>
        </span>
        {getFormErrorMessage("email")}
      </div>
      <div className="mb-8">
        <span className="p-float-label">
          <Password
            id="password"
            name="password"
            feedback={false}
            value={formik.values.password}
            onChange={formik.handleChange}
            toggleMask
            className={
              " h-10 " +
              classNames({
                "p-invalid": isFormFieldValid("password")
              })
            }
          />
          <label
            htmlFor="password"
            className={classNames({
              "p-error": isFormFieldValid("password")
            })}
          >
            პაროლი*
          </label>
        </span>
        {getFormErrorMessage("password")}
      </div>

      <Button
        type="submit"
        label="რეგისტრაცია"
        className="mt-2  primary-color py-3 text-blue-950"
      />
    </form>
  );
};

export default RegistrationForm;
