import { SiteClient } from 'datocms-client';
import urls from '@/constants/urls';

export default async function handler(request, response) {
  const READONLY_TOKEN = 'ca4df6ecfff491de73dcb55c59549d';
  const FULL_TOKEN = 'e7cb4707c58ca71614633d36bd95a9';
  const MODEL_ID = '989915';

  if (request.method === 'POST') {
    const client = new SiteClient(FULL_TOKEN);

    if (!request.body.user) {
      response.status(401).json({
        message: 'Faça o login para continuar',
      });
    }

    if (!request.body.title || !request.body.imageUrl) {
      response.status(400).json({
        message: 'Campos "title" e "imageUrl" não podem estar vazio',
      });
    }

    const newCommunity = await client.items.create({
      itemType: MODEL_ID,
      ...request.body,
    });

    response.json({
      message: 'Comunidade adicionada',
      community: newCommunity,
    });

    return;
  }

  if (request.method === 'GET') {
    const { user } = request.query;

    fetch(urls.DATO_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${READONLY_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query {
          allCommunities(filter: { user: { eq: "${user}" } }) {
            title
            imageUrl
          }
        }`,
      }),
    })
      .then(async (res) => {
        const { data } = await res.json();

        response.json({
          communities: data.allCommunities,
        });
      });

    return;
  }

  response.status(404).json({
    message: 'Apenas método GET e POST',
  });
}
