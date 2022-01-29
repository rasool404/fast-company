import React from 'react';
import PropTypes from "prop-types";

const GroupList = ({valueProperty, contentProperty, selectedItem, setSelectedProf, items, clearSearch}) => {
    const clearFilter = () => {
        setSelectedProf()
    }

    const handleProfessionsSelect = (item) => {
        clearSearch()
        setSelectedProf(item)
    }

    return (
        <>
            {items && (
                <>
                    <h3>Фильтры</h3>
                    <ul className="list-group">
                        {Object.keys(items).map(item => (
                            <li className={"list-group-item" + (items[item][contentProperty] === selectedItem ? ' active' : '')}
                                role='button'
                                key={items[item][valueProperty]}
                                onClick={() => handleProfessionsSelect(items[item][contentProperty])}
                            >
                                {items[item][contentProperty]}
                            </li>
                        ))}
                    </ul>
                    <button
                        className='btn btn-secondary mt-2'
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </>
            )}
        </>
    );
};

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
}

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    selectedItem: PropTypes.string,
    setSelectedProf: PropTypes.func
}

export default GroupList;