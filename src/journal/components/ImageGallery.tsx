import { ImageList, ImageListItem } from "@mui/material";
import { FC } from "react";

export const ImageGallery: FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  return (
    <ImageList
      sx={{ width: "100%", height: "calc(100% - 200px)" }}
      cols={3}
      rowHeight={200}
    >
      {imageUrls.map((url) => (
        <ImageListItem key={url}>
          <img src={url} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
