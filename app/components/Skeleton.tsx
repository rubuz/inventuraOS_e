import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const Skeleton = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={500}
        height={200}
        viewBox="0 0 500 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#000000"
      >
        <Rect x="15" y="10" rx="10" ry="10" width="250" height="20" />

        <Rect x="25" y="45" rx="5" ry="5" width="250" height="15" />

        <Rect x="25" y="75" rx="5" ry="5" width="250" height="15" />

        <Rect x="25" y="105" rx="5" ry="5" width="250" height="15" />
      </ContentLoader>
    </>
  );
};

export default Skeleton;
