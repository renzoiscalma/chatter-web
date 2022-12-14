import {
  MutationTuple,
  QueryResult,
  SubscriptionResult,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/system";
import { validate } from "graphql";
import { eventNames } from "process";
import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { UsrContxt } from "../../App";
import {
  GET_VIDEO_STATUS,
  UPDATE_VIDEO,
  VIDEO_STATUS_SUBSCRIPTION,
} from "../../queries/Video";
import { useContainerDimension } from "../../util/ResizeUtil";
import UpdateVideoStatusRequest from "../Chatter/interface/requests/UpdateVideoStatusRequest";
import GenericResponse from "../Chatter/interface/response/GenericResponse";
import VideoStatusTopicResponse from "../Chatter/interface/response/VideoStatusTopicResponse";

interface VideoProps {
  videoId: string;
}

interface LobbyIdProps {
  lobbyId: string;
}
interface UserIdProps {
  userIdProps: string;
}

enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  VIDEO_CUED = 5,
}

const defaultPlayerProps: ReactPlayerProps = {
  playing: true,
  controls: true,
  muted: true,
  playbackRate: 1.0,
  loop: false,
  playsinline: true,
};

function Video(): JSX.Element {
  const YOUTUBE_URL = "https://www.youtube.com/watch?v=";
  const userContext = useContext(UsrContxt);
  const [playerProps, setPlayerProps] =
    useState<ReactPlayerProps>(defaultPlayerProps);
  const ytContainer = useRef<HTMLDivElement>(null);
  const videoSize = useContainerDimension(ytContainer);
  const playerRef = useRef<ReactPlayer>(null);

  const videoChanges: SubscriptionResult<
    { videoStatusChanged: VideoStatusTopicResponse },
    { lobbyId: LobbyIdProps; userId: UserIdProps }
  > = useSubscription(VIDEO_STATUS_SUBSCRIPTION, {
    variables: {
      lobbyId: userContext.lobbyId,
      userId: userContext.userId,
    },
  });

  const [updateVideo, updateVideoProperties]: MutationTuple<
    { updateVideoStatus: GenericResponse },
    { statusInput: UpdateVideoStatusRequest }
  > = useMutation(UPDATE_VIDEO);

  const videoStatus: QueryResult<
    { getVideoStatusOnLobby: VideoStatusTopicResponse },
    { lobbyId: string }
  > = useQuery(GET_VIDEO_STATUS, {
    variables: {
      lobbyId: userContext.lobbyId,
    },
  });

  const videoContainerStyle: SxProps = {
    display: "flex",
  };

  const onReadyHandler = (): void => {
    console.log(playerProps);
    setTimeout(() => {
      setPlayerProps((val) => ({
        ...val,
        muted: false,
      }));
    }, 500);
  };

  const onPlayHandler = (): void => {
    const { lobbyId, userId } = userContext;
    if (!playerRef.current) return;
    setPlayerProps((values) => ({
      ...values,
      playing: true,
    }));
    updateVideo({
      variables: {
        statusInput: {
          currTime: +playerRef.current.getCurrentTime().toFixed(0),
          lobbyId,
          userId,
          status: PlayerState.PLAYING,
        },
      },
    });
  };

  const onPauseHandler = (param: any): void => {
    const { lobbyId, userId } = userContext;
    if (!playerRef.current) return;
    setPlayerProps((values) => ({
      ...values,
      playing: false,
    }));
    updateVideo({
      variables: {
        statusInput: {
          currTime: +playerRef.current.getCurrentTime().toFixed(0),
          lobbyId,
          userId,
          status: PlayerState.PAUSED,
        },
      },
    });
  };

  const getPlayerState = (eventData: number): PlayerState => {
    switch (eventData) {
      case 0:
        return PlayerState.ENDED;
      case 1:
        return PlayerState.PLAYING;
      case 2:
        return PlayerState.PAUSED;
      case 3:
        return PlayerState.BUFFERING;
      case 5:
        return PlayerState.VIDEO_CUED;
      default:
        return PlayerState.UNSTARTED;
    }
  };

  useEffect(() => {
    console.log(videoChanges);
    if (videoChanges?.data?.videoStatusChanged) {
      const { currTime, status, url } =
        videoChanges.data.videoStatusChanged.data;
      if (url) {
        setPlayerProps((values) => ({
          ...values,
          url,
        }));
      }

      switch (getPlayerState(status)) {
        case PlayerState.PLAYING:
          setPlayerProps((values) => ({
            ...values,
            playing: true,
          }));
          break;
        case PlayerState.PAUSED:
          setPlayerProps((values) => ({
            ...values,
            playing: false,
          }));
          break;
        case PlayerState.UNSTARTED:
        case PlayerState.ENDED:
        default:
          break;
      }
    }
  }, [videoChanges.data]);

  useEffect(() => {
    setPlayerProps((values) => ({
      ...values,
      onReady: onReadyHandler,
      onPlay: onPlayHandler,
      onPause: onPauseHandler,
    }));
  }, [userContext]);

  useEffect(() => {
    if (videoStatus.data) {
      const { data } = videoStatus.data.getVideoStatusOnLobby;
      console.log(data);
      setPlayerProps((val) => ({
        ...val,
        url: data.url,
        playing: data.status === 1,
        played: 0,
        loaded: 0,
        pip: false,
        loop: false,
      }));
    }
  }, [videoStatus.data]);

  useEffect(() => {
    setPlayerProps((values) => ({
      ...values,
      width: videoSize.width,
      height: videoSize.height,
    }));
  }, [videoSize]);

  return (
    <Box sx={videoContainerStyle}>
      <div style={{ width: "70vw", height: "99vh" }} ref={ytContainer}>
        <ReactPlayer {...playerProps} ref={playerRef}></ReactPlayer>
      </div>
    </Box>
  );
}

export default Video;
