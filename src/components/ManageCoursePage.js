import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
// import { Prompt } from "react-router-dom";
import { toast } from "react-toastify";
import { func } from "prop-types";
const ManageCoursePage = (props) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseApi.saveCourse(course).then(() => {
      toast.success("Course saved.");
      props.history.push("/courses");
    });
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author Id is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    // Form is not valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      courseApi.getCourseBySlug(slug).then((_course) => setCourse(_course));
    }
  }, [props.match.params.slug]);

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
      {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
    </>
  );
};

export default ManageCoursePage;
