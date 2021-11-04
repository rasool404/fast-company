import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <Qualities key={quality._id} {...quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
