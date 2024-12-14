import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReleaseService } from '@/service/release-service';

interface Product {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const ReleaseCheck: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { barcode } = useParams<{ barcode: string }>();

  const [product, setProduct] = useState<Product[]>([]);
  const [inspectionNote, setInspectionNote] = useState('');

  const handleInspectionComplete = (status: 'approved' | 'rejected') => {
    if (status === 'approved') {
      alert('승인되었습니다.');
      return;
    }

    alert('거부되었습니다.');
    return;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (barcode) {
        const fetchedProduct = await ReleaseService.getProductInfo(barcode);

        setProduct(fetchedProduct);
      }
    };

    fetchProduct();
  }, [barcode]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!product) {
    return <div className="mt-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">상품 검수</h1>
        <div className="mb-4">
          {product.map(({ id, name, status }) => (
            <div key={id}>
              <h2 className="text-lg font-semibold">상품 정보:</h2>
              <p>ID: {id}</p>
              <p>이름: {name}</p>
              <p>상태: {status}</p>
            </div>
          ))}
        </div>
        <Input
          ref={inputRef}
          className="mb-4"
          value={inspectionNote}
          onChange={(e) => setInspectionNote(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleInspectionComplete('approved');
            }
          }}
          placeholder="검수 노트를 입력하세요"
        />
        <div className="flex justify-between">
          <Button
            onClick={() => handleInspectionComplete('approved')}
            className="mr-2 flex-1"
          >
            승인
          </Button>
          <Button
            onClick={() => handleInspectionComplete('rejected')}
            className="ml-2 flex-1"
            variant="destructive"
          >
            거부
          </Button>
        </div>
      </div>
    </div>
  );
};
