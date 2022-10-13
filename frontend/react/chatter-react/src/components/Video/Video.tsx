import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import YouTube, { YouTubeEvent } from "react-youtube";
import { SxProps } from "@mui/system";
import { useContainerDimension } from "../../util/ResizeUtil";

interface VideoProps {
  videoId: string;
}

enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  VIDEO_CUED = 5,
}

function Video({ videoId }: VideoProps): JSX.Element {
  interface State {
    playerState: PlayerState;
    videoId: string;
    onStateChange(event: YouTubeEvent<number>): void;
    onReady(event: YouTubeEvent<number>): void;
    onPlay(event: YouTubeEvent<number>): void;
    onPause(event: YouTubeEvent<number>): void;
    onEnd(event: YouTubeEvent<number>): void;
    onError(event: YouTubeEvent<number>): void;
    opts: {
      width: string;
      height: string;
    };
  }

  const videoContainerStyle: SxProps = {
    display: "flex",
  };

  const onStateChange = (event: YouTubeEvent<number>): void => {
    setVideoState((prev: State) => ({
      ...prev,
      playerState: getPlayerState(event.data),
    }));
  };

  const onReadyHandler = (event: YouTubeEvent<number>): void => {};

  const onPlayHandler = (event: YouTubeEvent<number>): void => {};

  const onPauseHandler = (event: YouTubeEvent<number>): void => {};

  const onEndHandler = (event: YouTubeEvent<number>): void => {};

  const onErrorHandler = (event: YouTubeEvent<number>): void => {};

  const [videoState, setVideoState] = useState<State>({
    videoId: videoId,
    playerState: PlayerState.UNSTARTED,
    onStateChange: onStateChange,
    onReady: onReadyHandler,
    onPlay: onPlayHandler,
    onPause: onPauseHandler,
    onEnd: onEndHandler,
    onError: onErrorHandler,
    opts: {
      width: "",
      height: "",
    },
  });
  const ytContainer = useRef<HTMLDivElement>(null);
  const videoSize = useContainerDimension(ytContainer);

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
    setVideoState((prevState: State) => ({
      ...prevState,
      opts: {
        width: videoSize.width + "",
        height: videoSize.height + "",
      },
    }));
  }, [videoSize]);

  return (
    <Box sx={videoContainerStyle}>
      <div style={{ width: "70vw", height: "99vh" }} ref={ytContainer}>
        <YouTube {...videoState}></YouTube>
      </div>
    </Box>
  );
}

export default Video;
