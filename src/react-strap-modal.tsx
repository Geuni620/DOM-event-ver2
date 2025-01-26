import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

// import { Modal } from 'reactstrap';
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
  //   if (isOpen) {
  //     console.time('useEffect');
  //     inputRef.current?.focus();
  //     console.timeEnd('useEffect');
  //   }
  // }, [isOpen]);

  // useEffect(() => {
  //   if (isOpen) {
  //     requestAnimationFrame(() => {
  //       console.time('animationFrame');
  //       inputRef.current?.focus();
  //       console.timeEnd('animationFrame');
  //     });
  //   }
  // }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      autoFocus={true}
      // autoFocus={false}
      // onOpened={() => {
      //   console.time('opened');
      //   inputRef.current?.focus();
      //   console.timeEnd('opened');
      // }}
    >
      <div className="min-w-[300px] rounded-lg bg-white p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div>
              <span>총 주문 수량: {totalCount}</span>
            </div>
            <input
              ref={(node) => {
                if (node) {
                  inputRef.current = node;

                  console.time('callback-ref-focus');
                  node.focus();
                  console.timeEnd('callback-ref-focus');
                }
              }}
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
