import React from 'react';
import PropTypes from 'prop-types';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';
import styles from '@/constants/styles';
import RoundedBox from '@/components/RoundedBox';
import FormCreateCommunity from '@/components/FormCreateCommunity';

const ActionButton = styled.button.attrs((props) => ({
  background: props.selected ? styles.PRIMARY_ELEMENT : styles.BACKGROUND_DEFAULT,
  color: props.selected ? '#FFFFFF' : styles.PRIMARY_TEXT,
}))`
  background: ${(props) => props.background};
  border-radius: 8px;
  color: ${(props) => props.color};
  font-size: 14px;
  margin-right: 16px;
  margin-bottom: 8px;
  padding: 8px 12px;
  width: fit-content;

  &:last-child {
    margin-right: 0;
  }
`;

const SubmitButton = styled.button`
  background-color: ${styles.PRIMARY_ELEMENT};
  color: #FFFFFF;
  margin-top: 16px;
  @media(max-width: 400px) {
    width: 100%;
  }
`;

function AlurakutActions({ handleClickCreateCommunity }) {
  const [selectedAction, setSelectedAction] = React.useState(0);

  return (
    <RoundedBox>
      <p className="subTitle">O que você deseja fazer?</p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
      >
        <ActionButton
          selected={selectedAction === 0}
          onClick={() => setSelectedAction(0)}
        >
          Criar comunidade
        </ActionButton>
        <ActionButton
          selected={selectedAction === 1}
          onClick={() => setSelectedAction(1)}
        >
          Escrever depoimento
        </ActionButton>
      </div>
      {
        selectedAction === 0
          ? (
            <FormCreateCommunity
              handleClickCreateCommunity={
                (newCommunity) => handleClickCreateCommunity(newCommunity)
              }
            />
          )
          : ''
      }
      {
        selectedAction === 1
          ? (
            <form
              style={{ marginTop: '8px' }}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const cookies = nookies.get();
                const { githubUser } = jwt.decode(cookies.USER_TOKEN);
                const newTestimonial = {
                  text: formData.get('text'),
                  to: formData.get('user'),
                };

                fetch('/api/testimonials', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ...newTestimonial,
                    user: githubUser,
                  }),
                })
                  .then(() => setSelectedAction(0));
              }}
            >
              <input
                placeholder="Quem vai receber o depoimento?"
                name="user"
              />
              <textarea
                style={{
                  fontFamily: 'Arial',
                  marginTop: '16px',
                  outline: 'none',
                  resize: 'none',
                }}
                name="text"
                maxLength="100"
                rows="8"
                placeholder="O que falar dessa pessoa que mal conheço mas já considero pakas..."
              />
              <SubmitButton style={{ padding: '8px 36px' }} type="submit">Salvar</SubmitButton>
            </form>
          )
          : ''
      }
    </RoundedBox>
  );
}

AlurakutActions.propTypes = {
  handleClickCreateCommunity: PropTypes.func.isRequired,
};

export default AlurakutActions;
