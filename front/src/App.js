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
import {Navbar} from "react-bootstrap";

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
                <div className="topnav">
                  <a className="active" href="/">Выход</a>
                  <a href="/priziv">Призывники</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                </div>
                  <Priziv/>
                <Back/>
              </Route>
              <Route exact path="/priziv1">
                <div className="topnav">
                  <a className="active" href="/">Выход</a>
                  <a href="/priziv">Призывники</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                </div>
                  <Priziv/>
                <Back/>
              </Route>
              <Route exact path="/komissar">
                <div className="topnav">
                  <a className="active" href="/">Выход</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                </div>
                <Komissar/>
                <Back/>
              </Route>
              <Route exact path="/voencomati">
                <div className="topnav">
                  <a className="active" href="/">Выход</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                </div>
                <Voencomati/>
                <Back/>
              </Route>
              <Route exact path={`/prizivniki/:rangeId`}>
                <div className="topnav">
                  <a className="active" href="/">Выход</a>
                  <a href="/priziv">Призывники</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                </div>
                <FullPriziv/>
                <Back/>
              </Route>
              <Route exact path="/priziv/cart">
                <div className="topnav">
                  <a className="active" href="/">Выход</a>
                  <a href="/priziv">Призывники</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                </div>
                <Cart/>
                <Back/>
              </Route>
              <Route exact path="/mega">
                <div className="topnav">
                  <a className="active" href="/">Выход</a>
                  <a href="/priziv">Призывники</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                </div>
                <Mega/>
                <Back/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </DocumentTitle>
  );
}

export default App;
