import React from 'react';
import { ArrowRight, Bookmark, Check, Shirt, X } from 'lucide-react';
import Garment from './Garment';

export default function DesktopComposer({ chosen, valid, kit, items, count, onToggleKit, onClear, onBrowse, onSave }) {
  const extras = items.filter(item => !['상의', '하의'].includes(item.category) && item.status !== 'WISHLIST');
  return (
    <section className="desktop-composer" aria-label="코디 미리보기">
      <div className="desktop-composer-heading">
        <h2>코디 미리보기</h2>
        {chosen.length > 0 && <button onClick={onClear} aria-label="코디 선택 해제"><X size={21} /></button>}
      </div>
      {chosen.length ? <>
        <div className="desktop-look-stage">{chosen.map(item => <div key={item.id}><Garment item={item} /><span>{item.name}</span></div>)}</div>
        <p className="composer-hint" role="status">{valid ? '좋아요. 함께 입을 아이템을 더해보세요.' : chosen.length === 1 ? (chosen[0].category === '하의' ? '함께 입을 상의를 선택해주세요.' : '함께 입을 하의를 선택해주세요.') : '안팎으로 겹쳐 입을 수 있는 조합인지 확인해주세요.'}</p>
        {extras.length > 0 && <>
          <h3>함께 입는 아이템</h3>
          <div className="desktop-kit">{extras.map(item => <button key={item.id} aria-label={`함께 입는 아이템 ${item.name}`} aria-pressed={kit.includes(item.id)} className={kit.includes(item.id) ? 'selected' : ''} onClick={() => onToggleKit(item.id)}><Garment item={item} /><span>{item.name}</span>{kit.includes(item.id) && <i><Check size={15} /></i>}</button>)}</div>
        </>}
        <div className="desktop-composer-save"><button className="dark full" disabled={!valid} onClick={onSave}>이 코디 저장하기 <Bookmark size={19} /></button></div>
      </> : <div className="composer-empty"><Shirt size={48} strokeWidth={1} /><p>보드에서 상의와 하의를 고르면<br />여기에서 함께 볼 수 있어요.</p><span>사진도 옷도, 한곳에 모아서.</span></div>}
      <button className="composer-browse" onClick={onBrowse}>가능한 코디 {count}개 보기 <ArrowRight size={19} /></button>
    </section>
  );
}
