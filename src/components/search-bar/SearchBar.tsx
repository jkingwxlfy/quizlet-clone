import { filterWords, setSearchQuery } from '../../store/reducers/cardSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import './searchbar.scss';

const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { searchQuery } = useAppSelector((state) => state.cardSlice);

    useEffect(() => {
        dispatch(filterWords());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    return (
        <div className="search-bar">
            <h1 className="search-bar__title">Search</h1>
            <input
                className="search-bar__input"
                type="text"
                placeholder="Enter a search query"
                value={searchQuery}
                onChange={(event) =>
                    dispatch(setSearchQuery(event.target.value))
                }
            />
        </div>
    );
};

export default SearchBar;
