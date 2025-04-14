// icon 값만 내려받아서 동작하는 아이콘 버튼용 컴포넌트
export const IconButton = ({ icon, onClick }) => {
  return <button onClick={onClick}>{icon}</button>;
};
