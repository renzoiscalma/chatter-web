import GenericResponse from "./GenericResponse";

interface VideoStatusTopicResponse extends GenericResponse {
  data: {
    status: number;
    currTime: number;
    url: string;
  };
}

export default VideoStatusTopicResponse;
