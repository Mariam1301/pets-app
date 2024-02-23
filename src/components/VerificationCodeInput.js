import React from 'react';

export default function VerificationCodeInput({ onCodeChange }) {
  return (
    <input
      type="text"
      onChange={(e) => onCodeChange(e.target.value)}
      placeholder="Verification Code"
      className="input input-bordered w-full max-w-xs"
    />
  );
}
