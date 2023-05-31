//@ts-nocheck
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Toolbar, ToolbarContent, Split, SplitItem, Button, Spinner, Stack, StackItem } from "@patternfly/react-core";
import { Main } from "@redhat-cloud-services/frontend-components/Main";
import {
  PageHeader,
  PageHeaderTitle,
} from "@redhat-cloud-services/frontend-components";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { parseStatus, parseJson } from "../../utils/utils";
import { baseUrl } from "../../const";

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
  const [users, setUsers] = useState([]);

  const fetchUsers = async (groupID = '', offset = 0, limit = 100) => {
    let requestOpts = {
      method: 'GET',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
    await fetch(`${baseUrl}/users?offset=${offset}&limit=${limit}`, requestOpts)
      .then(res => parseStatus(res))
      .then(res => parseJson(res))
      .then((list) => {
        setUsers(list.users)
      })
      .catch(error => {
        dispatch(
          addNotification({
            variant: "danger",
            title: "Error",
            description: error.message,
          })
        );
      })

  }

  useEffect(() => {
    insights?.chrome?.appAction?.("user-management-users-page");
    fetchUsers();
  }, []);

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
              <Split>
                <SplitItem isFilled>
                  <UserTableFilter
                    textInputNameValue={textInputNameValue}
                    setTextInputNameValue={setTextInputNameValue}
                  />
                </SplitItem>
                <SplitItem>
                  <Toolbar data-test-id="toolbar-invite-user-button">
                    <ToolbarContent className="no-left-and-right-padding">
                      <Button variant="primary">Invite user</Button>
                    </ToolbarContent>

                  </Toolbar>

                </SplitItem>
              </Split>
              <UserTable data={users} />
            </Suspense>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default UsersPage;