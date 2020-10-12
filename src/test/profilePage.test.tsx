import React from "react";
import { render, getByText, fireEvent } from "@testing-library/react";
import ProfilePage from "../components/profilePage";
import { User } from "../interfaces/user";

const testUser: User = {
  id: 1,
  email: "test@test.com",
  lists: [
    {
      id: 1,
      title: "In Progress",
      description: "In progress list for testing",
      items: [
        {
          id: 1,
          title: "My Item Title",
          creator: "me",
          medium: "Book",
          image_url: "",
          lists: [],
          tags: ["Non-Fiction", "Mystery"],
        },
      ],
    },
    {
      id: 2,
      title: "Completed",
      description: "Things I've finished",
      items: [
        {
          id: 2,
          title: "Something else",
          creator: "me",
          medium: "TV Show",
          image_url: "",
          lists: [],
          tags: ["Non-Fiction", "Mystery"],
        },
      ],
    },
  ],
};

test("renders in progress list", () => {
  const { getByText } = render(
    <ProfilePage user={testUser} selectItem={() => "item"} />
  );
  const listTitle = getByText(/In Progress/);
  expect(listTitle).toBeInTheDocument();
});

test("renders completed list", () => {
  const { getByText } = render(
    <ProfilePage user={testUser} selectItem={() => "item"} />
  );
  const listTitle = getByText(/Completed/);
  expect(listTitle).toBeInTheDocument();
});

test("renders items in list", () => {
  const { getByText } = render(
    <ProfilePage user={testUser} selectItem={() => "item"} />
  );
  const itemTitle = getByText(/My Item Title/);
  expect(itemTitle).toBeInTheDocument();
});

// test("show new item form", () => {
//   const { getByText } = render(
//     <ProfilePage user={testUser} selectItem={() => "item"} />
//   );
//   fireEvent(
//     getByText(/Add Item/),
//     new MouseEvent("click", { bubbles: true, cancelable: true })
//   );
//   const imageLabel = getByText(/Cover image/);
//   expect(imageLabel).toBeInTheDocument();
// });

// test("show new item form", () => {
//   const { getByText } = render(
//     <ProfilePage user={testUser} selectItem={() => "item"} />
//   );
//   fireEvent(
//     getByText(/Create List/),
//     new MouseEvent("click", { bubbles: true, cancelable: true })
//   );
//   const descriptionLabel = getByText(/Description/);
//   expect(descriptionLabel).toBeInTheDocument();
// });
