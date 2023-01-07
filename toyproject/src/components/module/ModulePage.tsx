import SubjectTemplate from "../SubjectTemplate";
import styles from "./ModulePage.module.scss";
import ModuleBlock from "./ModuleBlock";
import { useParams } from "react-router-dom";

export default function ModulePage() {
  const { subjectname } = useParams();
  return (
    <SubjectTemplate subject={subjectname as string} page='모듈'>
      <ModuleBlock />
    </SubjectTemplate>
  );
}
