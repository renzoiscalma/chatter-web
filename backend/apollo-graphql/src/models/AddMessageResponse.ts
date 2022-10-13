import { Message } from "./Message";

export interface AddMessageResponse {
  code: number;
  success: boolean;
  message?: Message;
  localDateSent: string;
}
