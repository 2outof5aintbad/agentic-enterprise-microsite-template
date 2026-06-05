"use client";

import { useEffect } from "react";
import { ACCOUNT } from "@/data/account";

declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      settings: { language: string };
      init: (
        orgId: string,
        deploymentDevName: string,
        orgUrl: string,
        config: { scrt2URL: string }
      ) => void;
    };
  }
}

export default function AgentforceChat() {
  const config = ACCOUNT.agentforce;
  const orgId             = config?.orgId ?? "";
  const deploymentDevName = config?.deploymentDevName ?? "";
  const orgUrl            = config?.orgUrl ?? "";
  const scrt2Url          = config?.scrt2Url ?? "";

  useEffect(() => {
    if (!config) return;
    if (window.embeddedservice_bootstrap) return;

    const onLoad = () => {
      window.embeddedservice_bootstrap!.settings.language = "en_US";
      window.embeddedservice_bootstrap!.init(
        orgId,
        deploymentDevName,
        orgUrl,
        { scrt2URL: scrt2Url }
      );
    };

    const script = document.createElement("script");
    script.src = `${orgUrl}/assets/js/bootstrap.min.js`;
    script.async = true;
    script.onload = onLoad;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [config, orgId, deploymentDevName, orgUrl, scrt2Url]);

  if (!config) return null;

  return (
    <style>{`
      /* Position the Salesforce button bottom-right and style it to match brand */
      embeddedservice-chat-button {
        position: fixed !important;
        bottom: 1.5rem !important;
        right: 1.5rem !important;
        z-index: 50 !important;
      }
      embeddedservice-chat-button button,
      embeddedservice-chat-button .embeddedServiceSidebarButton {
        background-color: var(--brand-primary) !important;
        font-family: var(--font-body), sans-serif !important;
        border-radius: 9999px !important;
        font-size: 0.875rem !important;
        font-weight: 700 !important;
        padding: 0.75rem 1.25rem !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.35) !important;
      }
    `}</style>
  );
}
