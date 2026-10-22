// Presentation labels stay separate from persisted data keys.
export const navigationLabels = { CAPSULE: '캡슐', CLOSET: '내 옷장', MY: '나의 취향' };
export const statusLabels = { KEEP: '계속 입기', REVIEW: '정리 고민', ARCHIVE: '따로 보관', WISHLIST: '추가 고려' };
export const statusLabel = value => statusLabels[value] || '상태 미정';
