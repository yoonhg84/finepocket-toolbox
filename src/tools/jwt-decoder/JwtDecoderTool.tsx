"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import {
  decodeJwt,
  isExpired,
  formatTimestamp,
  relativeTime,
  CLAIM_DESCRIPTIONS,
  TIMESTAMP_CLAIMS,
} from "./logic";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

function JsonPanel({
  title,
  data,
  showClaimDescriptions,
}: {
  title: string;
  data: Record<string, unknown>;
  showClaimDescriptions?: boolean;
}) {
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-400 font-mono">
          {"{ }"}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto">
        <div className="space-y-1.5">
          {entries.map(([key, value]) => {
            const isTimestamp =
              showClaimDescriptions &&
              TIMESTAMP_CLAIMS.has(key) &&
              typeof value === "number";

            return (
              <div key={key} className="group">
                <div className="flex items-start gap-2 font-mono text-sm">
                  <span className="text-purple-600 font-medium shrink-0">
                    &quot;{key}&quot;
                  </span>
                  <span className="text-gray-400">:</span>
                  <span className="text-blue-700 break-all">
                    {typeof value === "string"
                      ? `"${value}"`
                      : JSON.stringify(value)}
                  </span>
                </div>

                {/* Timestamp display */}
                {isTimestamp && (
                  <div className="ml-4 mt-0.5 text-xs text-gray-500">
                    {formatTimestamp(value as number)}{" "}
                    <span className="text-gray-400">
                      ({relativeTime(value as number)})
                    </span>
                  </div>
                )}

                {/* Claim description */}
                {showClaimDescriptions && CLAIM_DESCRIPTIONS[key] && (
                  <div className="ml-4 mt-0.5 text-xs text-gray-400">
                    {CLAIM_DESCRIPTIONS[key]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function JwtDecoderTool() {
  const [token, setToken] = useState("");

  const decoded = useMemo(() => decodeJwt(token), [token]);

  const expired = useMemo(
    () =>
      decoded.payload && typeof decoded.payload.exp === "number"
        ? isExpired(decoded.payload)
        : null,
    [decoded.payload]
  );

  const payloadJson = useMemo(
    () =>
      Object.keys(decoded.payload).length > 0
        ? JSON.stringify(decoded.payload, null, 2)
        : "",
    [decoded.payload]
  );

  const loadSample = () => {
    setToken(SAMPLE_JWT);
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="jwt-input"
            className="text-sm font-medium text-gray-700"
          >
            JWT Token
          </label>
          <button
            onClick={loadSample}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            Load Sample
          </button>
        </div>
        <textarea
          id="jwt-input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT here (eyJhbGciOiJIUz...)"
          className="w-full h-28 p-3 font-mono text-sm border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white break-all"
          spellCheck={false}
        />
      </div>

      <ErrorMessage message={decoded.error ?? null} />

      {/* Expiration badge */}
      {expired !== null && !decoded.error && (
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              expired
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {expired ? "Expired" : "Valid"}
          </span>
          {typeof decoded.payload.exp === "number" && (
            <span className="text-xs text-gray-500">
              {expired ? "Token expired" : "Token expires"}{" "}
              {relativeTime(decoded.payload.exp as number)}
            </span>
          )}
        </div>
      )}

      {/* Decoded sections */}
      {token.trim() && !decoded.error && (
        <div className="space-y-4">
          {/* Header */}
          <JsonPanel title="Header" data={decoded.header} />

          {/* Payload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Payload</h3>
              {payloadJson && (
                <CopyButton text={payloadJson} label="Copy Payload" />
              )}
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto">
              <div className="space-y-1.5">
                {Object.entries(decoded.payload).map(([key, value]) => {
                  const isTimestamp =
                    TIMESTAMP_CLAIMS.has(key) && typeof value === "number";

                  return (
                    <div key={key}>
                      <div className="flex items-start gap-2 font-mono text-sm">
                        <span className="text-purple-600 font-medium shrink-0">
                          &quot;{key}&quot;
                        </span>
                        <span className="text-gray-400">:</span>
                        <span className="text-blue-700 break-all">
                          {typeof value === "string"
                            ? `"${value}"`
                            : JSON.stringify(value)}
                        </span>
                      </div>

                      {isTimestamp && (
                        <div className="ml-4 mt-0.5 text-xs text-gray-500">
                          {formatTimestamp(value as number)}{" "}
                          <span className="text-gray-400">
                            ({relativeTime(value as number)})
                          </span>
                        </div>
                      )}

                      {CLAIM_DESCRIPTIONS[key] && (
                        <div className="ml-4 mt-0.5 text-xs text-gray-400">
                          {CLAIM_DESCRIPTIONS[key]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Signature */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Signature
            </h3>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <code className="text-sm font-mono text-gray-600 break-all">
                {decoded.signature || "—"}
              </code>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Signature verification requires the signing secret or public key
              and is not performed client-side.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
