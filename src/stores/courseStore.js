import { EventEmitter } from "events";
import actionsTypes from "../actions/actionsTypes";
import dispatcher from "../appDispatcher";
const CHANGE_EVENT = "change";
let _courses = [];
class CourseStore extends EventEmitter {
  /*
    All stores must have
    1. addChangeListener(wraps on)
    2. removeChangeListener(wraps removeListener)
    3. emitChange(wraps emit)
    */

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback); // subscribe
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback); // unsubscribe
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

const store = new CourseStore();
// anytime an action is dispatch
dispatcher.register((action) => {
  // switch on the action type
  switch (action.actionType) {
    // one case for every action that this store handles
    case actionsTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange(); // anytime the store changes
      break;
    case actionsTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionsTypes.UPDATE_COURSE:
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionsTypes.DELETE_COURSE:
      // debugger;
      _courses = _courses.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    default: // nothing to do here
  }
});
export default store;
