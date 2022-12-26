import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import React, {Component} from "react";
import './App.css';
import DocumentTitle from 'react-document-title'
import FullPriziv from "./pages/fullpriziv";
import Priziv from "./pages/priziv";
import Back from "./components/back";
import Komissar from "./pages/komis";
import Voencomati from "./pages/voencomati";
import {Auth} from "./pages/login";
import Cart from "./pages/armiya";
import Reg from "./pages/reg";
import Mega from "./pages/mega"
import {Button, Navbar} from "react-bootstrap";
import Nav from "./components/nav";
import Archiv from "./pages/archiv";

function App() {
  return (
      <DocumentTitle title = 'Voencomat'>
        <div className="App">
          <BrowserRouter basename="/">
            <Switch>
              <Route exact path="/">
                <Auth/>
              </Route>
              <Route exact path="/reg">
                <Reg/>
              </Route>
              <Route exact path="/priziv">
                <Nav/>
                <Priziv/>
                <Back/>
              </Route>
              <Route exact path="/komissar">
                <Nav/>
                <Komissar/>
                <Back/>
              </Route>
              <Route exact path="/voencomati">
                <Nav/>
                <Voencomati/>
                <Back/>
              </Route>
              <Route exact path={`/prizivniki/:rangeId`}>
                <Nav/>
                <FullPriziv/>
                <Back/>
              </Route>
              <Route exact path="/priziv/cart">
                <Nav/>
                <Cart/>
                <Back/>
              </Route>
              <Route exact path="/mega">
                <Nav/>
                <Mega/>
                <Back/>
              </Route>
              <Route exact path="/archive">
                <Nav/>
                <Archiv/>
                <Back/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </DocumentTitle>
  );
}

export default App;
