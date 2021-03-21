import React, { useEffect, MutableRefObject } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

// interface Props {
//     ref:React.MutableRefObject<HTMLDivElement | null>;
// }

type Props = {
  children: React.ReactNode;
  index: number;
  activeHandler: (index: number) => void;
};

const Section = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {activeHandler, index, children} = props

  const node = ref as MutableRefObject<HTMLDivElement>;

  const entry = useIntersectionObserver(node, {    
    
    threshold: 0,
    rootMargin: "-50% 0px -50% 0px",
    freezeOnceVisible: false});

  useEffect(() => {
    const isVisible = !!entry?.isIntersecting;
    if (isVisible) {
      activeHandler(index);
    }
  }, [entry, activeHandler, index]);

  return <div ref={node}>{children}</div>;
});

export default Section;
