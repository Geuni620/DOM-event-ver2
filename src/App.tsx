import { Barcode } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ModalComponent } from 'src/react-strap-modal';

import { Button } from '@/components/ui/button';
import { ReleaseService } from '@/service/release-service';

type Response = {
  result_code: string;
  result: {
    goodsList: {
      orderCount: number;
    }[];
  };
};

export const App = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [response, setResponse] = useState<Response | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onInvoiceNumberReset = () => {
    setInvoiceNumber('');
  };

  const onSearchList = async (invoiceNumber: string) => {
    if (invoiceNumber.trim() === '') {
      toast.error('운송장 번호를 입력해주세요.');
      return;
    }

    try {
      const res = await ReleaseService.getInvoiceInfo(invoiceNumber);

      if (res.result_code === '200') {
        setResponse(res);
        toggleModal();
        return;
      }

      onInvoiceNumberReset();
      setResponse(null);
      toast.error('Event has not been created');
      return;
    } catch (error) {
      toast.error('Failed to fetch invoice info');
      onInvoiceNumberReset();
      return;
    }
  };

  const onConfirm = () => {
    navigate('/release/check', {
      state: {
        invoiceNumber,
      },
    });
  };

  /**
   * @fixme
   * 해당 부분은 변경
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Barcode Scanner
        </h1>
        <div className="relative">
          <input
            ref={inputRef}
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-2 placeholder:pl-10"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onSearchList(invoiceNumber);
              }
            }}
            placeholder="Scan or enter barcode"
          />
          <Barcode
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <Button
          className="mt-4 w-full"
          onClick={() => onSearchList(invoiceNumber)}
        >
          Submit
        </Button>
      </div>

      {isModalOpen && (
        <ModalComponent
          isModalOpen={isModalOpen}
          toggle={toggleModal}
          onConfirm={onConfirm}
          onReset={onInvoiceNumberReset}
          totalCount={response?.result.goodsList[0].orderCount || 0}
        />
      )}
    </div>
  );
};
