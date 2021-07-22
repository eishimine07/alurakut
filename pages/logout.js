import nookies from 'nookies';

function Logout() {}

export async function getServerSideProps(context) {
  nookies.destroy(context, 'USER_TOKEN');
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}

export default Logout;
