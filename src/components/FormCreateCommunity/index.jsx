import React from 'react';
import PropTypes from 'prop-types';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import RandomImage from '@/utils/RandomImage';
import styled from 'styled-components';
import styles from '@/constants/styles';

function GenerateImagesList(limit) {
  const temp = [];
  for (let i = 0; i < limit; i += 1) {
    if (i > 9) break;
    temp.push(RandomImage());
  }

  return temp;
}

function ImageOptions({ images, handleClickImage }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}
    >
      {images.map((url, index) => (
        <a
          key={`image-${url}`}
          style={{
            display: 'block',
            height: '40px',
            marginRight: '16px',
            width: '40px',
          }}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleClickImage(url);
          }}
        >
          <img src={url} alt={`community ${index}`} />
        </a>
      ))}
    </div>
  );
}

ImageOptions.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClickImage: PropTypes.func.isRequired,
};

function ComminityImages({ handleClickImage }) {
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState('');
  const limit = 4;

  React.useEffect(() => {
    const list = GenerateImagesList(limit);
    setImages(list);
    setSelectedImage(list[0]);
  }, []);

  return (
    <div
      style={{
        columnGap: '16px',
        display: 'grid',
        gridTemplateColumns: '87px auto',
        marginTop: '16px',
        width: '100%',
      }}
    >
      <img src={selectedImage} alt="community" />
      <div style={{ width: '100%' }}>
        <ImageOptions
          images={images}
          handleClickImage={(url) => {
            setSelectedImage(url);
            handleClickImage(url);
          }}
        />
        <button
          style={{ marginTop: '16px' }}
          type="button"
          onClick={() => {
            const list = GenerateImagesList(limit);
            setImages(list);
            setSelectedImage(list[0]);
          }}
        >
          Gerar novas imagens
        </button>
      </div>
    </div>
  );
}

ComminityImages.propTypes = {
  handleClickImage: PropTypes.func.isRequired,
};

const SubmitButton = styled.button`
  background-color: ${styles.PRIMARY_ELEMENT};
  color: #FFFFFF;
  margin-top: 16px;
  @media(max-width: 400px) {
    width: 100%;
  }
`;

function FormCreateCommunity({ handleClickCreateCommunity }) {
  const [communityImage, setCommunityImage] = React.useState('');
  const [communityName, setCommunityName] = React.useState('');

  return (
    <form
      style={{
        marginTop: '8px',
        width: '100%',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const cookies = nookies.get();
        const { githubUser } = jwt.decode(cookies.USER_TOKEN);
        const newCommunity = {
          title: formData.get('title'),
          imageUrl: formData.get('imageUrl'),
        };

        fetch('/api/communities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newCommunity,
            user: githubUser,
          }),
        })
          .then(() => {
            handleClickCreateCommunity(newCommunity);
            setCommunityName('');
          });
      }}
    >
      <input
        placeholder="Qual vai ser o nome da sua comunidade?"
        name="title"
        value={communityName}
        onChange={(e) => setCommunityName(e.value)}
      />
      <input
        type="hidden"
        name="imageUrl"
        value={communityImage}
      />
      <ComminityImages handleClickImage={(url) => setCommunityImage(url)} />
      <SubmitButton style={{ padding: '8px 36px' }} type="submit">Criar</SubmitButton>
    </form>
  );
}

FormCreateCommunity.propTypes = {
  handleClickCreateCommunity: PropTypes.func.isRequired,
};

export default FormCreateCommunity;
