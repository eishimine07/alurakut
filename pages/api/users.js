import urls from '@/constants/urls';

export default async function handler(request, response) {
  const { user } = request.query;

  const responseGithub = await fetch(urls.API_GITHUB.USERINFO.replace(':user', user));
  if (!responseGithub.ok) {
    response.status(404).json({
      message: 'Usuário não encontrado',
    });

    return;
  }

  const githubUser = await responseGithub.json();
  response.setHeader(
    'Cache-Control',
    'public, s-maxage=600',
  );

  response.json(githubUser);
}
