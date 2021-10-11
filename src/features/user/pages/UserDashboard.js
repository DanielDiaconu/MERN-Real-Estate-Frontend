import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import UserDashboardHeader from "../components/UserDashboardHeader";
import UserDashboardNav from "../components/UserDashboardNav";
import UserPersonalInfo from "../components/UserPersonalInfo";
import UserProperties from "../components/UserProperties";
import UserPropertyPromote from "../components/UserPropertyPromote";
import UserSecurityDetails from "../components/UserSecurityDetails";
import UserWallet from "../components/UserWallet";
import UserWishlist from "../components/UserWishlist";

function UserDashboard() {
  let { path } = useRouteMatch();

  return (
    <>
      <div className="container pt-5 pb-lg-4 mt-5 mb-sm-2">
        <div className="row">
          <aside className="col-lg-4 col-md-5 pe-xl-4 mb-5">
            <div className="card card-body border-0 shadow-sm pb-1 me-lg-1">
              <UserDashboardHeader />
              <UserDashboardNav />
            </div>
          </aside>
          <div className="col-lg-8 col-md-7 mb-5">
            <Switch>
              <Route exact path={path}>
                <Redirect to={`${path}/personal-info`} />
              </Route>
              <Route path={`${path}/personal-info`}>
                <UserPersonalInfo />
              </Route>
              <Route path={`${path}/password-security`}>
                <UserSecurityDetails />
              </Route>
              <Route path={`${path}/my-properties`}>
                <UserProperties />
              </Route>
              <Route path={`${path}/wishlist`}>
                <UserWishlist />
              </Route>
              <Route path={`${path}/promote/:id`}>
                <UserPropertyPromote />
              </Route>
              <Route path={`${path}/wallet`} exact>
                <UserWallet />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
