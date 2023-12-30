import { filterWords } from "../../store/reducers/cardSlice";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";

import "./searchbar.sass";

const SearchBar: React.FC = () => {
    const [input, setInput] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(filterWords(input));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    return (
        <div className="search-bar">
            <h1 className="search-bar__title">Search</h1>
            <input
                className="search-bar__input"
                type="text"
                placeholder="Enter a search query"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
        </div>
    );
};

export default SearchBar;
