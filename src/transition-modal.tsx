import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { Button } from '@/components/ui/button';

const duration = 300; // 300ms transition 시간 설정

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

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

export const TransitionModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  toggle,
  onConfirm,
  onReset,
  totalCount,
}) => {
  const nodeRef = useRef(null);
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
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={duration}
      unmountOnExit
      onEntered={() => {
        inputRef.current?.focus();
      }}
    >
      {(state) => (
        <div
          ref={nodeRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          style={{
            ...defaultStyle,
            ...transitionStyles[state as keyof typeof transitionStyles],
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
        </div>
      )}
    </Transition>
  );
};
