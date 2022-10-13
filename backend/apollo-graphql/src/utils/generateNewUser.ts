import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const generateNewUser = (seed: string | number): string => {
  console.log(seed);
  const generatorConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    length: 3,
    style: "capital",
    separator: " ",
    seed,
  };

  return uniqueNamesGenerator(generatorConfig);
};
