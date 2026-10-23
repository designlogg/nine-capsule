import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, Check, ImagePlus, Maximize2, X } from 'lucide-react';

function PhotoViewer({ image, onClose }) {
  const panel = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    const app = document.getElementById('root');
    const previousInert = app?.inert;
    if (app) app.inert = true;
    panel.current?.querySelector('button')?.focus();
    return () => { if (app) app.inert = previousInert; if (previous?.isConnected) previous.focus(); };
  }, []);
  const onKeyDown = event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose(); }
    if (event.key === 'Tab') {
      event.stopPropagation();
      const buttons = panel.current.querySelectorAll('button');
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  };
  return createPortal(
    <div className="photo-viewer-backdrop" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={panel} className="photo-viewer" role="dialog" aria-modal="true" aria-labelledby={titleId} onKeyDown={onKeyDown}>
        <div className="photo-viewer-heading"><h2 id={titleId}>옷 사진 확인</h2><button type="button" onClick={onClose} aria-label="사진 확인 닫기"><X size={25} /></button></div>
        <img src={image} alt="등록할 옷 사진 크게 보기" />
        <button className="dark" type="button" onClick={onClose}>사진 확인 완료 <Check size={20} /></button>
      </section>
    </div>, document.body
  );
}

export default function PhotoField({ value, onChange, onBusyChange }) {
  const camera = useRef(null), library = useRef(null);
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [enlarged, setEnlarged] = useState(false);
  const processFile = async event => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) { setError('15메가바이트 이하 사진을 골라주세요.'); return; }
    setError(''); setBusy(true); onBusyChange?.(true);
    const url = URL.createObjectURL(file);
    try {
      const image = new Image(); image.src = url; await image.decode();
      const scale = Math.min(1, 900 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      onChange(canvas.toDataURL('image/jpeg', .82));
    } catch { setError('사진을 읽지 못했어요. 다른 사진을 골라주세요.'); }
    finally { URL.revokeObjectURL(url); setBusy(false); onBusyChange?.(false); }
  };
  return (
    <div className="photo-field" aria-busy={busy}>
      {value ? <button className="photo-field-preview" type="button" onClick={() => setEnlarged(true)} aria-label="옷 사진 크게 보기"><img src={value} alt="등록할 옷 사진" /><span><Maximize2 size={18} /> 크게 보기</span></button> : <div className="photo-field-empty"><Camera size={36} strokeWidth={1.3} /><p>옷 사진을 남겨보세요</p></div>}
      <div className="photo-field-actions">
        <button type="button" className="outline" disabled={busy} onClick={() => camera.current.click()}><Camera size={20} /> 촬영하기</button>
        <button type="button" className="outline" disabled={busy} onClick={() => library.current.click()}><ImagePlus size={20} /> 사진 고르기</button>
      </div>
      <input ref={camera} type="file" accept="image/*" capture="environment" aria-label="촬영할 사진" onChange={processFile} hidden />
      <input ref={library} type="file" accept="image/*" aria-label="옷 사진 선택" onChange={processFile} hidden />
      <p className="photo-field-note" aria-live="polite">{busy ? '사진을 준비하고 있어요…' : '사진은 이 기기에만 저장돼요.'}</p>
      {error && <p role="alert" className="error">{error}</p>}
      {enlarged && <PhotoViewer image={value} onClose={() => setEnlarged(false)} />}
    </div>
  );
}
