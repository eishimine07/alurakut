import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import MainGrid from '@/components/MainGrid';
import RoundedBox from '@/components/RoundedBox';
import FortuneCookieMessage from '@/utils/FortuneCookieMessage';
import RandomPersonalStatus from '@/utils/RandomPersonalStatus';
import { AlurakutMenu, OrkutNostalgicIconSet } from '@/lib/AlurakutCommons';
import AlurakutActions from '@/components/AlurakutActions';
import ProfileSidebar from '@/components/ProfileSidebar';
import ProfileRelations from '@/components/ProfileRelations';
import urls from '@/constants/urls';
import TestimonialCard from '@/components/TestimonialCard';

function Home({ githubUser }) {
  const [userinfo, setUserinfo] = React.useState({});
  const [followers, setFollowers] = React.useState([]);
  const [communities, setCommunities] = React.useState([]);
  const [testimonials, setTestimonials] = React.useState([]);

  React.useEffect(() => {
    fetch(`/api/users?user=${githubUser}`)
      .then((response) => response.json())
      .then((response) => (
        setUserinfo({
          avatarUrl: response.avatar_url,
          htmlUrl: response.html_url,
          location: response.location,
          login: response.login,
          name: response.name,
        })
      ));

    fetch(urls.API_GITHUB.FOLLOWERS.replace(':user', githubUser))
      .then(async (response) => {
        const users = await response.json();
        const data = users.map((user) => (
          {
            avatarUrl: user.avatar_url,
            htmlUrl: user.html_url,
            login: user.login,
          }
        ));
        setFollowers(data);
      });

    fetch(`/api/communities?user=${githubUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const data = await response.json();
        setCommunities(data.communities);
      });

    fetch(`/api/testimonials?user=${githubUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const data = await response.json();
        setTestimonials(data.testimonials);
      });
  }, []);

  const confiável = RandomPersonalStatus(3);
  const legal = RandomPersonalStatus();
  const sexy = RandomPersonalStatus();

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar userinfo={userinfo} />
        </div>
        <div className="welcomeArea">
          <RoundedBox>
            <p className="title" style={{ marginBottom: '8px' }}>{`Bem-vindo(a) ${userinfo.name ?? githubUser}`}</p>
            <p style={{
              fontFamily: 'Verdana',
              fontSize: '12px',
              lineHeight: '15px',
              color: '#999999',
            }}
            >
              <span style={{ fontWeight: 700 }}>Sorte de hoje: </span>
              <span>{FortuneCookieMessage()}</span>
            </p>
            <OrkutNostalgicIconSet confiável={confiável} legal={legal} sexy={sexy} />
          </RoundedBox>
          <AlurakutActions
            handleClickCreateCommunity={
              (newCommunity) => setCommunities([...communities, newCommunity])
            }
          />
          <RoundedBox>
            <p className="subTitle">Depoimentos recebidos</p>
            {
              testimonials.length > 0
                ? testimonials.map(
                  (testimonial) => (
                    <TestimonialCard
                      from={testimonial.from}
                      text={testimonial.text}
                    />
                  ),
                )
                : <p>Você ainda não recebeu nenhum depoimento</p>
            }
          </RoundedBox>
        </div>
        <div className="profileRelationsArea">
          <ProfileRelations
            title="Meus amogos"
            dataArray={followers.map((follower) => (
              {
                imageUrl: follower.avatarUrl,
                label: follower.login,
                url: follower.htmlUrl,
              }
            ))}
          />
          <ProfileRelations
            title="Minhas comunidades"
            dataArray={communities.map((community) => (
              {
                imageUrl: community.imageUrl,
                label: community.title,
                url: community.imageUrl,
              }
            ))}
          />
        </div>
      </MainGrid>
    </>
  );
}

Home.propTypes = {
  githubUser: PropTypes.string.isRequired,
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch(urls.API_ALURAKUT.AUTH, {
    headers: {
      Authorization: cookies.USER_TOKEN,
    },
  })
    .then((response) => response.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);
  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { githubUser }, // will be passed to the page component as props
  };
}

export default Home;
