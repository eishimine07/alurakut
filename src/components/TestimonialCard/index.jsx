import React from 'react';
import PropTypes from 'prop-types';

function TestimonialCard({ from, text }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{
        fontWeight: '600',
        width: '100%',
      }}
      >
        {from}
      </p>
      <p>{text}</p>
    </div>
  );
}

TestimonialCard.propTypes = {
  from: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TestimonialCard;
