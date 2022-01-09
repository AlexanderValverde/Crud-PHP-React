import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "./styles/App.module.css";

import React from "react";
import { PageUsuarios } from "./pages/PageUsuarios";

export default function App() {
  return (
    <Router>
      <header className={styles.header}>
          <h1 className={styles.peliTitle}>Crud PHP - React</h1>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <PageUsuarios></PageUsuarios>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
