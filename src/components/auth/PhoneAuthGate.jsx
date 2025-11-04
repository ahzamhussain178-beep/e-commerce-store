import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const PhoneAuthGate = () => {
  const { isVerified, requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState(0); // 0=phone,1=otp
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [devOtp, setDevOtp] = useState(null);
  const inputRefs = useRef([]);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);

  if (isVerified) return null;

  const sendOtp = async () => {
    setError('');
    // sanitize phone: keep digits and leading +
    const cleaned = (phone || '').replace(/[^+\d]/g, '');
    if (!cleaned || cleaned.length < 6) return setError('Please enter a valid phone number');
    setLoading(true);
    const res = await requestOtp(cleaned);
    setLoading(false);
    if (res?.success) {
      setDevOtp(res.devCode || null);
      setStep(1);
      setTimer(60);
      try { localStorage.setItem('lastOtpPhone', cleaned); if (res.devCode) localStorage.setItem('lastOtpCode', res.devCode); } catch (e) {}
      // auto-fill dev OTP for convenience in development
      if (res.devCode) {
        const digits = String(res.devCode).split('').slice(0, otpDigits.length);
        const filled = [...otpDigits];
        for (let i = 0; i < digits.length; i++) filled[i] = digits[i];
        setOtpDigits(filled);
      }
      // focus first OTP input on next tick
      setTimeout(() => { if (inputRefs.current[0]) inputRefs.current[0].focus(); }, 50);
      const t = setInterval(() => setTimer((s) => {
        if (s <= 1) { clearInterval(t); return 0; }
        return s - 1;
      }), 1000);
    } else setError(res?.message || 'Failed to send OTP');
  };

  const submitOtp = async () => {
    setError('');
    const code = otpDigits.join('').trim();
    if (code.length < 4) return setError('Enter the full OTP');
    setLoading(true);
    const cleaned = (phone || '').replace(/[^+\d]/g, '');
    const res = await verifyOtp(cleaned, code);
    setLoading(false);
    if (!res?.success) {
      setError(res?.message || 'Invalid OTP');
      // clear inputs for retry
      setOtpDigits(['', '', '', '', '', '']);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
      return;
    }
    // success — component will unmount because isVerified becomes true in context
  };

  // handle digit input behavior
  const onDigitChange = (idx, val) => {
    if (!/^[0-9]?$/.test(val)) return; // allow only single digit
    const next = [...otpDigits];
    next[idx] = val;
    setOtpDigits(next);
    if (val && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const onKeyDownDigit = (e, idx) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
  <div className="w-full max-w-md mx-4 bg-card rounded-lg border border-border p-6 shadow-2xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary p-2 rounded-md text-primary-foreground"><Icon name="Phone" size={18} /></div>
          <div>
            <h3 className="text-lg font-semibold">Sign in with your phone number</h3>
            <p className="text-sm text-muted-foreground">Enter your phone number to receive a one-time code.</p>
          </div>
        </div>

        {step === 0 && (
          <div className="space-y-3">
            <label className="block text-sm font-medium">Phone number</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-muted text-sm">+91</span>
              <input
                type="tel"
                value={phone.replace(/^\+?91\s?/, '+91 ')}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="flex-1 border border-border rounded-r-md px-3 py-2 bg-transparent text-foreground"
                aria-label="Phone number"
              />
            </div>

            {error && <div className="text-sm text-danger">{error}</div>}

            <div className="flex items-center justify-between">
              <Button variant="default" onClick={sendOtp} loading={loading}>Send OTP</Button>
              <button className="text-sm text-muted-foreground" onClick={() => { /* allow close? enforced gate */ }}>Need help?</button>
            </div>
            {devOtp && (
              <div className="mt-3 p-2 bg-muted rounded text-sm text-muted-foreground">
                <strong>Dev OTP:</strong> <span className="font-mono">{devOtp}</span>
                <div className="text-xs text-muted-foreground">This appears only in dev mode. In production you'll receive SMS.</div>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">We sent a one-time code to <strong>{phone}</strong></div>

            <div className="flex justify-center space-x-2">
              {otpDigits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  value={d}
                  onChange={(e) => onDigitChange(i, e.target.value)}
                  onKeyDown={(e) => onKeyDownDigit(e, i)}
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center border border-border rounded-md bg-transparent text-foreground text-lg font-mono"
                  aria-label={`OTP digit ${i + 1}`}
                />
              ))}
            </div>

            {error && <div className="text-sm text-danger">{error}</div>}

            {devOtp && (
              <div className="mt-2 p-2 bg-muted rounded text-sm text-muted-foreground text-center">
                <strong>Dev OTP:</strong> <span className="font-mono">{devOtp}</span>
                <div className="text-xs">Shown only in development. If you see nothing here, check the Network tab for /auth/request-otp response.</div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button variant="default" onClick={submitOtp} loading={loading}>Verify code</Button>
              <div className="text-sm text-muted-foreground">
                {timer > 0 ? `Resend in ${timer}s` : <button className="underline" onClick={sendOtp}>Resend</button>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneAuthGate;
