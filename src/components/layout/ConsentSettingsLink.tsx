"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: (tcData: { gdprApplies?: boolean } | null, success: boolean) => void
    ) => void;
    googlefc?: {
      callbackQueue?: Array<unknown>;
      showRevocationMessage?: () => void;
    };
  }
}

interface ConsentSettingsLinkProps {
  label: string;
  className?: string;
}

export function ConsentSettingsLink({
  label,
  className,
}: ConsentSettingsLinkProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const googlefc = (window.googlefc = window.googlefc || {});
    googlefc.callbackQueue = googlefc.callbackQueue || [];
    googlefc.callbackQueue.push({
      CONSENT_API_READY: () => {
        if (!window.__tcfapi) {
          setIsReady(false);
          return;
        }

        window.__tcfapi("addEventListener", 0, (tcData, success) => {
          setIsReady(Boolean(success && tcData?.gdprApplies));
        });
      },
    });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const googlefc = window.googlefc;
        if (!googlefc?.showRevocationMessage) return;

        if (googlefc.callbackQueue) {
          googlefc.callbackQueue.push(googlefc.showRevocationMessage);
          return;
        }

        googlefc.showRevocationMessage();
      }}
    >
      {label}
    </button>
  );
}
