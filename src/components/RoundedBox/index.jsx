import styles from '@/constants/styles';
import styled from 'styled-components';

const RoundedBox = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #FFFFFF;
  height: fit-content;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: ${styles.PRIMARY_TEXT};
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: ${styles.GRAY_1};
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input,textarea {
    width: -webkit-fill-available;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    border-radius: 8px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    border-radius: 8px;
    padding: 8px 12px;
  }
  img {
    border-radius: 8px;
  }
`;

export default RoundedBox;
