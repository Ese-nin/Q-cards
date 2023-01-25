import React, { ChangeEvent, useEffect, useState } from "react";
import { SuperButton, SuperCheckbox } from "../../common";
import SuperRadio from "../../common/c6-SuperRadio/SuperRadio";
import s from "./learn.module.css";
import { CardType } from "../../../dal/cardsAPI";
import { AppRootStateType, useAppDispatch, useAppSelector } from "../../../bll/store";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getCardsPageTC } from "../../../bll/reducers/cards-reducer";
import { putAGradeTC } from "../../../bll/reducers/learn-reducer";
import { cardPacksSelector } from "../../../bll/selectors";

type LearnPropsType = {
  namePack?: string;
  question?: string;
  answer?: string;

  rating?: number; //для показа кол-во повтора этого вароса
};

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 }
  );
  console.log("test: ", sum, rand, res);

  return cards[res.id + 1];
};

export const Learn = ({ namePack, rating }: LearnPropsType) => {
  const [visibleAnswer, setVisibleAnswer] = useState<boolean>(false);
  const grades = ["не знал", "забыл", "долго думал", "перепутал", "знал"];
  const [valueRadio, onChangeOption] = useState(grades[0]);
  const [grade, setGrade] = useState<number>(0);
  const { cards } = useAppSelector(cardPacksSelector);
  const [first, setFirst] = useState<boolean>(true);
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardsPack_id = params.cardsPack_id;

  const [card, setCard] = useState<CardType>({
    answer: "",
    question: "",
    cardsPack_id: "",
    grade: 0,
    shots: 1,
    user_id: "",
    created: "",
    updated: "",
    _id: "",
  });

  console.log(card);

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("LearnContainer useEffect");

    if (first) {
      dispatch(getCardsPageTC({ ...params, cardsPack_id })); // тут ошибка
      setFirst(false);
    }

    console.log("cards", cards);
    if (cards.length > 0) setCard(getCard(cards));

    return () => {
      console.log("LearnContainer useEffect off");
    };
  }, [dispatch, params.id, cards, first]);

  const onNext = () => {
    setVisibleAnswer(false);

    if (cards.length > 0) {
      grades.map((el, index) => (el === valueRadio ? setGrade(index + 1) : el));
      dispatch(putAGradeTC(grade, card._id));
      setCard(getCard(cards));
    } else {
      console.log("В колоде нету карточек");
    }
  };

  const onClickButtonHandler = () => {
    setVisibleAnswer(!visibleAnswer);
  };

  return (
    <div className={s.learnPageContainer}>
      <div className={s.learnContainer}>
        <div className={s.namePack}>{namePack}Name Pack</div>
        <div className={s.questionContainer}>
          <div className={s.question}>Question: {card.question}</div>
          <div className={s.rating}>Количество попыток ответить на этот вопрос: {rating}</div>

          {visibleAnswer ? (
            <div className={s.answerContainer}>
              Answer: {card.answer}
              <div className={s.valueAnswer}>
                <div className={s.variantAnswer}> Варианты ответа:</div>
                <SuperRadio options={grades} value={valueRadio} onChangeOption={onChangeOption} />
              </div>
              <div className={s.nextButton}>
                <SuperButton className={s.buttonStyle} onClick={onNext}>
                  Следующий вопрос
                </SuperButton>
              </div>
            </div>
          ) : (
            <div className={s.showAnswer}>
              <SuperButton className={s.buttonStyle} onClick={onClickButtonHandler}>
                Показать ответ
              </SuperButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
