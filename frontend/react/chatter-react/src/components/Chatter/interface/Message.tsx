import SendStatus from "./SendStatus";

export default interface Message {
	message: string;
	sender: string;
	to: string;
	date?: Date;
	imgUrl?: string;
	sendStatus?: SendStatus;
	localDateSent?: string;
}