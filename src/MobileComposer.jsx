import React from 'react';
import { ArrowRight, Bookmark, Check, X } from 'lucide-react';
import Garment from './Garment';

export function MobileSelectionDock({ chosen, valid, onPreview, onClear }) {
  if (!chosen.length) return null;
  return (
    <section className="mobile-selection-dock" aria-label="선택한 코디" aria-live="polite">
      <button className="dock-clear" onClick={onClear} aria-label="모바일 선택 해제"><X size={18} /></button>
      <div className="dock-summary">
        <div className="dock-thumbnails" aria-hidden="true">{chosen.map(item => <Garment key={item.id} item={item} />)}</div>
        <div><strong>{chosen.length}개 선택</strong><span>{valid ? '마음에 드는 조합을 완성해보세요' : chosen.length === 1 ? (chosen[0].category === '하의' ? '함께 입을 상의를 골라주세요' : '함께 입을 하의를 골라주세요') : '레이어와 조합을 다시 확인해주세요'}</span></div>
      </div>
      <button className="dark" disabled={!valid} onClick={onPreview}>코디 보기 <ArrowRight size={15} /></button>
    </section>
  );
}

export function MobileLookPreview({ chosen, kit, items, onToggleKit, onSave }) {
  const extras = items.filter(item => !['상의', '하의'].includes(item.category) && item.status !== 'WISHLIST');
  return (
    <div className="mobile-look-preview">
      <div className="eyebrow">YOUR NEXT EVERYDAY LOOK</div>
      <h2>오늘의 나, 이렇게.</h2>
      <p className="muted">작은 디테일을 더하고, 마음에 드는 조합을 남겨보세요.</p>
      <div className="look-stage">{chosen.map(item => <div key={item.id}><Garment item={item} /><span>{item.name}</span></div>)}</div>
      <div className="look-kit-heading"><h3>함께할 스타일링 키트</h3><span>선택 {kit.length}</span></div>
      {extras.length ? <div className="look-kit-scroll">{extras.map(item => <button key={item.id} aria-label={`스타일링 키트 ${item.name}`} aria-pressed={kit.includes(item.id)} className={kit.includes(item.id) ? 'selected' : ''} onClick={() => onToggleKit(item.id)}><Garment item={item} /><span>{item.name}</span><i>{kit.includes(item.id) ? <Check size={12} /> : '+'}</i></button>)}</div> : <p className="muted">옷장에 신발이나 가방을 추가하면 함께 고를 수 있어요.</p>}
      <div className="sheet-save-action"><button className="dark full" onClick={onSave}>이 코디 저장하기 <Bookmark size={17} /></button></div>
    </div>
  );
}

export function MobileOutfitBrowser({ combos, board, items, onChoose }) {
  const options = [...combos.pairs, ...combos.paths];
  return (
    <div className="mobile-outfit-browser">
      <div className="eyebrow">MORE WAYS TO WEAR</div>
      <h2>내 옷으로, 다른 매일.</h2>
      <p className="muted">기본 조합 {combos.pairs.length}개 · 레이어링 {combos.paths.length}개<br />마음에 드는 조합을 누르면 보드에서 바로 선택돼요.</p>
      {options.length ? <div className="outfit-options">{options.map((path, index) => <button key={path.join('-')} onClick={() => onChoose(path)}><div>{path.map(slot => <Garment key={slot} item={items.find(item => item.id === board.slots[slot])} />)}</div><span><strong>LOOK {String(index + 1).padStart(2, '0')}</strong><small>{path.length === 3 ? '레이어링' : '기본 조합'}</small><ArrowRight size={15} /></span></button>)}</div> : <div className="empty"><p>보드에 상의와 하의를 추가해주세요.</p></div>}
    </div>
  );
}
