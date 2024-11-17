import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import UserLayout from "layouts/User.js";
import RTLLayout from "layouts/RTL.js";
import SignUp from "views/Auth/SignUp";
import SignIn from "views/Auth/SignIn";
import Contacto from "views/Contacto/Contacto"
import Nosotros from "views/Nosotros/Nosotros"

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <Route path={`/admin`} component={AdminLayout} />
      <Route path={`/user`} component={UserLayout} />
      <Route path={`/signup`} component={SignUp} />
      <Route path={`/signin`} component={SignIn} />
      <Route path={`/contacto`} component={Contacto} />
      <Route path={`/nosotros`} component={Nosotros} />

      <Route path={`/rtl`} component={RTLLayout} />
      <Redirect from={`/`} to="/auth/signin" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
