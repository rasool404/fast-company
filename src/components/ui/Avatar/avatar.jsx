import React from 'react';
import PropTypes from "prop-types";

const Avatar = ({classItem, width, height}) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`}
            className={classItem}
            width={width}
            height={height}
            alt="avatar"
        />
    );
};

Avatar.propTypes = {
    classItem: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Avatar;