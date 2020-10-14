import { List } from "../interfaces/list";
import { Colors } from "../tagColors";

export interface GenreHash {
  [genre: string]: number;
}

interface MediaHash {
  [medium: string]: number;
}

export interface DataObject {
  datasets: { data: number[]; backgroundColor: string[]; label?: string }[];
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

const getMediaHash = (list: List) => {
  const mediaHash: MediaHash = {};
  list.items.map((item) => {
    mediaHash[item.medium] = mediaHash[item.medium] + 1 || 1;
  });
  return mediaHash;
};

export const constructGenreData = (list: List) => {
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

export const constructMediaData = (list: List) => {
  const mediaHash = getMediaHash(list);
  const data: DataObject = {
    datasets: [
      {
        label: "Favorite Media",
        data: Object.values(mediaHash),
        backgroundColor: [],
      },
    ],
    labels: Object.keys(mediaHash),
  };
  const bgColors = data.labels.map((label) => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.75)`;
  });
  data.datasets[0].backgroundColor = bgColors;

  return data;
};
