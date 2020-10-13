import { List } from "../interfaces/list";
import { Colors } from "../tagColors";

export interface GenreHash {
  [genre: string]: number;
}

export interface DataObject {
  datasets: { data: number[]; backgroundColor: string[] }[];
  labels: string[];
}

export const getGenresHash = (list: List): GenreHash => {
  const genreHash: GenreHash = {};
  list.items.map((item) => {
    item.tags.map((tag) => {
      genreHash[tag] = genreHash[tag] + 1 || 1;
    });
  });
  return genreHash;
};

export const constructData = (list: List) => {
  const genreHash = getGenresHash(list);
  const data: DataObject = { datasets: [], labels: [] };
  data.labels = Object.keys(genreHash);
  const bgColors = data.labels.map((genre) => {
    if (Colors[genre]) {
      return Colors[genre];
    } else {
      return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.75)`;
    }
  });
  data.datasets = [
    { data: Object.values(genreHash), backgroundColor: bgColors },
  ];
  return data;
};
