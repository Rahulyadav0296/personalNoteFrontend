import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import {
  getPriorityBackgroundColor,
  getPriorityColor,
} from "../../utils/colors";

function Questions({ ques, onClick, expendableId }) {
  return (
    <div className="faq-header">
      <h4 className="faq-question">Question: {ques.question}</h4>
      <button
        className="faq-priority"
        style={{
          color: getPriorityColor(ques.priority),
          backgroundColor: getPriorityBackgroundColor(ques.priority),
        }}
      >
        <strong>Importance: {ques.priority}</strong>
      </button>
      <button className="toggle-btn" onClick={onClick}>
        {expendableId === ques._id ? (
          <ExpandMoreIcon />
        ) : (
          <KeyboardArrowUpIcon />
        )}
      </button>
    </div>
  );
}

export default Questions;
