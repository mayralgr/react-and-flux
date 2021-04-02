import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionsTypes";
export function saveCourse(course) {
  courseApi.saveCourse(course).then((savedCourse) => {
    dispatcher.dispatch({
      // action, hey dispatcher, go teel all the store that the course was just created
      actionType: actionTypes.CREATE_COURSE,
      couse: savedCourse,
    });
  });
}
