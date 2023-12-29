import { useState } from "react";

import ModeListItem from "../mode-list-item/ModeListItem";

import "./modelist.sass";

const ModeList = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [modList, setModList] = useState([
        { name: "card" },
        { name: "test" },
    ]);
    return (
        <div className="mode-list">
            <h1 className="mode-list__title">Select mode</h1>
            <div className="mode-list__container">
                {modList.map((mode) => {
                    return <ModeListItem key={mode.name} name={mode.name} />;
                })}
            </div>
        </div>
    );
};

export default ModeList;
