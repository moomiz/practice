import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Swal from "sweetalert2";

interface quiz {
  question: string[];
  answer: string[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function IntroComponent({ question, answer, page, setPage }: quiz) {
  const [texts, setTexts] = useState(Array.from(question[page - 1]));
  const Swal = require('sweetalert2')

  useEffect(() => {
    // page가 변경될 때마다 새로운 문제 텍스트를 설정
    setTexts(Array.from(question[page - 1]));
  }, [page, question]);

  const [answerBox, setAnswerBox] = useState("");
  const viewProblem: { [key: string]: string[] } = {
    "1": ["미국", "일본", "중국", "호주"],
    "2": ["다시, 나는 희망의 증거가 되고 싶다", "더 마인드", "공자가 죽어야 나라가 산다", "나를 살리는 습관, 죽이는 습관"],
    "3": ["댕이", "맹이", "뺑이", "땡이"], // 예시로 추가
    "4": ["8월 27일", "8월 28일", "8월 29일", "8월 30일"],
    "5": ["한밭식당", "솔밭식당", "밀밭식당", "죽밭식당"],
    "6": ["KEC", "T-Robotics", "INVENIA", "회사를 안다녔다."],
    "7": ["서울", "대구", "부산", "제주도"],
    // 다른 page에 따른 선택지도 추가 가능
  };

  const colors = ["#FF8A80", "#80D8FF", "#d4c83c", "#84C539"];

  const answerHandler = (view: string) => {
    if (view == answer[page - 1]) {
      setPage(page + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "땡!",
        text: "다시 생각해보세요!"
      });
      setPage(1);
    }
  };

  const getColor = (page: number) => {
    const colorValue = Math.max(0, 255 - page * 30); // 페이지에 따라 색상 값 조정
    return `rgb(${colorValue}, ${colorValue}, ${colorValue})`; // 검은색으로 어두워짐
  }

  return (
    <Wrapper>
      <TextLine key={page}>
        {" "}
        {/* page가 변경될 때마다 새롭게 렌더링되도록 key 추가 */}
        {texts.map((text, index) => (
          <Text key={index} delay={`${index * 100}ms`} textColor={getColor(page)}>
            {text}
          </Text>
        ))}
      </TextLine>
        <ErrorText>*틀리면 1번 문제로 되돌아 갑니다*</ErrorText>
      <BtnComponent>
        {viewProblem[page.toString()]?.map((view, index) => (
          <Btn
            key={index}
            onClick={() => answerHandler(view)}
            bgColor={colors[index % colors.length]}
          >
            {view}
          </Btn>
        ))}
      </BtnComponent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: Pretendard-Regular;
  font-weight: 600;
  font-size: 32px;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
  @media only screen and (max-width: 600px) {
    justify-content: flex-start;
    margin-top:10%;
    align-items: center;
  }
`;

const ErrorText = styled.div`
  color: yellow;
  font-size:14px;
  margin-top: 5%;
`
const TextLine = styled.div`
  animation: fade 3s ease-in-out;
  animation-fill-mode: forwards;
  @keyframes fade {
    /* 효과를 동작시간 동안 0 ~ 1까지 */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media only screen and (max-width: 600px) {
    /* justify-content: flex-start; */
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: center; */
  }
`;

const Text = styled.span<{ delay: string, textColor: string }>`
  font-family: Pretendard-Regular;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  animation-delay: ${(props) => props.delay};
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  color: ${({ textColor }) => textColor};
`;

const BtnComponent = styled.div`
  display: flex;
  width: 80%;
  height: 30vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  @media only screen and (max-width: 600px) {
    width:100%;
  }
`;

const Btn = styled.div<{ bgColor: string }>`
  display: flex;
  width: 10vw;
  height: 7vh;
  background-color: ${(props) => props.bgColor};
  border-radius: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 5vh;
  font-size: 18px;
  /* box-shadow: ;
  cursor: pointer; */
  @media only screen and (max-width: 600px) {
    width:100%;
    padding: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;


export default IntroComponent;
