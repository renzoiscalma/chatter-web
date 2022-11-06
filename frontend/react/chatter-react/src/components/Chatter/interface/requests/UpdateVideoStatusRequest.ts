interface UpdateVideoStatusRequest {
  lobbyId: string;
  userId: string;
  status: number;
  currTime: number;
}

export default UpdateVideoStatusRequest;
