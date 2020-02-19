import React, { Component } from "react";
import Section from "./Section";

class Creator extends Component {

  constructor(props) {
    super(props);
  }

  displaySections() {
    let arySections = [];
    this.props.sections.forEach(section => {
      arySections.push(
        <Section 
          key={section.category} 
          {...section} 
          handleOk={(id) => this.props.handleOk(id)}
          handleInProgress={(id) => this.props.handleInProgress(id)}
          handleKo={(id) => this.props.handleKo(id)}
        />
      );
    });

    return arySections;
  }

  render() {
    return (
      <div>
        {this.displaySections()}
        <textarea id="observation" defaultValue="Observations" onChange={(e) => this.props.handleTextarea(e.target.value)} value={this.props.observation}></textarea>
        <button type="button" className="btn btn-primary" placeholder="Observations" onClick={() => this.props.handleToggleView()} >Ouvrir le PDF</button>
      </div>
    )
  }
};

export default Creator;