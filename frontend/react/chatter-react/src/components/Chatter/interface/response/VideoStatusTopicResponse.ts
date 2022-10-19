import GenericResponse from "./GenericResponse";

interface VideoStatusTopicResponse extends GenericResponse {
  data: {
    status: number;
    currTime: string;
  };
}

export default VideoStatusTopicResponse;
