import { rest } from 'msw';

export const handlers = [
  rest.post('https://66f4d3fe77b5e889709a979c.mockapi.io/users', (req, res, ctx) => {
    return res(ctx.json({ message: 'Register successful!' }), ctx.status(200));
  }),
];

