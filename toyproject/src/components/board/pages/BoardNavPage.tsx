import BoardNav from "../boardNav/BoardNav";
import SubjectTemplate from "../../SubjectTemplate";
import { useParams } from "react-router-dom";

function BoardNavPage() {
  const { subjectid } = useParams();

  return (
    <SubjectTemplate
      subject={subjectid as string}
      page='게시판'
      content={undefined}
    >
      <BoardNav></BoardNav>
    </SubjectTemplate>
  );
}

export default BoardNavPage;
