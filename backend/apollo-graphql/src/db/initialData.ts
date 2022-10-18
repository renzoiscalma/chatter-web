import { Types } from "mongoose";
import { Message } from "../models/Message";
import { User } from "../models/User";

export const initialUsers: (User & { _id: string })[] = [
  {
    _id: "633c71d566f605851babba39",
    username: "Foo Bar",
    type: 1,
  },
  {
    _id: "633c71d566f605851babba3a",
    username: "Bar 2k",
    type: 1,
  },
];

export function generateInitialMessage(
  lobby: Types.ObjectId,
  user1: Types.ObjectId,
  user2: Types.ObjectId
): Message[] {
  return [
    {
      from: user1,
      to: lobby,
      message:
        "It’s exciting! It’s much busier than the last city we lived in. I was working in Seattle for the last 3 years.",
      date: new Date("04 Dec 1995 00:12:00 GMT"),
    },
    {
      from: user2,
      to: lobby,
      message:
        "It really is very busy. I moved here from Tokyo 5 years ago and I still have trouble sometimes. Did you move here with your wife?",
      date: new Date("04 Dec 1995 00:13:00 GMT"),
    },
    {
      from: user1,
      to: lobby,
      message:
        "It’s exciting! It’s much busier than the last city we lived in. I was working in Seattle for the last 3 years.",
      date: new Date("04 Dec 1995 00:16:00 GMT"),
    },
    {
      from: user2,
      to: lobby,
      message:
        "It really is very busy. I moved here from Tokyo 5 years ago and I still have trouble sometimes. Did you move here with your wife?",
      date: new Date("04 Dec 1995 00:18:00 GMT"),
    },
    {
      from: user2,
      to: lobby,
      message:
        "It really is very busy. I moved here from Tokyo 5 years ago and I still have trouble sometimes. Did you move here with your wife?",
      date: new Date("04 Dec 1995 00:19:00 GMT"),
    },
    {
      from: user1,
      to: lobby,
      message:
        "It’s exciting! It’s much busier than the last city we lived in. I was working in Seattle for the last 3 years.",
      date: new Date("04 Dec 1995 00:19:30 GMT"),
    },
  ];
}
