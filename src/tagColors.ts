interface IDictionary<TValue> {
  [id: string]: TValue;
}

export const Colors: IDictionary<string> = {
  Comedy: "rgba(10, 104, 255, 0.75)",
  Drama: "rgba(255, 137, 10, 0.75)",
  Action: "rgba(255, 10, 222, 0.75)",
  Horror: "rgba(255, 0, 0, 0.75)",
  Mystery: "rgba(166, 255, 0, 0.75)",
  "Non-Fiction": "rgba(0, 255, 255, 0.75)",
  Custom: "rgba(144, 0, 255, 0.75)",
};
