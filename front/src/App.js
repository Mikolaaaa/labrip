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
import Cart from "./pages/cart";
import Reg from "./pages/reg";
import {PrizivProvider} from "./context/provider";

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
                  <a href="/priziv">Призывники</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                  <a className="active" href="/">Выход</a>
                </div>
                <PrizivProvider>
                  <Priziv/>
                </PrizivProvider>
                <Back/>
              </Route>
              <Route exact path="/komissar">
                <div className="topnav">
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                  <a className="active" href="/">Выход</a>
                </div>
                <Komissar/>
                <Back/>
              </Route>
              <Route exact path="/voencomati">
                <div className="topnav">
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                  <a className="active" href="/">Выход</a>
                </div>
                <Voencomati/>
                <Back/>
              </Route>
              <Route exact path={`/prizivniki/:rangeId`}>
                <div className="topnav">
                  <a href="/priziv">Призывники</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                  <a className="active" href="/">Выход</a>
                </div>
                <FullPriziv/>
                <Back/>
              </Route>
              <Route exact path="/priziv/cart">
                <div className="topnav">
                  <a href="/priziv">Призывники</a>
                  <a href="/komissar">Военкомы</a>
                  <a href="/voencomati">Военкоматы</a>
                  <a className="active" href="/">Выход</a>
                </div>
                <Cart/>
                <Back/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </DocumentTitle>
  );
}

export default App;
