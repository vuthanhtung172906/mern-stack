import { useLayoutEffect, useState } from "react";

export default function useWindowPosition(id) {
  const [animation, setAnimation] = useState("static");
  useLayoutEffect(() => {
    const updatePosition = () => {
      const windowOffset = window.document.getElementById(id).offsetHeight;
      if (window.pageYOffset > windowOffset * 0.7) {
        setAnimation("fixed");
      }
      if (window.pageYOffset <= windowOffset * 0.7) {
        setAnimation("static");
      }
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
  }, [id]);
  return animation;
}
