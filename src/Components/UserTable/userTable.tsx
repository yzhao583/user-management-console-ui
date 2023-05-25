import React, { useEffect, useState } from "react";
import {
  cellWidth,
  Table,
  TableBody,
  TableHeader,
  wrappable,
  OuterScrollContainer,
  InnerScrollContainer,
  sortable,
  SortByDirection,
} from "@patternfly/react-table";

import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { User } from "../../types";

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */
export interface UserTableProps {
  data: User[];
}

const UserTable: React.FC<UserTableProps> = (props: UserTableProps) => {
  const columns = [
    {
      title: "Username",
    },
    {
      title: "First Name",
    },
    {
      title: "Last Name",
    },
    {
      title: "Email",
    },
  ];
  const [rows, setRows] = useState([]);

  const getRows = (data: any) => {
    let rowList = [];
    const genericAlert =
      "Click on the link below for more information about this issue.";
    if (data && data.length > 0) {
      data.forEach((user: any) => {
        rowList.push({
          cells: [user.username, user.first_name, user.last_name, user.email],
        });
      });
    } else {
      // Empty State for the table
      rowList.push({
        heightAuto: true,
        cells: [
          {
            props: { colSpan: 8 },
            title: (
              <EmptyState variant={EmptyStateVariant.small}>
                <Title headingLevel="h2" size="lg">
                  No user found
                </Title>
                <EmptyStateBody>
                  No user found in your organization
                </EmptyStateBody>
              </EmptyState>
            ),
          },
        ],
      });
    }
    setRows(rowList as any);
  };

  useEffect(() => {
    getRows(props.data);
  }, [props.data]);

  return (
    <Table aria-label="User Table" cells={columns} rows={rows}>
      <TableHeader />
      <TableBody />
    </Table>
  );
};

UserTable.displayName = "UserTable";

export default UserTable;
