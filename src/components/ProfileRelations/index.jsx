import React from 'react';
import PropTypes from 'prop-types';
import RoundedBox from '@/components/RoundedBox';

function ProfileRelations({ dataArray, title }) {
  return (
    <RoundedBox>
      <p className="subTitle">
        {title}
        (
        {dataArray.length}
        )
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px',
      }}
      >
        {dataArray.slice(0, 6).map((data) => (
          <a
            key={data.label}
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            <img src={data.imageUrl} alt={data.label} style={{ borderRadius: '8px' }} />
            <span style={{
              bottom: '14px',
              display: 'block',
              height: '0',
              position: 'relative',
            }}
            >
              {data.label}
            </span>
          </a>
        ))}
      </div>
    </RoundedBox>
  );
}

ProfileRelations.propTypes = {
  dataArray: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  title: PropTypes.string.isRequired,
};

export default ProfileRelations;
