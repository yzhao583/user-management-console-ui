import * as React from "react";
import {
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarGroup,
  Button,
} from "@patternfly/react-core";
import { KEYBOARD_SHORTCUTS } from "../../const";
import "./user-table-filter.scss";

type UserTableFilterProps = {
  textInputNameValue: string;
  setTextInputNameValue: (textInputNameValue: string) => void;
};

const UserTableFilter: React.FC<UserTableFilterProps> = ({
  textInputNameValue,
  setTextInputNameValue,
}: UserTableFilterProps) => {
  return (
    <Toolbar data-test-id="toolbar-filter-instances">
      <ToolbarContent className="no-left-and-right-padding">
        <ToolbarGroup variant="filter-group">
          <ToolbarItem>
            <div className="has-feedback">
              <TextInput
                value={textInputNameValue}
                type="text"
                onChange={(value) => setTextInputNameValue(value)}
                aria-label="Search by email"
                placeholder="Search by email..."
                className="co-text-filter"
              />
            </div>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};

export default UserTableFilter;
