import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AllBusinessPage from "./components/AllBusinessPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FilterSearch from "./components/FilterSearch";
import HomePage from "./components/HomePage";
import CreateBusinessForm from "./components/CreateBusiness";
import WriteReviewForm from "./components/WriteReview";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
const categories=['Chiness','THai', 'salam', 'mellim']
  return (
    <>
      <Navigation isLoaded={isLoaded} categories={categories} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/businesses">
            <AllBusinessPage />
          </Route>
          <Route path="/testing">
            <FilterSearch/>
          </Route>
          <Route path="/businesses/new">
            <CreateBusinessForm />
          </Route>
          <Route path="/businesses/:id/reviews/new">
            <WriteReviewForm />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
