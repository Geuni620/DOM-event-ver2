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

const mockProductData = [
  {
    id: '5120',
    name: '상품 5120',
    status: 'pending',
  },
  {
    id: '5121',
    name: '상품 5121',
    status: 'pending',
  },
  {
    id: '5122',
    name: '상품 5122',
    status: 'pending',
  },
];

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

  http.get('/api/products/:barcode', ({ params }) => {
    const { barcode } = params;

    if (barcode === '5120') {
      return HttpResponse.json(mockProductData);
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
