import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

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

export const ModalComponent: React.FC<ModalComponentProps> = ({
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

  // #1 useEffect → ❌
  // useEffect(() => {
  //   inputRef.current?.focus();
  //   console.log('inputRef.current?.focus()', inputRef.current);
  // }, []);

  // #2 useEffect + setTimeout → ✅
  // useEffect(() => {
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // }, []);

  // #3 useLayoutEffect → ❌
  // useLayoutEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  // #4 requestAnimationFrame → ✅
  // useEffect(() => {
  //   requestAnimationFrame(() => {
  //     inputRef.current?.focus();
  //   });
  // }, []);

  // #5 promise → ✅
  // useEffect(() => {
  //   Promise.resolve().then(() => {
  //     inputRef.current?.focus();
  //   });
  // }, []);

  return (
    <Modal
      // fade={false}
      // onOpened={() => {
      //   inputRef.current?.focus();
      // }}
      // onEnter={() => {
      //   inputRef.current?.focus();
      // }}
      // setFocus={() => {
      //   inputRef.current?.focus();
      // }}
      isOpen={isOpen}
      toggle={toggle}
      fade={false}
    >
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div>
            <span>총 주문 수량: {totalCount}</span>
          </div>
          <input
            ref={inputRef}
            onChange={onScannedValueChange}
            value={scannedValue}
            className="mt-2 w-full rounded border border-gray-300 p-2"
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit">확인</Button>
          <Button type="button" onClick={handleCancel}>
            취소
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
