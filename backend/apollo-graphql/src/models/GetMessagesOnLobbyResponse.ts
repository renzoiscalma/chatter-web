import { Message } from "./Message";

export interface GetMessageOnLobbyResponse {
  code: number;
  success: boolean;
  data?: Message[];
}
