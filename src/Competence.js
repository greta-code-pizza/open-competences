import React, { Component } from "react";

import cross from "assets/images/cross.png";

class Competence extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { 
      label, 
      coefficient, 
      id,
      ok,
      inProgress,
      ko,
      bonus 
    } = this.props;
    
    return (
      <div id="competences" className={bonus ? "bonus" : ""}>
        <span className="table table-label">{label}</span>
        <span className="table table-coef">{coefficient}</span>
        <span className="table table-ko" onClick={() => this.props.handleKo(id)} >{ko ? <img className='picto picto-cross' src={cross} alt="carte cadeau"  /> : ""}</span>
        <span className="table table-progress" onClick={() => this.props.handleInProgress(id)}>{inProgress ? <img className='picto picto-cross' src={cross} alt="carte cadeau"  /> : ""}</span>
        <span className="table table-ok" onClick={() => this.props.handleOk(id)}>{ok ? <img className='picto picto-cross' src={cross} alt="carte cadeau"  /> : ""}</span>
      </div>
    )
  }
};

export default Competence;