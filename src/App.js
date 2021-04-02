import React from "react";
import AboutPage from "./components/AboutPage";
import Header from "./components/common/Header";
import CoursesPage from "./components/CoursesPage";
import HomePage from "./components/HomePage";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import ManageCoursePage from "./components/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Redirect from="/about-page" to="/about" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
