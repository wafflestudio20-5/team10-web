import {useState} from "react";
import ReactMarkdown from "react-markdown";
import './global';
import styles from "./SignUp.module.css";

/** 이용 약관 (Single) */
interface Term {
    title: string,
    agreed: boolean,
    content: JSX.Element
}

/** 이용 약관 (전체) */
interface TermsOfService {
    term1: Term,
    term2: Term,
    term3: Term
}

// 학번 양식 (정규표현식)
const studentIdRegex: RegExp = /\d{4}-\d{5}/;

/** 회원 가입하는 유저 정보 양식 */
interface UserInfo {
    username: string,
    password: string,
    id: string,
}

const TermsOfService = () => {

}

export default function SignUp() {
    const [termsOfService, setTermsOfService] = useState<TermsOfService>({
        term1: {
            title: "서울대학교 계정 관리 지침",
            agreed: false,
            content: <ReactMarkdown>temporary</ReactMarkdown>,
        },
        term2: {
            title: "서울대학교 포털 운영 지침",
            agreed: false,
            content: <ReactMarkdown>temporary</ReactMarkdown>
        },
        term3: {
            title: "개인정보 수집∙이용 및 제공에 대한 안내",
            agreed: false,
            content: <ReactMarkdown>temporary</ReactMarkdown>
        }
    })
    const [currentStage, setCurrentStage] = useState<number>(0);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: "",
        password: "",
        id: "",
    })

}
