import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@/components/Divider';
import RoundedBox from '@/components/RoundedBox';
import styles from '@/constants/styles';
import { AlurakutProfileSidebarMenuDefault } from '@/lib/AlurakutCommons';

function ProfileSidebar({ userinfo }) {
  return (
    <RoundedBox as="aside">
      <img src={userinfo.avatarUrl} style={{ borderRadius: '8px' }} alt="user avatar" />
      <Divider />
      <p>
        <a className="boxLink" href={userinfo.htmlUrl} target="_blank" rel="noopener noreferrer">
          {`@${userinfo.login}`}
        </a>
      </p>
      <p style={{
        color: styles.GRAY_3,
        margin: '4px 0',
        fontSize: '12px',
      }}
      >
        {userinfo.location}
      </p>
      <Divider />
      <AlurakutProfileSidebarMenuDefault />
    </RoundedBox>
  );
}

ProfileSidebar.propTypes = {
  userinfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProfileSidebar;
