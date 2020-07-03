import React, { useState } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import { emoticonToNull } from '../../utils';
import { translateAjax } from '../../service/ajax';
import Icon from '@components/Icon';

function QuestionItemText(props) {
  const { chat } = YsGlobal.languageInfo;
  const { question } = chat;
  const [strmsgToLanguage, setStrmsgToLanguage] = useState('');
  const [answer, setAnswer] = useState(null);

  const translateFn = () => {
    translateAjax(emoticonToNull(questionMsg))
      .then(res => {
        if (!res.strmsgToLanguage.length) return;
        setStrmsgToLanguage(res.strmsgToLanguage);
      })
      .catch(err => {
        console.warn(err);
      });
  };
  const translateFn2 = () => {
    translateAjax(emoticonToNull(answerMsg))
      .then(res => {
        if (!res.strmsgToLanguage.length) return;
        setAnswer(res.strmsgToLanguage);
      })
      .catch(err => {
        console.warn(err);
      });
  };
  const { questionType, questionMsg, answerMsg } = props;
  const questionTextInner = questionType === 'answer' ? answerMsg : questionMsg;

  return (
    <div className="question-item-text">
      <div className="to-answer">
        <p className="to-answer-cont">
          <span className="text"> {questionTextInner}</span>
          <Icon type="translate" onClick={['question', 'pass'].includes(questionType) ? translateFn : translateFn2} />
        </p>
        {answer ? <p className="remind-msg-innerHTML">{answer}</p> : null}
        {['question', 'pass'].includes(questionType) && strmsgToLanguage ? <p className="remind-msg-innerHTML">{strmsgToLanguage}</p> : null}
      </div>
      {questionType === ('answer' || 'pass') ? (
        <p className="to-question">
          {/* <Icon type="translate" onClick={translateFn} /> */}
          <span className="question_inner">
            {question.sendStatus}: {questionMsg}
            {strmsgToLanguage ? <span className="remind-msg-innerHTML">{strmsgToLanguage}</span> : null}
          </span>
        </p>
      ) : null}
    </div>
  );
}

export default QuestionItemText;
