import BoardList from "../boardList/BoardList";
import SubjectTemplate from "../../SubjectTemplate";
import { useParams } from "react-router-dom";

export default function NoticeBoardPage() {
  const { subjectid } = useParams();

  return (
    <SubjectTemplate subject={`${subjectid}`} page='게시판' content={"공지"}>
      {/* props전달하여 boardlist 컴포넌트 재사용 하기 */}
      <BoardList category='announcements'></BoardList>
    </SubjectTemplate>
  );
}
