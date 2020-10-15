import React from "react";
import StatsPage from "../components/statsPage";
import { User } from "../interfaces/user";
import {
  getGenresHash,
  GenreHash,
  constructGenreData,
  constructMediaData,
} from "../utilities/statsPageHelpers";
import { Colors } from "../tagColors";

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
        {
          id: 1,
          title: "My Item Title",
          creator: "me",
          medium: "Book",
          image_url: "",
          lists: [],
          tags: ["Drama", "Mystery"],
        },
        {
          id: 3,
          title: "My Item Title",
          creator: "me",
          medium: "Book",
          image_url: "",
          lists: [],
          tags: ["Comedy", "Mystery"],
        },
      ],
    },
  ],
};

test("generates genre : amount hashmap", () => {
  const completed = testUser.lists.find((list) => list.title === "Completed");
  if (completed) {
    const genresMap: GenreHash = getGenresHash(completed);
    expect(genresMap["Mystery"]).toBe(3);
    expect(genresMap["Comedy"]).toBe(1);
  }
});

test("constructs genre data object with data and labels in correct order", () => {
  const completed = testUser.lists[1];
  const data = constructGenreData(completed);

  expect(data.datasets[0].data.indexOf(3)).toBe(data.labels.indexOf("Mystery"));
});

test("constructs genre data object with colors", () => {
  const completed = testUser.lists[1];
  const data = constructGenreData(completed);
  const mysteryIdx = data.labels.indexOf("Mystery");

  expect(data.datasets[0].backgroundColor[mysteryIdx]).toBe(Colors["Mystery"]);
});

test("constructs media data object with label", () => {
  const completed = testUser.lists[1];
  const data = constructMediaData(completed);
  expect(data.datasets[0].label).toBe("Favorite Media");
});

test("constructs type data object with data and labels in correct order", () => {
  const completed = testUser.lists[1];
  const data = constructMediaData(completed);
  expect(data.datasets[0].data.indexOf(2)).toBe(data.labels.indexOf("Book"));
});
