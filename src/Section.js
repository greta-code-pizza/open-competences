import React, { Component } from "react";
import Competence from "./Competence";
import Subtitle from "./Subtitle";

class Section extends Component {

  constructor(props) {
    super(props);
  }

  displayCompetences() {
    let aryCompetences = [];
    this.props.competences.forEach(competence => {
      aryCompetences.push(
        <Competence 
          key={competence.id} 
          {...competence} 
          handleOk={(id) => this.props.handleOk(id)}
          handleInProgress={(id) => this.props.handleInProgress(id)}
          handleKo={(id) => this.props.handleKo(id)}
        />
      );
    });

    return aryCompetences;
  }

  render() {
    const { category } = this.props;

    return (
      <div id="section">
        <h2 className="title title-category">{category}</h2>
        <Subtitle className="title title-competence" />
        {this.displayCompetences()}
      </div>
    )
  }
};

export default Section;