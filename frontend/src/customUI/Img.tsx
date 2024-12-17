import React from "react";
import noDataIcon from "../assets/images/noDataIcon.png";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
}

const Img: React.FC<ImgProps> = React.memo(
  ({ src = noDataIcon, alt = "No Data", className, ...restProps }) => {
    return <img src={src} alt={alt} className={`${"w-6 h-6 mb-2" + className}`} {...restProps} />;
  }
);

export default Img;
