import React from "react";
import ReactPlayer from "react-player";

const VideoSection = ({ data }) => {
  return (
    <div className="mb-5 ps-3 mt-3">
      {data.length!==0 ? (
        <div className="h4 fw-semibold mb-3 text-center">Official Videos</div>
      ) : (
        ""
      )}

      <div className="d-flex flex-wrap gap-4 justify-content-evenly">
        {data?.map((video,i) => (
          <div key={i}>
            <ReactPlayer
              controls
              light
              url={`https://www.youtube.com/watch?v=${video.key}`}
              width="230px"
              height="150px"
            />
            <div className="fs-6" style={{ width: "230px" }}>
              {video.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
