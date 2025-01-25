import React from 'react';
import { CSSTransition } from 'react-transition-group';

type FadeProps = {
  in: boolean;
  children: React.ReactNode;
  timeout?: number;
};

export const Fade: React.FC<FadeProps> = ({
  in: inProp,
  children,
  timeout = 150,
}) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={timeout}
      classNames="fade"
      unmountOnExit
      mountOnEnter
      appear
    >
      <div>{children}</div>
    </CSSTransition>
  );
};
