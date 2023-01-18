import SubjectTemplate from "../SubjectTemplate";
import styles from "./ModulePage.module.scss";
import ModuleBlock from "./ModuleBlock";
import { useParams } from "react-router-dom";
import { useSubjectContext } from "../../context/SubjectContext";

export default function ModulePage() {
  const { subjectname } = useParams();
  const { curSubject } = useSubjectContext();

  return (
    <SubjectTemplate subject={subjectname as string} page='모듈'>
      <ModuleBlock />
    </SubjectTemplate>
  );
}
