"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";

function EmployeeForm({ setIsOpen }: any) {
  const initialValues = {
    firstname: "",
    lastname: "",

    birth_day: "",
    mobile_number: "",
    address: {
      line1: "",
      line2: "",
      country: "",
      state: "",
      city: "",
      zip: "",
    },
    father_name: "",
    mother_name: "",
    alternate_number: "",
    employee_id: "",
    joining_date: "",
    official_email: "",
    personal_email: "",
  };

  const newDate = new Date();
  const validationSchema = Yup.object({
    official_email: Yup.string()
      .email("Invalid email format")
      .required("Required"),

    firstname: Yup.string().min(1).max(50).required("Required"),
    lastname: Yup.string().min(1).max(50),

    mobile_number: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10, "Phone must be at 10 characters long")
      .required("A phone number is required"),
    employee_id: Yup.string().min(2).max(50).required("Required"),
    address: Yup.object({
      line1: Yup.string().min(2).max(50).required("Required"),
      line2: Yup.string().max(50),
      country: Yup.string().min(2).max(50).required("Required"),
      state: Yup.string().min(2).max(50).required("Required"),
      city: Yup.string().min(2).max(50).required("Required"),
      zip: Yup.number()
        .typeError("That doesn't look like a zip code")
        .positive("A zip code can't start with a minus")
        .integer("A zip code can't include a decimal point"),
    }),
    father_name: Yup.string().min(1).max(50),
    mother_name: Yup.string().min(1).max(50),
    alternate_number: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10, "Phone must be at 10 characters long"),
    personal_email: Yup.string().email("Invalid email format"),
    joining_date: Yup.date()
      .max(new Date(newDate.getTime() - 1 * 24 * 3600000))
      .required("Required"),
    birth_day: Yup.date().max(
      new Date(Date.now() - 567648000000),
      "You must be at least 18 years"
    ),
  });

  const onSubmit = async (values: any, onSubmitProps: any) => {
    const sampleData = {
      firstname: values.firstname,
      lastname: values.lastname,
      birth_day: values.birth_day,
      mobile_number: values.mobile_number,
      address: values.address,
      father_name: values.father_name,
      mother_name: values.mother_name,
      alternate_number: values.alternate_number,
      employee_id: values.employee_id,
      joining_date: values.joining_date,
      personal_email: values.personal_email,
      official_email: values.official_email,
    };
    console.log("sampleData >", values);

    const axiosConfig: any = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const data = await Axios.post(
        "http://192.198.1.63:3333/employee/new",
        sampleData,
        axiosConfig
      );
      console.log("resp >", data);
      return data;
    } catch (e: any) {
      console.log("e >", e?.message);
      throw new Error(e?.message);
    } finally {
      onSubmitProps.resetForm();
    }
  };

  const arr = [
    {
      key: "firstname",
      label: "First Name",
      type: "text",
      placeholder: "First Name",
    },
    {
      key: "lastname",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
    },
    {
      key: "birth_day",
      label: "Date Of Birth",
      type: "date",
      placeholder: "Date of birth",
    },
    {
      key: "mobile_number",
      label: "Mobile Number",
      type: "text",
      placeholder: "Mobile Number",
    },
    {
      key: "address.line1",
      label: "Address",
      type: "text",
      placeholder: "line1",
    },
    { key: "address.line2", label: "", type: "text", placeholder: "line2" },
    { key: "address.city", label: "", type: "text", placeholder: "city" },
    { key: "address.state", label: "", type: "text", placeholder: "state" },
    { key: "address.zip", label: "", type: "text", placeholder: "zip" },
    { key: "address.country", label: "", type: "text", placeholder: "country" },

    {
      key: "father_name",
      label: "Father Name",
      type: "text",
      placeholder: "Father Name",
    },
    {
      key: "mother_name",
      label: "Mother Name",
      type: "text",
      placeholder: "Mother Name",
    },
    {
      key: "alternate_number",
      label: "Alternate Number",
      type: "text",
      placeholder: "Alternate Number",
    },
    {
      key: "employee_id",
      label: "Employee id",
      type: "text",
      placeholder: "employee id",
    },
    {
      key: "joining_date",
      label: "Date of Joining",
      type: "date",
      placeholder: "Date of Joining",
    },
    {
      key: "official_email",
      label: "Official Email",
      type: "email",
      placeholder: "official email",
    },

    {
      key: "personal_email",
      label: "Personal Email",
      type: "email",
      placeholder: "personal email",
    },
  ];

  return (
    <div className="p-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <h1 className="font-bold text-center text-2xl py-1">
                EMPLOYEE FORM
              </h1>

              {arr.map((value: any, index) => (
                <div key={index}>
                  <h3>{value.label}</h3>
                  <Field
                    name={value.key}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type={value.type}
                    placeholder={value.placeholder}
                  />
                  <ErrorMessage
                    name={value.key}
                    component="div"
                    className="text-red-900"
                  />
                </div>
              ))}
              <div className="py-5">
                <button
                  type="submit"
                  className=" text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className=" text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default EmployeeForm;
