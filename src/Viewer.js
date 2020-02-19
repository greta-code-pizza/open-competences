import React, { Component } from "react";
import { 
  PDFViewer, 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet,
  Image 
} from '@react-pdf/renderer';

import greta from "./assets/images/logo-greta.png";

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF'
  },
  header: {
    width: '100%',
    flexDirection: 'row'
  },
  logoWrapper: {
    flexDirection: 'column',
    width: "25vw",
    padding: "2vw",
  }, 
  logo: {
    height: "90px",
    width: "110px",
    display: "inline-block"
  }, 
  gretaWrapper: {
    flexDirection: 'column',
    width: "75vw",
    paddingLeft: "40vw"
  },
  gretaTitle: {
    marginTop: "10px",
    color: "#009bc3",
    fontSize: 14
  },
  gretaAgency: {
    fontWeight: "bold",
    fontSize: 12
  },
  gretaAddress: {
    fontSize: 12
  },
  gretaCity: {
    fontSize: 12
  },
  gretaPhone: {
    fontWeight: "bold",
    fontSize: 12
  },
  educationWrapper: {
    flexDirection: 'column',
    width: "100vw",
    textAlign: "center"
  },
  educationSubtitle: {
    color: '#009bc3',
    fontSize: 14
  },
  stagiaireWrapper: {
    padding: "10px"
  },
  stagiaire: {
    fontSize: 12
  },
  sectionWrapper: {
    width: '100%'
  },
  sectionContainer: {
    marginBottom: '10px',
  },
  sectionCategory: {
    width: '100%',
    padding: "10px",
    display: "block",
    color: "#FFF",
    backgroundColor: '#009bc3'
  },
  subtitle: {
    flexDirection: 'row',
    width: "100%",
    padding: "5px 10px",
    color: "#014556",
    backgroundColor: "#abecfc",
    fontSize: 10,
  },
  subtitleCompetences: {
    flexDirection: 'column',
    width: "35vw",
    textAlign: "center"
  },
  subtitleCoeff: {
    flexDirection: 'column',
    width: "15vw",
    textAlign: "center"
  },
  subtitleScore: {
    flexDirection: 'column',
    width: "15vw",
    textAlign: "center"
  },
  table: {
    flexDirection: 'row',
    width: "100%",
    padding: "2px 10px",
    color: "#014556",
    backgroundColor: "#dbf6fc",
    fontSize: 8,
  },
  tableBonus: {
    flexDirection: 'row',
    width: "100%",
    padding: "2px 10px",
    color: "#014556",
    backgroundColor: "#99fcaa",
    fontSize: 8,
  },
  tableLabel: {
    flexDirection: 'column',
    width: "35vw",
  },
  tableCoeff: {
    flexDirection: 'column',
    width: "15vw",
    textAlign: "center"
  },
  tableScore: {
    flexDirection: 'column',
    width: "15vw",
    textAlign: "center",
    fontSize: 18
  },
  observationWrapper: {
    padding: "0 10px"
  },
  observationTitle: {
    fontSize: 12
  },
  observationContent: {
    padding: "10px",
    backgroundColor: "#dbf6fc",
    fontSize: 11
  },
  teachersWrapper: {
    marginTop: "10px",
    padding: "0 10px"
  },
  teachersTitle: {
    fontSize: 12
  }, 
  teacher: {
    fontSize: 11
  },
  infosWrapper: {
    marginTop: "10px",
    padding: "0 10px"
  },
  infosBonus: {
    display: "inline-block",
    backgroundColor: "#99fcaa"
  }
});

class Viewer extends Component {
  constructor(props) {
    super(props);
  }

  displaySections() {
    let sections = [];
    this.props.sections.forEach(section => {
      
      sections.push(
        <View style={styles.sectionContainer}>
          <View className="category" style={styles.sectionCategory}>
            <Text>{section.category}</Text>
          </View> 
          <View className="subtitle" style={styles.subtitle}>
            <Text style={styles.subtitleCompetences}>Compétence</Text>
            <Text style={styles.subtitleCoeff}>Coefficient</Text>
            <Text style={styles.subtitleScore}>Non acquis</Text>
            <Text style={styles.subtitleScore}>En cours</Text>
            <Text style={styles.subtitleScore}>Acquis</Text>
          </View>
          {this.getCompetences(section)}
        </View>
      )
    });

    return sections;
  }

  getCompetences(section) {
    let competences = [];

    section.competences.forEach(competence => {
      
      competences.push(
        <View style={competence.bonus ? styles.tableBonus : styles.table}>
            <Text style={styles.tableLabel}>{competence.label}</Text>
            <Text style={styles.tableCoeff}>{competence.coefficient}</Text>
            {this.displayCross(competence.ko)}
            {this.displayCross(competence.inProgress)}
            {this.displayCross(competence.ok)}
        </View>
      )
    });

    return competences;
  }

  displayCross(competence) {
    if(competence) { 
      return <Text style={styles.tableScore}>•</Text> 
    } else {
      return <Text style={styles.tableScore}> </Text> 
    };
  }

  displayTeachers() {
    let teachers = [];

    this.props.teachers.forEach(teacher => {
      teachers.push(
        <Text style={styles.teacher}>{teacher}</Text>
      )
    })

    return teachers
  }

  render() {
    return (
      <PDFViewer id="pdf-viewer">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <View style={styles.logoWrapper}>
                <Image style={styles.logo} src={greta} />
              </View>
              <View style={styles.gretaWrapper}>
                <Text style={styles.gretaTitle}>{this.props.greta.title}</Text> 
                <Text style={styles.gretaAgency}>{this.props.greta.agency}</Text> 
                <Text style={styles.gretaAddress}>{this.props.greta.address}</Text> 
                <Text style={styles.gretaCity}>{this.props.greta.zip} {this.props.greta.city}</Text> 
                <Text style={styles.gretaPhone}>{this.props.greta.phone}</Text> 
              </View>
            </View>
            <View style={styles.educationWrapper}>
              <Text style={styles.educationTitle}>{this.props.education.title}</Text> 
              <Text style={styles.educationSubtitle}>{this.props.education.subtitle}</Text> 
            </View>
            <View style={styles.stagiaireWrapper}>
              <Text style={styles.stagiaire}>{`Stagiaire : ${this.props.selectedStagiaire.value}`}</Text> 
            </View>
            <View style={styles.sectionWrapper}>
              {this.displaySections()}
            </View>

            <View style={styles.observationWrapper}>
              <Text style={styles.observationTitle}>Observations :</Text>
              <Text style={styles.observationContent}>{this.props.observation}</Text>
            </View>

            <View style={styles.teachersWrapper}>
              <Text style={styles.teachersTitle}>Jury composé de :</Text>
              {this.displayTeachers()}
            </View>

            <View style={styles.infosWrapper}>
              <Text style={styles.infosBonus}>Points bonus</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
};

export default Viewer;