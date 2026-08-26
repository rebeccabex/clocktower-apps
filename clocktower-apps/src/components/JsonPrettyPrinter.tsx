import { useState, useMemo } from "react";
import { HighlightedJson } from "./HighlightedJson";
import { AlertCircle, Check, Copy } from "lucide-react";

type JsonPrettyPrinterProps = {
  input: string;
  indent?: number;
};

export const JsonPrettyPrinter = ({
  input,
  indent = 2,
}: JsonPrettyPrinterProps) => {
  const [copied, setCopied] = useState(false);

  const { formatted, error } = useMemo(() => {
    if (!input.trim()) return { formatted: "", error: null };
    try {
      const parsed = JSON.parse(input);
      return { formatted: JSON.stringify(parsed, null, indent), error: null };
    } catch (e: any) {
      return { formatted: null, error: e.message };
    }
  }, [input, indent]);

  const handleCopy = async () => {
    if (!formatted) return;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        maxWidth: "720px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          background: "#1F2430",
          border: "1px solid #2D3340",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderBottom: "1px solid #2D3340",
            background: "#191D26",
          }}
        >
          <span style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 600 }}>
            Formatted output
          </span>
          <button
            onClick={handleCopy}
            disabled={!formatted}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: formatted ? "#E5E7EB" : "#4B5563",
              background: "transparent",
              border: "1px solid #374151",
              borderRadius: "6px",
              padding: "4px 8px",
              cursor: formatted ? "pointer" : "not-allowed",
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div style={{ maxHeight: "480px", overflow: "auto" }}>
          {error ? (
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
                padding: "16px",
                color: "#FCA5A5",
                fontSize: "13px",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              <AlertCircle
                size={16}
                style={{ flexShrink: 0, marginTop: "1px" }}
              />
              <span>Invalid JSON: {error}</span>
            </div>
          ) : formatted ? (
            <HighlightedJson text={formatted} />
          ) : (
            <div
              style={{ padding: "16px", color: "#6B7280", fontSize: "13px" }}
            >
              Nothing to display yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
