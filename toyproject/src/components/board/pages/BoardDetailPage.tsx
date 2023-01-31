import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BoardDetail from "../boardDetail/BoardDetail";
import SubjectTemplate from "../../SubjectTemplate";
import { boardIdentifier } from "../../../lib/formatting";

export default function BoardDetailPage() {
  const { subjectid } = useParams();
  const location = useLocation();
  const category = location.pathname.split("/")[2];

  return (
    <SubjectTemplate
      subject={subjectid as string}
      page='게시판'
      content={boardIdentifier(category)}
    >
      <BoardDetail></BoardDetail>
    </SubjectTemplate>
  );
}
