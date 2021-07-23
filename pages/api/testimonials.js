import { SiteClient } from 'datocms-client';
import urls from '@/constants/urls';

export default async function handler(request, response) {
  const MODEL_ID = '1003029';

  if (request.method === 'POST') {
    const client = new SiteClient(process.env.DATO_TOKEN);

    if (!request.body.user) {
      response.status(401).json({
        message: 'Faça o login para continuar',
      });
    }

    if (!request.body.to || !request.body.text) {
      response.status(400).json({
        message: 'Campos "to" e "text" não podem estar vazio',
      });
    }

    const data = {
      to: request.body.to,
      text: request.body.text,
      from: request.body.user,
    };

    await client.items.create({
      itemType: MODEL_ID,
      ...data,
    });

    response.json({ message: 'Depoimento salvo' });

    return;
  }

  if (request.method === 'GET') {
    const { user } = request.query;

    fetch(urls.DATO_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.DATO_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query {
          allTestimonials(filter: { to: { eq: "${user}" } }) {
            text
            from
          }
        }`,
      }),
    })
      .then(async (res) => {
        const { data } = await res.json();

        response.json({
          testimonials: data.allTestimonials,
        });
      });

    return;
  }

  response.status(404).json({
    message: 'Apenas método GET e POST',
  });
}
