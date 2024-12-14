type ReleaseResponse = {
  result_code: string;
  result: {
    goodsList: {
      orderCount: number;
    }[];
  };
};

type Product = {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
};

export const ReleaseService = {
  async getInvoiceInfo(invoiceNumber: string): Promise<ReleaseResponse> {
    const response = await fetch(
      `/api/release/check?invoiceNumber=${invoiceNumber}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch invoice info');
    }

    return response.json();
  },

  async getProductInfo(barcode: string): Promise<Product[]> {
    const response = await fetch(`/api/products/${barcode}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product info');
    }

    return response.json();
  },
};
