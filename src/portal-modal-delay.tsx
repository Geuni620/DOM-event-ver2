import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/button';

const isEnterCommand = (value: string) => {
  const trimmedValue = value.trim();
  return /^enter$/i.test(trimmedValue);
};

type PortalModalProps = {
  isOpen: boolean; // isOpen prop 추가
  toggle: () => void;
  onConfirm: () => void;
  onReset: () => void;
  totalCount: number;
};

export const PortalModalDelay: React.FC<PortalModalProps> = ({
  isOpen, // isOpen prop 사용
  toggle,
  onConfirm,
  onReset,
  totalCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [scannedValue, setScannedValue] = useState('');
  const [showModal, setShowModal] = useState(false); // 모달 렌더링 제어 상태

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
    if (isOpen) {
      setTimeout(() => {
        setShowModal(true);
      }, 350); // 350ms 지연 (react-strap Fade 애니메이션 시간과 유사하게)
    }
  }, [isOpen]);

  useEffect(() => {
    if (showModal) {
      inputRef.current?.focus();
    }
  }, [showModal]);

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
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

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot || !showModal) return null; // showModal이 false이면 null 반환

  return createPortal(modalContent, modalRoot);
};
