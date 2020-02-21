console.log('Hello Webpack !');

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/stylesheets/style.scss";
import jsonData from "./data/card.json";
import Creator from "./Creator";
import Viewer from "./Viewer";

let stagiaireOptions = jsonData.stagiaires.map(stagiaire => ({ value: stagiaire, label: stagiaire }));

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "creator",
      greta: this.props.json.greta,
      teachers: this.props.json.teachers,
      education: this.props.json.education,
      sections: [],
      observation: "",
      selectedStagiaire: null,
    }

    this.handleOk = this.handleOk.bind(this);
    this.handleInProgress = this.handleInProgress.bind(this);
    this.handleKo = this.handleKo.bind(this);
    this.handleTextarea = this.handleTextarea.bind(this);
    this.displayWrapper = this.displayWrapper.bind(this);
  }

  componentDidMount() {
    let that = this;
    let newSections = [];
    
    that.props.json.sections.forEach(function (section, i) {
      let competences = [];

      section.competences.forEach(function (competence, id) {
        let compObj = {};
        compObj.id = `${i + 1}${id}`;
        compObj.bonus = competence.bonus ? competence.bonus : false;
        compObj.label = competence.label;
        compObj.coefficient = competence.coefficient;
        compObj.ko = false;
        compObj.inProgress = false;
        compObj.ok = false;

        competences.push(compObj);

        if(id + 1 === section.competences.length) {
          let sectionObj = {};
          sectionObj.id = i + 1;
          sectionObj.category = section.category;
          sectionObj.competences = competences;
          newSections.push(sectionObj);

          that.setState({ sections: newSections });
        }
      });
    });
  }

  handleToggleView() {
    if (this.state.view === "creator") {
      this.setState({view: "viewer"});
    } else {
      this.setState({view: "creator"});
    }
  }

  handleKo(id) {
    this.state.sections.forEach((section, indexSection) => {
      section.competences.forEach((competence, indexCompetence) => {
        if(competence.id === id) {
          let newState = this.state;
          newState.sections[indexSection].competences[indexCompetence] = {
            id: newState.sections[indexSection].competences[indexCompetence].id,
            bonus: newState.sections[indexSection].competences[indexCompetence].bonus,
            label: newState.sections[indexSection].competences[indexCompetence].label,
            coefficient: newState.sections[indexSection].competences[indexCompetence].coefficient,
            ok: false,
            inProgress: false,
            ko: !newState.sections[indexSection].competences[indexCompetence].ko
          }

          this.setState({...newState});
        }
      })
    });
  }

  handleOk(id) {
    this.state.sections.forEach((section, indexSection) => {
      section.competences.forEach((competence, indexCompetence) => {
        if(competence.id === id) {
          let newState = this.state;
          newState.sections[indexSection].competences[indexCompetence] = {
            id: newState.sections[indexSection].competences[indexCompetence].id,
            bonus: newState.sections[indexSection].competences[indexCompetence].bonus,
            label: newState.sections[indexSection].competences[indexCompetence].label,
            coefficient: newState.sections[indexSection].competences[indexCompetence].coefficient,
            ok: !newState.sections[indexSection].competences[indexCompetence].ok,
            inProgress: false,
            ko: false
          }

          this.setState({...newState});
        }
      })
    });
  }

  handleInProgress(id) {
    this.state.sections.forEach((section, indexSection) => {
      section.competences.forEach((competence, indexCompetence) => {
        if(competence.id === id) {
          let newState = this.state;
          newState.sections[indexSection].competences[indexCompetence] = {
            id: newState.sections[indexSection].competences[indexCompetence].id,
            bonus: newState.sections[indexSection].competences[indexCompetence].bonus,
            label: newState.sections[indexSection].competences[indexCompetence].label,
            coefficient: newState.sections[indexSection].competences[indexCompetence].coefficient,
            ok: false,
            inProgress: !newState.sections[indexSection].competences[indexCompetence].inProgress,
            ko: false
          }

          this.setState({...newState});
        }
      })
    });
  }

  handleTextarea(val) {
    this.setState({ observation: val });
  }

  displayWrapper() {
    if (this.state.view === "creator") {
      let { selectedStagiaire } = this.state;

      return (
        <div id="wrapper">
          <div id="creator">
            <Select 
              className="select"
              placeholder="Stagiaire"
              value={selectedStagiaire}
              options={stagiaireOptions} 
              onChange={(target) => this.handleChange(target)}
            />
            <Creator 
              handleKo={(id) => this.handleKo(id)}
              handleOk={(id) => this.handleOk(id)}
              handleInProgress={(id) => this.handleInProgress(id)}
              handleTextarea={(e) => this.handleTextarea(e)}
              view={this.state.view}
              sections={this.state.sections}
              observation={this.state.observation}
              handleToggleView={() => this.handleToggleView()} 
            />
          </div>

        </div>
      )
    } else {
      console.log(this.state.sections[0].competences[0]);
      return (
        <Viewer 
          {...this.state}
        />
      )
    }
  }

  handleChange(selectedStagiaire) {
    this.setState({ selectedStagiaire });
  }

  render() {
    return (
      <div>
        {this.displayWrapper()}
      </div>
    )
  }
};

const yieldNode = document.querySelector("#yield");

ReactDOM.render(
  <Card json={jsonData} />,
  yieldNode
);