import React from 'react';
import { YsGlobal } from '@global/handleGlobal';

const { chat } = YsGlobal.languageInfo;
const { question } = chat;

function QuestionItemTitle(props) {
  const { questionType, who, time } = props;
  return (
    <div className="question-item-title">
      <span className="question_name">{who}</span>
      <span className="question_time">{time}</span>
      {questionType === 'question' ? <span className="question-type question">{question.inspectStatus}</span> : null}
      {questionType === 'pass' ? <span className="question-type pass">{question.passOperation}</span> : null}
      {questionType === 'answer' ? <span className="question-type reply">{question.answerStatus}</span> : null}
    </div>
  );
}

export default QuestionItemTitle;
