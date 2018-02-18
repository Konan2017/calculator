import '../style/style.scss';
import Calculator from './models/Calculator';
import Window from './Window';

export default function creator(element) {
  const calculator = new Calculator();
  // calculator 모델을 주입함. 이로써 Window 뷰 객체는 Calculator의
  // 인터페이스에 의존하게 되며, 추후 공학계산기용 calculator 객체를 생성
  // 주입하여 공학계산 모드를 지원할 수 있음.
  const window = new Window(element, calculator);
  return window;
}
