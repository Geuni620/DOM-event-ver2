import { http, HttpResponse } from 'msw';

const mockMultiBoxListData = {
  result_code: '200',
  result: {
    goodsList: [
      {
        orderCount: 5,
      },
      {
        orderCount: 3,
      },
      {
        orderCount: 2,
      },
    ],
  },
};

export const handlers = [
  http.get('/api/release/check', ({ request }) => {
    const url = new URL(request.url);
    const invoiceNumber = url.searchParams.get('invoiceNumber');

    if (!invoiceNumber) {
      return new HttpResponse(null, { status: 400 });
    }

    if (invoiceNumber === '5120') {
      return HttpResponse.json(mockMultiBoxListData);
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
