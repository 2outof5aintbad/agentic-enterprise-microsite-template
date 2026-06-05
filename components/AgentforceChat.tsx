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
  const orgId = config?.orgId ?? "";
  const deploymentDevName = config?.deploymentDevName ?? "";
  const orgUrl = config?.orgUrl ?? "";
  const scrt2Url = config?.scrt2Url ?? "";
  const label = config?.label ?? "Ask Agentforce";

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
      document.body.removeChild(script);
    };
  }, [config, orgId, deploymentDevName, orgUrl, scrt2Url]);

  if (!config) return null;

  return (
    <>
      {/* Custom launch button — Salesforce will also render its own button,
          but this gives us brand-consistent placement above it */}
      <style>{`
        .embeddedServiceHelpButton .helpButton .uiButton {
          background-color: var(--brand-primary) !important;
          font-family: var(--font-body), sans-serif !important;
        }
        .embeddedServiceHelpButton .helpButton .uiButton .helpButtonLabel .message {
          font-size: 0.8rem !important;
        }
        /* Hide default Salesforce button — we use our own branded one */
        embeddedservice-chat-button {
          display: none !important;
        }
      `}</style>

      {/* Branded floating button */}
      <button
        onClick={() => {
          // New Messaging for In-App & Web uses embeddedservice_bootstrap directly
          try {
            const el = document.querySelector<HTMLElement>(
              "embeddedservice-chat-button, .embeddedServiceHelpButton button, .helpButton .uiButton"
            );
            if (el) {
              el.click();
            } else {
              // Fallback: dispatch the event the bootstrap listener expects
              window.dispatchEvent(new CustomEvent("onEmbeddedMessagingReady"));
              // Try finding the shadow DOM button
              const host = document.querySelector<HTMLElement>("embeddedservice-chat-button");
              host?.shadowRoot?.querySelector<HTMLElement>("button")?.click();
            }
          } catch (e) {
            console.error("Agentforce button error:", e);
          }
        }}
        aria-label={label}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full shadow-2xl text-white text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        style={{ background: "var(--brand-primary)" }}
      >
        {/* Agentforce sparkle icon */}
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 2l1.8 4.2 4.2 1.8-4.2 1.8L10 14l-1.8-4.2L4 8l4.2-1.8L10 2z" fill="white" opacity="0.9"/>
          <path d="M16 13l.9 2.1 2.1.9-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z" fill="white" opacity="0.6"/>
        </svg>
        {label}
      </button>
    </>
  );
}
