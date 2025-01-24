import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';

import { Button } from '@/components/ui/button';

const isEnterCommand = (value: string) => {
  const trimmedValue = value.trim();
  return /^enter$/i.test(trimmedValue);
};

type PortalModalProps = {
  isOpen: boolean;
  toggle: () => void;
  onConfirm: () => void;
  onReset: () => void;
  totalCount: number;
};

export const PortalModal: React.FC<PortalModalProps> = ({
  isOpen,
  toggle,
  onConfirm,
  onReset,
  totalCount,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scannedValue, setScannedValue] = useState('');

  useEffect(() => {
    if (isOpen && !elementRef.current) {
      const div = document.createElement('div');
      div.style.position = 'relative';
      div.style.zIndex = '1050';
      document.body.appendChild(div);
      elementRef.current = div;
      document.body.style.overflow = 'hidden';

      inputRef.current?.focus();
    }

    return () => {
      if (elementRef.current) {
        document.body.removeChild(elementRef.current);
        elementRef.current = null;
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !mounted) {
      setMounted(true);
    }
  }, [isOpen, mounted]);

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

  const modalContent = (
    <div
      ref={nodeRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
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
    </div>
  );

  if (!elementRef.current) return null;

  return createPortal(
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={300}
      unmountOnExit
      onEntered={() => {
        inputRef.current?.focus();
      }}
    >
      {(state) => modalContent}
    </Transition>,
    elementRef.current,
  );
};
