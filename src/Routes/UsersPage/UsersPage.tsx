import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Spinner, Stack, StackItem } from "@patternfly/react-core";
import { Main } from "@redhat-cloud-services/frontend-components/Main";
import {
  PageHeader,
  PageHeaderTitle,
} from "@redhat-cloud-services/frontend-components";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications/redux";

const UserTable = lazy(() => import("../../Components/UserTable/userTable"));
const UserTableFilter = lazy(
  () => import("../../Components/UserTable/userTableFilter")
);

import "./users-page.scss";

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const UsersPage = () => {
  const dispatch = useDispatch();
  const [textInputNameValue, setTextInputNameValue] = useState("");
  const users = [
    {
      username: "yzhao",
      first_name: "yu",
      last_name: "zhao",
      email: "yzha@redhat.com",
      id: "0",
      org_admin: true,
      is_internal: true,
      org_id: "1",
      type: "admin",
    },
  ];

  useEffect(() => {
    insights?.chrome?.appAction?.("user-management-users-page");
  }, []);

  //TODO: remove this
  const handleAlert = () => {
    dispatch(
      addNotification({
        variant: "success",
        title: "Notification title",
        description: "notification description",
      })
    );
  };

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Users" />
        <p>
          {" "}
          You can invite users, activate user accounts and deactive user
          accounts in this page.{" "}
        </p>
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>
            <Suspense fallback={<Spinner />}>
              <UserTableFilter
                textInputNameValue={textInputNameValue}
                setTextInputNameValue={setTextInputNameValue}
              />
              <UserTable data={users} />
            </Suspense>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default UsersPage;
