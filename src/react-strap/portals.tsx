import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

export const Portals = ({ children }: PortalProps) => {
  const [portalNode] = useState(() => {
    const node = document.createElement('div');
    return node;
  });

  useEffect(() => {
    document.body.appendChild(portalNode);

    return () => {
      document.body.removeChild(portalNode);
    };
  }, [portalNode]);

  return createPortal(children, portalNode);
};
