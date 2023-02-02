import React, { memo, useState } from "react";
import s from "./burgerMenu.module.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SchoolIcon from "@mui/icons-material/School";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "bll/store";
import { packUserIdSelector, user_idSelector } from "bll/selectors";
import { PATH } from "bll/Path";

type BurgerPropsType = {
  renamePack: (packID: string, packName: string) => void;
  removePack: (packID: string) => void;
  learnCards: () => void;
  packName: string;
};

export const BurgerMenu: React.FC<BurgerPropsType> = memo(
  ({ renamePack, removePack, learnCards, packName }) => {
    const meID = useAppSelector(user_idSelector);
    const packUserID = useAppSelector(packUserIdSelector);

    const [searchParams] = useSearchParams();
    const cardsPack_id = searchParams.get("cardsPack_id");

    const [visibleMenuBar, setVisibleMenuBar] = useState<boolean>(false);

    const onVisibleMenuBarHandler = () => {
      setVisibleMenuBar(!visibleMenuBar);
    };

    const deletePackHandler = () => {
      removePack(cardsPack_id!);
      return <Navigate to={PATH.PACK_LIST} />;
    };

    const viewBurger = meID === packUserID;

    return viewBurger ? (
      <div className={s.burgerMenu} onClick={onVisibleMenuBarHandler}>
        <div className={s.iconMenu}>
          <div className={s.rectangleContainer}>
            <div className={s.ellipseBig}>
              <div className={s.containerGroup}>
                <div className={s.ellipse} style={{ top: "150.62px" }}></div>
                <div className={s.ellipse} style={{ top: "147.12px" }}></div>
                <div className={s.ellipse} style={{ top: "143.63px" }}></div>
                <div className={s.rectangle}></div>
              </div>
            </div>
          </div>
        </div>
        {visibleMenuBar && (
          <div className={s.menuBarContainer}>
            <div className={s.menuBar}>
              <div className={s.buttonGroup}>
                <div
                  className={s.buttonAndName}
                  onClick={() => renamePack(cardsPack_id!, "Update Pack")}
                >
                  <BorderColorIcon className={s.icon_style} />

                  {/*<EditPackModal name={packName} id={cardsPack_id!} userId={packUserID} />*/}

                  <div className={s.name}>Edit</div>
                </div>
                <div className={s.buttonAndName} onClick={deletePackHandler}>
                  <DeleteOutlineIcon className={s.icon_style} />

                  {/*<DeletePackModal name={packName} id={cardsPack_id!} userId={packUserID} />*/}

                  <div className={s.name}>Delete</div>
                </div>
                <div className={s.buttonAndName} onClick={learnCards}>
                  <SchoolIcon className={s.icon_style} />
                  <div className={s.name}>Learn</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : null;
  }
);
