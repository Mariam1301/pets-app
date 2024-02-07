import React, { useContext, useRef } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { classNames } from "primereact/utils";
import { Tooltip } from "primereact/tooltip";
import FeatherIcon from "feather-icons-react";

export const AddPetForm = () => {
  //   const { addPet } = useContext(PetContext);

  function handleAddPet({ name, breed, birth_year, image }) {
    // addPet({
    //   method: "POST",
    //   url: "addpet",
    //   requestConfig: { data: { name, breed, birth_year, image } }
    // });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      breed: "",
      birth_year: "",
      image: null
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.breed) {
        errors.breed = "Breed is required.";
      }

      if (!data.birth_year) {
        errors.birth_year = "Birth year is required.";
      } else if (!/^\d{4}$/.test(data.birth_year)) {
        errors.birth_year = "Invalid birth year format. Must be 4 digits.";
      }

      if (!data.image) {
        errors.image = "Image is required.";
      }

      return errors;
    },

    onSubmit: (data) => {
      console.log(data);
      handleAddPet(data);
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
    <form onSubmit={formik.handleSubmit} className="p-fluid w-full py-10 ">
      <div className="mb-8">
        <span className="p-float-label">
          <InputText
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={
              "h-10 " +
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
            Name*
          </label>
        </span>
        {getFormErrorMessage("name")}
      </div>
      <div className="mb-8">
        <span className="p-float-label">
          <InputText
            id="breed"
            name="breed"
            value={formik.values.breed}
            onChange={formik.handleChange}
            className={
              "h-10 " +
              classNames({
                "p-invalid": isFormFieldValid("breed")
              })
            }
          />
          <label
            htmlFor="breed"
            className={classNames({
              "p-error": isFormFieldValid("breed")
            })}
          >
            Breed*
          </label>
        </span>
        {getFormErrorMessage("breed")}
      </div>
      <div className="mb-8">
        <span className="p-float-label">
          <InputText
            id="birth_year"
            name="birth_year"
            value={formik.values.birth_year}
            onChange={formik.handleChange}
            className={
              "h-10 " +
              classNames({
                "p-invalid": isFormFieldValid("birth_year")
              })
            }
          />
          <label
            htmlFor="birth_year"
            className={classNames({
              "p-error": isFormFieldValid("birth_year")
            })}
          >
            Birth Year*
          </label>
        </span>
        {getFormErrorMessage("birth_year")}
      </div>
      <div className="mb-8">
        <Tooltip
          target=".custom-cancel-btn"
          content="Clear"
          position="bottom"
        />

        <div className="flex items-center gap-2 pointer-events-none">
          <FileUpload
            name="image"
            accept="image/*"
            mode="advanced"
            chooseLabel="Choose"
            uploadOptions={{ className: "hidden" }}
            cancelOptions={{ className: "hidden" }}
            className={
              "h-10 " +
              classNames({
                "p-invalid": isFormFieldValid("image")
              })
            }
            customUpload
            uploadHandler={(event) => {
              formik.setFieldValue("image", event.files[0]);
            }}
          />
        </div>
        {getFormErrorMessage("image")}
      </div>

      <Button
        type="submit"
        label="Add Pet"
        className="primary-color py-3 text-blue-950"
      />
    </form>
  );
};

export default AddPetForm;
