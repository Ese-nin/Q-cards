import { useAppSelector } from "bll/store";
import s from "./packList.module.css";
import { PATH } from "bll/Path";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  cardsTotalCountSelector,
  isLoggedInSelector,
  packNameSelector,
  packUserIdSelector,
  user_idSelector,
} from "bll/selectors";
import back from "assets/icon/back.svg";
import { AddNewCardModal } from "components/modal/AddNewCardModal";

export const PackPageEmpty = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const packName = useAppSelector(packNameSelector);
  const totalCardsCount = useAppSelector(cardsTotalCountSelector);
  const packUserID = useAppSelector(packUserIdSelector);
  const meID = useAppSelector(user_idSelector);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardsPack_id = params.cardsPack_id;

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  if (totalCardsCount) {
    navigate(PATH.PACK_PAGE + "?cardsPack_id=" + cardsPack_id);
  }

  const BackToPackList = () => {
    navigate(PATH.PACK_LIST);
  };

  const viewButton = meID === packUserID;

  return (
    <div className={s.page}>
      <div className={s.backBlock} onClick={BackToPackList}>
        <img src={back} alt="back" />
        <span>Back to Packs List</span>
      </div>
      <div className={s.addNewPackLine}>
        <div className={s.nameAndBurger}>
          <h2>{packName}</h2>
        </div>
      </div>
      <div className={s.emptyCenterBlock}>
        <span>This pack is empty.</span>
        {viewButton && (
          <>
            <span>Click add new card to fill this pack</span>
            <AddNewCardModal cardsPackId={cardsPack_id} />
          </>
        )}
      </div>
    </div>
  );
};
