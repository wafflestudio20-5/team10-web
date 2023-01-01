import SubjectTemplate from "../SubjectTemplate";
import styles from "./ModulePage.module.scss";
import ModuleBlock from "./ModuleBlock";

export default function ModulePage() {
  return (
    <SubjectTemplate subject='컴퓨터구조' page='모듈'>
      <ModuleBlock />
    </SubjectTemplate>
  );
}
