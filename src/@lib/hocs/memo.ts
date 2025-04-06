/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
//  React 컴포넌트의 타입을 정의할 때 사용하는 제네릭 타입
// 컴포넌트가 받을 수 있는 props 타입을 자동으로 추론해주는 유용한 타입
import { ComponentType } from "react";

// 현재 jsx를 자동변환해주는 것이 없어 사용 x
// function renderComponent<P>(Component: ComponentType<P>, props: P) {
//   return <Component {...props} />;
// }

// 컴포넌트 자체를 메모이제이션
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let previousProps: P;

  // console.log('memo');
  // console.log('memo comp', Component);
  return function MemoizedComponent(props: P) {
    // console.log('memo props', props);
    if (_equals(previousProps, props)) {
      return null;
    }

    previousProps = props;
    // props가 변경된 경우, 컴포넌트를 렌더링
    return React.createElement(Component, props);
  };
}
