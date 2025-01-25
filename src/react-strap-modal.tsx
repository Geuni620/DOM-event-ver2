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
  // }, [isOpen]);

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
  //   console.log('requestAnimationFrame');
  // }, []);

  // #5 promise → ✅
  // useEffect(() => {
  //   Promise.resolve().then(() => {
  //     inputRef.current?.focus();
  //   });
  // }, []);

  // #6 MutationObserver → ✅
  // useEffect(() => {
  //   const observer = new MutationObserver(() => {
  //     inputRef.current?.focus();
  //     observer.disconnect();
  //   });
  //   observer.observe(document.body, { childList: true, subtree: true });
  //   return () => observer.disconnect();
  // }, []);

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, [isOpen]);

  // useEffect(() => {
  //   requestAnimationFrame(() => {
  //     inputRef.current?.focus();
  //     console.log('requestAnimationFrame', inputRef.current);
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
      // trapFocus={false}

      isOpen={isOpen}
      toggle={toggle}
      fade={false}
      trapFocus={false}
      // onOpened={() => {
      //   inputRef.current?.focus();
      // }}
    >
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div>
            <span>총 주문 수량: {totalCount}</span>
          </div>
          <input
            ref={inputRef}
            autoFocus
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

/**
 * useEffect로 실행했지만, Modal의 내부는 조건부로 렌더링 된다<div className="ref가 input에 무착돼 있지만 조건부에 의해 렌더링 되지 않을 것
 */
