import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
// import { Prompt } from "react-router-dom";
import { toast } from "react-toastify";
import { func } from "prop-types";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
const ManageCoursePage = (props) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
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

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;

    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [props.match.params.slug, courses.length]);

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
