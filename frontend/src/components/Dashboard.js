import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/Dashboard.css";

const validationSchema = Yup.object({
  bannerOn: Yup.boolean(),
  bannerHeading: Yup.string().required("Heading is required"),
  bannerEndTime: Yup.date()
    .min(new Date(), "End time must be in the future")
    .required("End time is required"),
  bannerLink: Yup.string().url("Invalid URL").required("Link is required"),
});

const Dashboard = (props) => {
  const handleSubmit = async (values) => {
    props.setShowLoader(true);
    try {
      await axios.put("/api/v1/banner", {
        bannerOn: values.bannerOn,
        bannerHeading: values.bannerHeading,
        bannerSubHeading: values.bannerSubHeading,
        bannerEndTime: values.bannerEndTime,
        bannerLink: values.bannerLink,
      });

      props.fetchBannerSettings();
    } catch (error) {
      console.error(
        "Error updating banner:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          bannerOn: props.bannerSettings.bannerOn || false,
          bannerHeading: props.bannerSettings.bannerHeading || "",
          bannerSubHeading: props.bannerSettings.bannerSubHeading || "",
          bannerEndTime: props.bannerSettings.bannerEndTime || "",
          bannerLink: props.bannerSettings.bannerLink || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        {({ values, setFieldValue, dirty, isValid, errors }) => (
          <Form>
            <div className="form-group">
              <div className="cursor-pointer">
                <label className="switch">
                  <Field
                    type="checkbox"
                    name="bannerOn"
                    checked={values.bannerOn}
                    onChange={() => {
                      setFieldValue("bannerOn", !values.bannerOn);
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bannerHeading">Banner Heading</label>
              <Field
                type="text"
                id="bannerHeading"
                name="bannerHeading"
                value={values.bannerHeading}
              />
              <ErrorMessage
                name="bannerHeading"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bannerSubHeading">Banner SubHeading</label>
              <Field
                type="text"
                id="bannerSubHeading"
                name="bannerSubHeading"
                value={values.bannerSubHeading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bannerEndTime">Banner End Time</label>
              <Field
                type="datetime-local"
                id="bannerEndTime"
                name="bannerEndTime"
                value={
                  values.bannerEndTime ? values.bannerEndTime.slice(0, 16) : ""
                }
              />
              <ErrorMessage
                name="bannerEndTime"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bannerLink">Banner Link</label>
              <Field
                type="url"
                id="bannerLink"
                name="bannerLink"
                value={values.bannerLink}
              />
              <ErrorMessage
                name="bannerLink"
                component="div"
                className="error"
              />
            </div>

            {dirty && isValid && <button type="submit">Submit</button>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Dashboard;
