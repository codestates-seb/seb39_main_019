import React,{useState} from 'react'
import styled from 'styled-components';

const ImgLode = () => {
  const [showImages, setShowImages] = useState([]);
  const [isImg,setIsImg] = useState(false)

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];
    setIsImg(!isImg)
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 1) {
      imageUrlLists = imageUrlLists.slice(0, 1);
    }
    setShowImages(imageUrlLists);
  };


  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setIsImg(!isImg)
  };

  return (
    <Imgcontainer>
      {isImg?
      (showImages.map((image, id) => (
        <ImgBox key={id}>
          <img  src={image}/>
          <button onClick={() => handleDeleteImage(0)} >삭제</button>
        </ImgBox>
      ))):<div className='fakeBox'></div>}
      <label onChange={handleAddImages}>
        <input type="file" id="input-file" multiple className='classes.addButton' />
        <div>
          {isImg?null:<><span>사진추가</span></>}
        </div>
      </label>
    </Imgcontainer>
  );
};


export default ImgLode
const Imgcontainer = styled.div`
span, button:hover{
  background-color: ${(props)=>props.theme.HeLogoColor};
  color: ${(props)=>props.theme.HeaderColor}
}
 & label{
   display: flex;
   align-items: center;
    & input{
      width: 0px;
  }
    & div{
      display: flex;
      align-items: center;
      margin-top: 10px;
  }
    & span{
      display: block;
      padding: 10px 10px;
      border-radius: 10px;
      color: ${(props)=>props.theme.textColor}; 
      background-color: ${(props)=>props.theme.HeaderColor};
      cursor: pointer;
      line-height: 20px;
  }
 }
 .fakeBox{
   width: 400px;
   height: 400px;
   background-color:#cccccc;
   border-radius:10px;
 }
`

const ImgBox = styled.div`
display: flex;
flex-direction: column;
 & img{
   width: 400px;
   height: 400px;
   border-radius: 10px;
 }
 & button{
   margin-top: 10px;
   padding:10px 20px;
   font-size: 15px;
   width: 70px;
   border: none;
   color: ${(props)=>props.theme.textColor}; 
   background-color: ${(props)=>props.theme.HeaderColor};
   border-radius: 10px;
   margin-bottom: -22px;
 }


`