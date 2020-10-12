interface IDictionary<TValue> {
  [id: string]: TValue;
}

export const colors: IDictionary<string> = {
  Comedy: "blue",
  Drama: "orange",
  Action: "magenta",
  Horror: "red",
  Mystery: "lime",
  "Non-Fiction": "cyan",
  Custom: "purple",
};
