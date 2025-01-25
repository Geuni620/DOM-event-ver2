import { useEffect, useRef, useState } from 'react';
import { Modal } from 'reactstrap';

import { Button } from '@/components/ui/button';

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

export const ReactStrapModal: React.FC<ModalComponentProps> = ({
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

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, [isOpen]);

  useEffect(() => {
    console.log(
      '🔴 ReactStrapModal (Not Focusing) - useEffect, isOpen:',
      isOpen,
    ); // 1. isOpen 값 확인

    if (isOpen) {
      console.log(
        '🔴 ReactStrapModal (Not Focusing) - inputRef.current:',
        inputRef.current,
      ); // 2. inputRef.current 존재 여부
      console.log(
        '🔴 ReactStrapModal (Not Focusing) - inputRef.current.focus:',
        inputRef.current?.focus,
      ); // 3. focus() 함수 존재 여부

      inputRef.current?.focus();
      console.log(
        '🔴 ReactStrapModal (Not Focusing) - document.activeElement:',
        document.activeElement,
      ); // 4. focus() 호출 후, 현재 포커스된 요소
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      onOpened={() => {
        console.log('🟢 ReactStrapModal (Focusing?) - onOpened');
        console.log(
          '🟢 ReactStrapModal (Focusing?) - inputRef.current:',
          inputRef.current,
        );
        console.log(
          '🟢 ReactStrapModal (Focusing?) - inputRef.current.focus:',
          inputRef.current?.focus,
        );
        inputRef.current?.focus();
        console.log(
          '🟢 ReactStrapModal (Focusing?) - document.activeElement:',
          document.activeElement,
        );
      }}
    >
      <div className="min-w-[300px] rounded-lg bg-white p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div>
              <span>총 주문 수량: {totalCount}</span>
            </div>
            <input
              ref={inputRef}
              onChange={onScannedValueChange}
              value={scannedValue}
              className="mt-2 w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit">확인</Button>
            <Button type="button" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
