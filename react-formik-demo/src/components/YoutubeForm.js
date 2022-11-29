import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
};

const onSubmit = (values) => console.log("Form data", values);

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
  channel: yup.string().required("Required"),
});

const YoutubeForm = () => {
  // console.log("Form values", formik.values);
  // console.log("Form errors", formik.errors);
  // console.log("Visited fields", formik.touched);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email">
            {(error) => <div className="error">{error}</div>}
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage name="channel" />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          {/* as="textarea" */}
          <Field as="textarea" id="comments" name="comments" />
        </div>

        {/* render props pattern */}
        {/* We use it when we use custom components in a form and we want to hook them into the formik component */}
        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {({ field, form, meta }) => {
              return (
                <div>
                  <input type="text" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
