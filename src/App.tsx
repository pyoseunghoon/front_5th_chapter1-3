import React, {useCallback, useState} from "react";
import { generateItems } from "./utils";
import { Header } from "./components/Header.tsx";
import { ItemList } from "./components/ItemList.tsx";
import { ComplexForm } from "./components/ComplexForm.tsx";
import { NotificationSystem } from "./components/NotificationSystem.tsx";
import { ThemeProvider, useThemeContext } from "./store/ThemeContext.tsx";
import { UserProvider } from "./store/UserContext.tsx";
import { NotificationProvider } from "./store/NotificationContext.tsx";


/** 
 * InnerApp 컴포넌트를 분리한 이유: Context 설정하는 부분과 UI 렌더링 부분을 분리하고 싶었음..
 * 기능자체는 문제가 없어보이지만 유지보수에 있어서는 책임과 역할이 다르기 때문에 분리하는 것으로 결정
 * 
 */

const InnerApp: React.FC = () => {
  const { theme } = useThemeContext();
  const [items, setItems] = useState(generateItems(1000));

  // InnerApp이 렌더링되면 안에있는 ItemList도 필요없이 렌더링되는걸 막기위해
  // 의존성배열을 빈배열로.. 처음 렌더링시 한번만 정의되면됨
  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
      <div className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={addItems} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
  );
};

// Context를 분리하려고 하니 Provider를 중첩된 구조로 짜게됨...
// 이 중첩 구조의 순서가 맞는것인지.... 일단 각 Provider에서 다른 Provider의 context를 사용하지
// 않아.. 순서는 상관없는것 같다..
const App: React.FC = () => (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <InnerApp />
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
);

export default App;
