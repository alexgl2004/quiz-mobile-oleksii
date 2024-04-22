import { Image } from "expo-image";
import { useState, useEffect } from "react";

export function AutoHeightImage(props) {
  const [imageDisplayWidth, setImageDisplayWidth] = useState(0);
  const [imageDisplayHeight, setImageDisplayHeight] = useState(1);
  const [imageSourceDimensions, setImageSourceDimensions] = useState(null);

  useEffect(() => {
    if (
      imageDisplayWidth &&
      imageSourceDimensions?.height &&
      imageSourceDimensions?.width
    ) {
      setImageDisplayHeight(
        (imageDisplayWidth * imageSourceDimensions.height) /
          imageSourceDimensions.width
      );
    }
  }, [imageDisplayWidth, imageSourceDimensions, setImageDisplayHeight]);

  return (
    <Image
      onLoad={({ source: { height, width } }) => {
        setImageSourceDimensions({ height, width });
      }}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => {
        setImageDisplayWidth(width);
      }}
      height={imageDisplayHeight}
      {...props}
    />
  );
}
