import PostingBoard from "../boardNew/PostingBoard";
import SubjectTemplate from "../../SubjectTemplate";
import { useParams, useLocation } from "react-router-dom";
import { boardIdentifier } from "../../../lib/formatting";

export default function NewBoardPage() {
  const { subjectid } = useParams();
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  return (
    <SubjectTemplate
      subject={`${subjectid as string}`}
      page='게시판'
      content={boardIdentifier(category)}
    >
      <PostingBoard></PostingBoard>
    </SubjectTemplate>
  );
}
