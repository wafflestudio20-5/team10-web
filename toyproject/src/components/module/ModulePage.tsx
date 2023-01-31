import SubjectTemplate from "../SubjectTemplate";
import ModuleBlock from "./ModuleBlock";
import { useParams } from "react-router-dom";

export default function ModulePage() {
  const { subjectid } = useParams();

  return (
    <SubjectTemplate subject={subjectid as string} page='모듈'>
      <ModuleBlock />
    </SubjectTemplate>
  );
}
