import React from "react";
import AssignmentBlock from "./AssignmentBlock";
import styles from "./AssignmentPage.module.scss";
import SubjectTemplate from "../SubjectTemplate";

export default function AssignmentPage() {
  return (
    <SubjectTemplate
      subject='컴퓨터구조'
      page='과제'
      content='과제3'
    ></SubjectTemplate>
  );
}
