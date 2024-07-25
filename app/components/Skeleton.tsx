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
        foregroundColor="#cccccc"
      >
        <Rect x="45" y="10" rx="10" ry="10" width="200" height="20" />

        <Rect x="15" y="45" rx="10" ry="10" width="150" height="15" />

        <Rect x="15" y="75" rx="10" ry="10" width="150" height="15" />

        <Rect x="15" y="105" rx="10" ry="10" width="150" height="15" />

        <Rect x="15" y="135" rx="10" ry="10" width="150" height="15" />

        <Rect x="65" y="170" rx="10" ry="10" width="170" height="15" />
      </ContentLoader>
    </>
  );
};

export default Skeleton;
