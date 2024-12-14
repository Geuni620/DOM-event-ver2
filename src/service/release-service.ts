type ReleaseResponse = {
  result_code: string;
  result: {
    goodsList: {
      orderCount: number;
    }[];
  };
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
};
