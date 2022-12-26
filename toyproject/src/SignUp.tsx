import {useState} from "react";
import ReactMarkdown from "react-markdown";
import "./SignUp.scss";
import {Term1, Term2, Term3} from "./TermsOfService.ts";


/** 이용 약관 */
interface Term {
    title: string,
    agreed: boolean,
    content: JSX.Element
}

// 학번 양식 (정규표현식)
const studentIdRegex: RegExp = /\d{4}-\d{5}/;

/** 회원 가입하는 유저 정보 양식 */
interface UserInfo {
    username: string,
    password: string,
    id: string,
}

export default function SignUp() {
    const [termsOfService, setTermsOfService] = useState<Term[]>([
        {
            title: "서울대학교 계정 관리 지침",
            agreed: false,
            content: <ReactMarkdown className="tos-content">{Term1}</ReactMarkdown>,
        },
        {
            title: "서울대학교 포털 운영 지침",
            agreed: false,
            content: <ReactMarkdown className="tos-content">{Term2}</ReactMarkdown>
        },
        {
            title: "개인정보 수집∙이용 및 제공에 대한 안내",
            agreed: false,
            content: <ReactMarkdown className="tos-content">{Term3}</ReactMarkdown>
        }
    ]);
    const [currentStage, setCurrentStage] = useState<number>(0);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: "",
        password: "",
        id: "",
    });

    return (
        <div className="signup-wrapper">
            <div className="tos-header all">
                <input type="checkbox" />
                <p className="tos-header-title all">서울대학교 운영지침과 개인정보 수집 및 이용에 모두 동의합니다.</p>
            </div>
            <div className="tos-header">
                <input type="checkbox"/>
                <p className="tos-header-title">{termsOfService[0].title}</p>
            </div>
            {termsOfService[0].content}
            <div className="tos-header">
                <input type="checkbox"/>
                <p className="tos-header-title">{termsOfService[1].title}</p>
            </div>
            {termsOfService[1].content}
            <div className="tos-header">
                <input type="checkbox"/>
                <p className="tos-header-title">{termsOfService[2].title}</p>
            </div>
            {termsOfService[2].content}
        </div>
    );
}
