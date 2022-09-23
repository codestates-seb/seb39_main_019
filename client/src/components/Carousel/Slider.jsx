import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import Slide from './Slide'
import secondLogo from '../../assets/imgs/secondLogo.png'
import firstLogo from '../../assets/imgs/firstLogo.png'
import dog1 from '../../assets/imgs/dog1.png'

const dogs = [dog1,firstLogo]

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide(prevIndex => (prevIndex !== dogs.length-1 ? prevIndex + 1 : 0)), // prevIndex가 1이 아니면 + 1이 되고 아니라면 0이되는 setInterval 설정
      4000 
    );
    return () => {
      clearInterval(timer); 
    };
  }, []);

  useEffect(() => {
    slideRef.current.style.transition = 'all 1s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);


  return (
    <Container>
      <SliderContinaer ref={slideRef}>
        {dogs.map((it,idx)=>(
          <Slide img={it} key={idx}/>
        ))}
      </SliderContinaer>
    </Container>
  )

}


export default Slider

const Container = styled.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  @media screen and (max-width: 610px) {
     height: 400px;
  }
`

const SliderContinaer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`


