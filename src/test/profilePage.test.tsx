import React from "react";
import { render } from "@testing-library/react";
import ProfilePage from "../components/profilePage";
import { User } from "../interfaces/user";

const testUser: User = {
  email: "test@test.com",
  lists: [
    { title: "In Progress", description: "In progress list for testing" },
  ],
};

test("renders in progress list", () => {
  const { getByText } = render(<ProfilePage user={testUser} />);
  const listTitle = getByText(/In Progress/);
  expect(listTitle).toBeInTheDocument();
});

test("renders completed list", () => {
  const { getByText } = render(<ProfilePage user={testUser} />);
  const listTitle = getByText(/Completed/);
  expect(listTitle).toBeInTheDocument();
});
