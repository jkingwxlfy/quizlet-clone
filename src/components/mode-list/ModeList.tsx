import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { editCardData } from "../../store/reducers/cardSlice";

import ModeListItem from "../mode-list-item/ModeListItem";

import "./modelist.sass";

const ModeList = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [modList, setModList] = useState([
        { name: "card" },
        { name: "test" },
    ]);
    const dispatch = useAppDispatch();
    const { card } = useAppSelector((state) => state.cardSlice);

    const onSetStarMode = (event: ChangeEvent<HTMLInputElement>) => {
        const onlyStars = event.target.checked;
        dispatch(
            editCardData({
                ...card,
                onlyStars,
            })
        );
        localStorage.setItem("onlyStars", onlyStars ? "true" : "false");
    };

    return (
        <div className="mode-list">
            <h1 className="mode-list__title">Select mode</h1>
            <div className="mode-list__container">
                {modList.map((mode) => {
                    return <ModeListItem key={mode.name} name={mode.name} />;
                })}
            </div>
            <label className="mode-list__label">
                <p>Only stars</p>
                <input
                    className="mode-list__checkbox"
                    type="checkbox"
                    checked={card.onlyStars}
                    onChange={(event) => onSetStarMode(event)}
                />
            </label>
        </div>
    );
};

export default ModeList;
