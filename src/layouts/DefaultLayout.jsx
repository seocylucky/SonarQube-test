// 기본적인 레이아웃 전체 구조를 잡아주는 컴포넌트
export const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="m-full h-full overflow-y-scroll bg-slate-500">
        <div className="max-w-xl mx-auto min-w-[20rem]">{children}</div>
      </div>
    </>
  );
};
