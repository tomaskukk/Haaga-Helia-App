import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import "./css/lukkari.css";
import "./css/components.css";
import rightArrowPic from "../img/arrowRight.png";
import leftArrowPic from "../img/arrowLeft.png";
import strings from "./Langstrings";

const Lukkari = ({
  handleLukkariChange,
  lukkariState,
  handler,
  groupId,
  waitMessage,
  handleWeekChange
}) => {
  // response from lukkarikone is html so lets clear unused functions
  // so we dont get errors in console

  let changedHtml = lukkariState.replace(
    "<table ",
    '<table class="table table table-responsive-lg',
    'table-striped table-bordered table-hover"'
  );
  changedHtml = changedHtml.replace(/src/g, "ref");
  changedHtml = changedHtml.replace(
    /viewEvent/g,
    "console.log(event.target.textContent);console.log"
  );

  const lukkariParts = changedHtml.split("</style>");

  if (!lukkariParts[1]) {
    lukkariParts[1] =
      "<div><h3>Trying to fetch data from Lukkarikone</h3></div></br>";
  }

  return (
    <div id="lukkari">
      <Form
        className="lukkariForm"
        onSubmit={event => {
          handleLukkariChange(event, groupId);
        }}
      >
        <FormGroup id="lukkariFormGroup">
          <Form.Label>{strings.groupid}</Form.Label>
          <FormControl
            id="groupInput"
            type="text"
            name="groupId"
            value={groupId}
            onChange={handler}
            placeholder={strings.eg}
          />
        </FormGroup>
        <Button id="searchButton" variant="primary" type="submit">
          {strings.searchButton}
        </Button>
      </Form>

      <Form inline className="justify-content-between">
        <img
          src={leftArrowPic}
          id="previousWeekButton"
          alt="Previous"
          className="weekArrowLeft"
          onClick={() => handleWeekChange("previous")}
        ></img>
        <h5 id="moodleHelpText">{waitMessage}</h5>
        <img
          src={rightArrowPic}
          id="nextWeekButton"
          alt="Next"
          className="weekArrowRight"
          onClick={() => handleWeekChange("next")}
        ></img>
      </Form>
      <div
        id="lukkariToSave"
        dangerouslySetInnerHTML={{ __html: lukkariParts[1] }}
      ></div>
    </div>
  );
};

export default Lukkari;
