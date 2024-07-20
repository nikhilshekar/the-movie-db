import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { ImPlay } from "react-icons/im";
import "react-modal-video/scss/modal-video.scss";

const VideoPopup = ({ video }) => {
  const [isOpen, setOpen] = useState(false);
  
  const index = video.findIndex((v) => v.type === "Trailer");
  if (index !== -1) video.unshift(...video.splice(index, 1));

  return (
    <>
      {video.length !== 0 && (
        <React.Fragment>
          <ModalVideo
            channel="youtube"
            youtube={{ mute: 0, autoplay: 0 }}
            isOpen={isOpen}
            videoId={video[0].key}
            onClose={() => setOpen(false)}
          />
          <div className="d-flex flex-column">
            <span onClick={() => setOpen(true)}>
              <ImPlay />
            </span>
            <div className=" trailer">Watch Trailer</div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default VideoPopup;
