import { gql } from "apollo-server";

const AddMessageResponse = gql`
	type AddMessageResponse {
		code: Int!
		success: Boolean!
		message: Message
		localDateSent: String
	}
`;

export default AddMessageResponse;