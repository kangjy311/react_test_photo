/** @jsxImportSource @emotion/react */
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useEffect, useRef, useState } from "react";

/**
 *  1. 사진 불러오기 버튼을 클릭 후 5개 이상의 이미지를 불러올 수 있어야함.
 *  2. PromiseAll을 사용하여 이미지를 순서대로 불러와야함.
 *  3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?" 라는 확인 취소 메세지 창이 떠야함.
 *  4. 확인 클릭시 localStorage에 key: photo, value: JSON 데이터
 *      [
 *          {
 *              id: 1,
 *              imageUrl: ""
 *          },
 *          {
 *              id: 2,
 *              imageUrl: ""
 *          }
 *      ]
 *      형식으로 저장되어야함.
 *  5. 취소시 저정되면 안됨.
 */

function PhotoRegister() {
    const [ urls, setUrls ] = useState([]);
    const imageIdRef = useRef(0);
    const fileInputRef = useRef();
    const [ loadImages, setLoadImages ] = useState([]);


    const handdleFileChange = (e) => {
        console.log(e.target.files);
        const { files } = e.target;
        const fileArray = Array.from(files);
        
        if(fileArray.length === 0) {
            return;
        }

        console.log(fileArray.map(file => file.name));

        let promises = [];
        
        promises = fileArray.map(file => new Promise(resolve => {
            const loadImage = {
                id: imageIdRef.current += 1,   
                file,
                dataURL: ""
            }

            const fileReader = new FileReader();
            
            fileReader.onload = (e) => {  
                resolve({
                    ...loadImage,
                    dataURL: e.target.result
                });
            }

            fileReader.readAsDataURL(file);
        }));

        Promise.all(promises)
        .then(result => {
            setLoadImages(result);
        }).then(
            
        );
        
        // if(window.confirm("이미지를 저장하시겠습니까?")) {
        //     localStorage.setItem("urls", urls);
        // } else {
        //     console.log("취소");
        // }

    }

    

    return (
        <div css={S.layout}>
            <h1 css={S.title}>사진 등록하기</h1>
            {loadImages.map(loadImage =>
                <div key={loadImage.id}>
                    <img src={loadImage.dataURL} alt="" />
                </div>)
            }
            <input type="file" style={{display: "none"}} multiple={true} ref={fileInputRef} onChange={handdleFileChange}/>
            <WideButton text={"사진 불러오기"} onClick={() => fileInputRef.current.click()}/>
        </div>
    );
}

export default PhotoRegister;