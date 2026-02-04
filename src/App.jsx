import { useState } from 'react'
import './App.css'
import General from './components/General'
import Professional from './components/Professional'
import Education from './components/Education'
import Skills from './components/Skills'


function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [generalInfo, setGeneralInfo] = useState([]);
  const [professionalInfo, setProfessionalInfo] = useState([]);
  const [educationInfo, setEducationInfo] = useState([]);
  const [skillsInfo, setSkillsInfo] = useState([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);


  const addGeneralInfo = (formData) => {
    const existingId = generalInfo.length > 0 ? generalInfo[0].id : crypto.randomUUID();

    const newItem = { id: existingId, ...formData };
    setGeneralInfo([newItem]);
  };

  const addProfessionalInfo = (formData) => {
    const exists = professionalInfo.find(item => item.id === formData.id);

    if (exists) {
      setProfessionalInfo(professionalInfo.map(item =>
        item.id === formData.id ? formData : item
      ));
    } else {
      const newItem = { ...formData, id: crypto.randomUUID() };
      setProfessionalInfo([...professionalInfo, newItem]);
    }
  };

  const addEducationInfo = (formData) => {
    const exists = educationInfo.find(item => item.id === formData.id);

    if (exists) {
      setEducationInfo(educationInfo.map(item =>
        item.id === formData.id ? formData : item
      ));
    } else {
      const newItem = { ...formData, id: crypto.randomUUID() };
      setEducationInfo([...educationInfo, newItem]);
    }
  };
  const addSkillsInfo = (formData) => {
    const exists = skillsInfo.find(item => item.id === formData.id);

    if (exists) {
      setSkillsInfo(skillsInfo.map(item =>
        item.id === formData.id ? formData : item
      ));
    } else {
      const newItem = { ...formData, id: crypto.randomUUID() };
      setSkillsInfo([...skillsInfo, newItem]);
    }
  };


  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };


  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const forms = [
    { id: 0, label: 'General', component: <General addGeneralInfo={addGeneralInfo} onClose={toggleForm} /> },
    { id: 1, label: 'Professional', component: <Professional addProfessionalInfo={addProfessionalInfo} onClose={toggleForm} /> },
    { id: 2, label: 'Education', component: <Education addEducationInfo={addEducationInfo} onClose={toggleForm} /> },
    { id: 3, label: 'Skills', component: <Skills addSkillsInfo={addSkillsInfo} onClose={toggleForm} /> }
  ];

  return (
    <>
      <h1 className='title'>Create your job-winning CV in just 5 minutes</h1>
      <button className='createCVButton' onClick={toggleForm}> {isFormVisible ? 'Hide form' : 'Create my resume'}</button>
      {isFormVisible && (
        <div className="form-step-container">
          {forms[activeIndex].component}

          <div className="navigation-buttons">
            <button
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex(activeIndex - 1)}
            >
              Back
            </button>

            <button
              disabled={activeIndex === forms.length - 1}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </button>

            <p>Step {activeIndex + 1} of {forms.length}</p>
          </div>
        </div>
      )}
      <button className='previewButton' onClick={togglePreview}>Preview CV</button>
      <button className='downloadButton'>Download CV</button>

    </>
  )
}

export default App
