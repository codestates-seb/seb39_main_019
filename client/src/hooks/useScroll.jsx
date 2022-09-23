import React from "react";

const useScroll = () => {

  const [scrollY, setScrollY] = React.useState(0);

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    setScrollY(scrollPosition)
  };
  React.useEffect( () => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);
  return {scrollY}
}

export default useScroll