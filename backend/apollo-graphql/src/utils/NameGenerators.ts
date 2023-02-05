import {
  adjectives,
  animals,
  colors,
  Config,
  countries,
  NumberDictionary,
  uniqueNamesGenerator,
} from "unique-names-generator";

export const generateNewUser = (seed: string | number): string => {
  const generatorConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    length: 3,
    style: "capital",
    separator: " ",
    seed,
  };

  return uniqueNamesGenerator(generatorConfig);
};

export const generateNewLobby = (seed: string | number): string => {
  const generatorConfig: Config = {
    dictionaries: [
      adjectives,
      colors,
      countries,
      NumberDictionary.generate({ min: 1, max: 9999 }),
    ],
    style: "capital",
    separator: "",
    seed,
  };

  return uniqueNamesGenerator(generatorConfig);
};
