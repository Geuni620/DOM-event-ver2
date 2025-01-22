import { useEffect, useRef, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

/** 상위에서 두 모달을 각각 제어할 Compare 컴포넌트 */
export function CompareModalExample() {
  const [isOpenUseEffect, setIsOpenUseEffect] = useState(false);
  const [isOpenOnOpened, setIsOpenOnOpened] = useState(false);

  const toggleUseEffect = () => setIsOpenUseEffect(!isOpenUseEffect);
  const toggleOnOpened = () => setIsOpenOnOpened(!isOpenOnOpened);

  return (
    <div style={{ padding: 20 }}>
      <h3>Compare how focus works:</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button color="primary" onClick={toggleUseEffect}>
          Open Modal (useEffect)
        </Button>
        <Button color="success" onClick={toggleOnOpened}>
          Open Modal (onOpened)
        </Button>
      </div>

      {/* 1) useEffect로 focus를 시도하는 모달 */}
      <ModalUsingUseEffect isOpen={isOpenUseEffect} toggle={toggleUseEffect} />

      {/* 2) onOpened 콜백으로 focus를 시도하는 모달 */}
      <ModalUsingOnOpened isOpen={isOpenOnOpened} toggle={toggleOnOpened} />
    </div>
  );
}

/** 케이스 1) useEffect로 input focus */
function ModalUsingUseEffect({ isOpen, toggle }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // 모달 열림 시점에 맞춰 input에 focus 시도
      inputRef.current?.focus();
      console.log('ModalUsingUseEffect: focus tried', inputRef.current);
    }
  }, [isOpen]);

  return (
    <Modal
      autoFocus={false} // Reactstrap이 기본 포커스하는 동작 OFF
      isOpen={isOpen}
      toggle={toggle}
      fade={false}
    >
      <ModalHeader toggle={toggle}>Modal Using useEffect</ModalHeader>
      <ModalBody>
        <p>이 Modal은 "useEffect"로 input에 포커스합니다.</p>
        <input ref={inputRef} placeholder="Focus me useEffect" />
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

/** 케이스 2) onOpened 콜백으로 input focus */
function ModalUsingOnOpened({ isOpen, toggle }) {
  const inputRef = useRef(null);

  return (
    <Modal
      autoFocus={false} // Reactstrap이 기본 포커스하는 동작 OFF
      isOpen={isOpen}
      toggle={toggle}
      fade={false}
      onOpened={() => {
        // 모달이 "완전히 열린 뒤" (애니메이션/DOM 셋업 등 완료 후) 호출되는 콜백
        inputRef.current?.focus();
        console.log(
          'ModalUsingOnOpened: focus from onOpened',
          inputRef.current,
        );
      }}
    >
      <ModalHeader toggle={toggle}>Modal Using onOpened</ModalHeader>
      <ModalBody>
        <p>이 Modal은 "onOpened" 콜백으로 input에 포커스합니다.</p>
        <input ref={inputRef} placeholder="Focus me onOpened" />
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
