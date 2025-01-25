import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import Modal from './react-strap/strap-modal';

const isEnterCommand = (value: string) => {
  const trimmedValue = value.trim();
  return /^enter$/i.test(trimmedValue);
};

type ModalComponentProps = {
  isOpen: boolean;
  toggle: () => void;
  onConfirm: () => void;
  onReset: () => void;
  totalCount: number;
};

export const CopyReactStrapModal: React.FC<ModalComponentProps> = ({
  isOpen,
  toggle,
  onConfirm,
  onReset,
  totalCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [scannedValue, setScannedValue] = useState('');

  const onScannedValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScannedValue(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEnterCommand(scannedValue)) {
      onConfirm();
      return;
    }

    handleCancel();
  };

  const handleCancel = () => {
    toggle();
    onReset();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <form onSubmit={handleSubmit}>
        <div>
          <span>총 주문 수량: {totalCount}</span>
        </div>
        <input
          ref={inputRef}
          onChange={onScannedValueChange}
          value={scannedValue}
          className="mt-2 w-full rounded border border-gray-300 p-2"
        />

        <Button type="submit">확인</Button>
        <Button type="button" onClick={handleCancel}>
          취소
        </Button>
      </form>
    </Modal>
  );
};
