import { Barcode } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'reactstrap';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ReleaseService } from '@/service/release-service';

// import { CopyReactStrapModal } from './copy-react-strap-modal.tsx';
import { ModalComponent as ModalDefault } from './modal';
// import Modal from './react-strap/strap-modal.jsx';
import { ReactStrapModal } from './react-strap-modal.tsx';

const isEnterCommand = (value: string) => {
  const trimmedValue = value.trim();
  return /^enter$/i.test(trimmedValue);
};

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
  const propsInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [response, setResponse] = useState<Response | null>(null);

  const [scannedValue, setScannedValue] = useState('');

  const onScannedValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScannedValue(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onInvoiceNumberReset = () => {
    setInvoiceNumber('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearchList(invoiceNumber);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEnterCommand(scannedValue)) {
      onConfirm();
      return;
    }

    toggleModal();
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    propsInputRef.current?.focus();
  }, [isModalOpen]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Barcode Scanner
        </h1>
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-2 placeholder:pl-10"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="Scan or enter barcode"
          />
          <Barcode
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </form>
        <button
          className="mt-4 w-full"
          onClick={() => onSearchList(invoiceNumber)}
          type="button"
        >
          Submit
        </button>
      </div>

      {/* ✅ */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
          <ModalDefault
            toggle={toggleModal}
            onConfirm={onConfirm}
            onReset={onInvoiceNumberReset}
            totalCount={response?.result.goodsList[0].orderCount || 0}
          />
        </Modal>
      )}

      {/* ❌ */}
      {/* {isModalOpen && (
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
          <div className="min-w-[300px] rounded-lg bg-white p-6">
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <div>
                  <span>
                    총 주문 수량:{' '}
                    {response?.result.goodsList[0].orderCount || 0}
                  </span>
                </div>
                <input
                  ref={propsInputRef}
                  onChange={onScannedValueChange}
                  value={scannedValue}
                  className="mt-2 w-full rounded border border-gray-300 p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="submit">확인</Button>
                <Button type="button" onClick={toggleModal}>
                  취소
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )} */}

      {/* ❌ */}
      {/* <ReactStrapModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        onConfirm={onConfirm}
        onReset={onInvoiceNumberReset}
        totalCount={response?.result.goodsList[0].orderCount || 0}
      /> */}
    </div>
  );
};
