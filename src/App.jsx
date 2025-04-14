import TodoBody from "./components/todos/TodoBody";
import TodoHeader from "./components/todos/TodoHeader";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { TodoProvider } from "../contexts/TodoContext";
import { Button } from "woori-design";
import { FloatButton } from "woori-design";
import { theme } from "woori-design";

function App() {
  return (
    // About children prop - 합성 vs 상속(https://ko.legacy.reactjs.org/docs/composition-vs-inheritance.html)
    <DefaultLayout>
      {/* DefaultLayout 자식 요소(children)로 Counter 컴포넌트를 전달 */}
      <header>
        <h1>Todos</h1>
        <Button size="xlarge">gkdldldld</Button>
        <FloatButton
          icon="❓"
          color={theme.semantic.color.alert.alert}
          position="center"
          size="large"
          onClick={() => alert("Help clicked!")}
        />
        <h1 className="pt-8 mx-auto text-red-200 max-w-max text-7xl">
          <img
            className="ml-4"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thought%20Balloon.png"
            alt="Thought Balloon"
            width="75"
            height="75"
          />
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Seal.png"
            alt="Seal"
            width="75"
            height="75"
          />
        </h1>
      </header>

      <section className="max-w-xl m-4 mx-auto">
        <TodoProvider>
          {/* todo Header - 할 일 추가, 필터링 UI */}
          <TodoHeader />
          {/* todo Body - 할 일 목록 UI */}
          <TodoBody />
        </TodoProvider>
      </section>
    </DefaultLayout>
  );
}

export default App;
