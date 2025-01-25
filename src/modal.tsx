import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const isEnterCommand = (value: string) => {
  const trimmedValue = value.trim();
  return /^enter$/i.test(trimmedValue);
};

type ModalComponentProps = {
  toggle: () => void;
  onConfirm: () => void;
  onReset: () => void;
  totalCount: number;
};

export const ModalComponent = React.forwardRef<
  HTMLInputElement,
  ModalComponentProps
>(({ toggle, onConfirm, onReset, totalCount }, ref) => {
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
    console.time('modal-focus');
    console.log('🔵 ModalComponent (Focusing?) - ref:', ref);
    if (typeof ref !== 'function' && ref?.current) {
      ref.current.focus();
    }
    console.log(
      '🔵 ModalComponent (Focusing?) - document.activeElement:',
      document.activeElement,
    );
    console.timeEnd('modal-focus');
  }, [ref]);

  return (
    <div className="">
      <div className="min-w-[300px] rounded-lg bg-white p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div>
              <span>총 주문 수량: {totalCount}</span>
            </div>
            <input
              ref={ref}
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
    </div>
  );
});

ModalComponent.displayName = 'ModalComponent';
