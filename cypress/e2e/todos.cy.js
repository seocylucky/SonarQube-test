// describe(): Test suite, 테스트 케이스들의 모음(그룹화)
// it(): Test case, 개별 테스트 시나리오
describe("메인 페이지", () => {
  // 여기에 테스트 케이스들 모아두면 됨
  it("localhost:5173으로 접근하면 메인 페이지가 렌더링 된다.", () => {
    // Given - 테스트에 필요한 조건 세팅(현재는 없음)

    // When - ~~한 조건일 때,
    // cypress에게 하단 URL로 접근하도록 지정
    cy.visit("http://localhost:5173/"); // 특정 URL 페이지로 접근하는 메서드

    // Then - 그러면 ~~ 할 것이다.(검증)
    // 메인 페이지 내에 Todos 텍스트를 가진 h1 엘리먼트가 있는지
    cy.contains("h1", "Todos");
  });

  // 다른 테스트 케이스
  it("3개의 할일 목록이 렌더링 된다.", () => {
    cy.visit("http://localhost:5173/"); // 추후 beforeEach()로 리팩토링 가능

    // get(), 특정 HTML 엘리먼트를 취득할 때 사용
    cy.get("li").should("have.length", 3); // li가 3개 있는지
  });
});

describe("할일 관리", () => {
  // beforeEach(): 각 테스트 케이스 실행할 때마다 동일하게 수행할 코드
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    // 할일 모달 열기
    cy.contains("Add Todo").click(); // 해당 텍스트가 있는 엘리먼트 클릭
  });

  it("Todo 모달 창을 열고 닫을 수 있다.", () => {
    // 모달 배경 부분을 클릭해라
    cy.get('[data-cy="modal-backdrop"]').click({ force: true });
  });

  it.skip("새로운 Todo를 작성할 수 있다.", () => {
    cy.get("#title").type("커피 마시기"); // 키보드 입력
    cy.get("#summary").type("커피를 마신다");
    cy.get('[data-cy="modal-container"]').contains("Add").click();

    // 등록 버튼을 누르면 모달창이 닫혀있는 상태
    cy.get('[data-cy="modal-backdrop"]').should("not.exist");
    cy.get('[data-cy="modal-container"]').should("not.exist");
    cy.get("li").should("have.length", 4);
  });
});

// describe를 꼭 사용하지 않아도 됨
it("필터링 항목에 맞게 todo 목록들이 필터링된다.", () => {
  cy.visit("http://localhost:5173/");

  cy.get('[data-cy="todo-filter"]').select("TODO", { force: true });
  cy.get("li").should("have.length", 1);
  cy.get('[data-cy="todo-filter"]').select("PROGRESS");
  cy.get("li").should("have.length", 1); // 2로 바꿔서 fail되는지 확인
  cy.get('[data-cy="todo-filter"]').select("DONE");
  cy.get("li").should("have.length", 1);
  cy.get('[data-cy="todo-filter"]').select("ALL");
  cy.get("li").should("have.length", 3);
});
