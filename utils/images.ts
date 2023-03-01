import img1 from "../assets/img/1.png";
import img2 from "../assets/img/2.png";
import img3 from "../assets/img/3.png";
import img4 from "../assets/img/4.png";
import img5 from "../assets/img/5.png";
import imgDocCheck from '../assets/img/check-doc.png'


export const getImagesByColor = (color: string) => {
  switch (color) {
    case "#84a98c" :
      return img1
    case "#9e2a2b" :
      return img2
    case "#fb8500" :
      return img3
    case "#9381ff" :
      return img4
    case "#E6B333" :
      return img5
    case "#70a9a1" :
      return imgDocCheck
    default:
      return img1
  }
}