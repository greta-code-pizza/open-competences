import React, { Component } from "react";

class Subtitle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="subtitle">
        <span className="table table-label">Compétence</span>
        <span className="table table-coef">Coefficient</span>
        <span className="table table-ko">Non acquis</span>
        <span className="table table-progress">En cours d'acquisition</span>
        <span className="table table-ok">Acquis</span>
      </div>
    )
  }
};

export default Subtitle;