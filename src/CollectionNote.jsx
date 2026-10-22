import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CollectionNote({ onExplore }) {
  return (
    <section className="collection-note" aria-label="나의 취향 발견">
      <div>
        <span>나의 취향 발견</span>
        <h2>입을수록,<br />나를 닮아가는 옷.</h2>
        <button onClick={onExplore}>내 취향 찾기 <ArrowUpRight size={16} /></button>
      </div>
      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=85" alt="옷과 소품이 정돈된 작은 편집숍" loading="lazy" />
    </section>
  );
}
