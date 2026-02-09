import { useState } from 'react'
import { usePDF } from 'react-to-pdf';
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
  const [editingItem, setEditingItem] = useState(null);


  const addGeneralInfo = (formData) => {
    const existingId = generalInfo.length > 0 ? generalInfo[0].id : crypto.randomUUID();

    const newItem = { id: existingId, ...formData };
    setGeneralInfo([newItem]);
    setEditingItem(null);
    setIsPreviewVisible(true);
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
    setEditingItem(null);
    setIsPreviewVisible(true);
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
    setEditingItem(null);
    setIsPreviewVisible(true);
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
    setEditingItem(null);
    setIsPreviewVisible(true);
  };

  const handleEdit = (item, index) => {
    setEditingItem(item);
    setIsFormVisible(true);
    setActiveIndex(index);
  };
  const deleteGeneral = (id) => {
    setGeneralInfo(generalInfo.filter(item => item.id !== id));
  };

  const deleteEducation = (id) => {
    setEducationInfo(educationInfo.filter(item => item.id !== id));
  };

  const deleteProfessional = (id) => {
    setProfessionalInfo(professionalInfo.filter(item => item.id !== id));
  };

  const deleteSkills = (id) => {
    setSkillsInfo(skillsInfo.filter(item => item.id !== id));
  };


  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };


  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setEditingItem(null);
  };



  const forms = [
    { id: 0, label: 'General', component: <General addGeneralInfo={addGeneralInfo} onClose={toggleForm} data={editingItem} /> },
    { id: 1, label: 'Education', component: <Education addEducationInfo={addEducationInfo} onClose={toggleForm} data={editingItem} /> },
    { id: 2, label: 'Professional', component: <Professional addProfessionalInfo={addProfessionalInfo} onClose={toggleForm} data={editingItem} /> },
    { id: 3, label: 'Skills', component: <Skills addSkillsInfo={addSkillsInfo} onClose={toggleForm} data={editingItem} /> }
  ];

  return (
    <>
      <h1 className='title'>Create your job-winning CV in just 5 minutes</h1>
      <button className='createCVButton' onClick={toggleForm}> {isFormVisible ? 'Hide form' : 'Create my resume'}</button>
      <button className='previewButton' onClick={togglePreview}>Preview CV</button>
      <button className='downloadButton' onClick={exportToPdf}>Download CV</button>
      <div className="main-container">

        <div className="editor-section">
          {isFormVisible && (

            <div className="form-step-container">
              {forms[activeIndex].component}

              <div className="navigation-buttons">
                <button
                  disabled={activeIndex === 0 || editingItem !== null}
                  onClick={() => setActiveIndex(activeIndex - 1)}
                >
                  Back
                </button>

                <button
                  disabled={activeIndex === forms.length - 1 || editingItem !== null}
                  onClick={() => setActiveIndex(activeIndex + 1)}
                >
                  Next
                </button>

                <p>Step {activeIndex + 1} of {forms.length}</p>
              </div>
            </div>
          )}
        </div>
        <div className="preview-section">
          {isPreviewVisible && (
            <>
              <h3>My Resume Preview</h3>
              <div className="preview-content">
                {generalInfo.map((item) => (
                  <div key={item.id}>
                    <p>{item.firstName} {item.lastName}</p>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                    <p>{item.country}, {item.city}</p>
                    <button onClick={() => handleEdit(item, 0)}>Edit</button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this general entry?')) {
                          deleteGeneral(item.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {educationInfo.map((item) => (
                  <div key={item.id}> Education
                    <h2>{item.school}</h2>
                    <p>{item.degree}</p>
                    <p>{item.startDate}</p>
                    <p>{item.graduationYear}</p>
                    <p>{item.city}</p>
                    <button onClick={() => handleEdit(item, 1)}>Edit</button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this education entry?')) {
                          deleteEducation(item.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {professionalInfo.map((item) => (
                  <div key={item.id}> Professional Information
                    <h2>{item.company}</h2>
                    <p>{item.title}</p>
                    <p>{item.startDate}</p>
                    <p>{item.endDate}</p>
                    <p>{item.functions}</p>
                    <p>{item.city}</p>
                    <button onClick={() => handleEdit(item, 2)}>Edit</button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this professional entry?')) {
                          deleteProfessional(item.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {skillsInfo.map((item) => (
                  <div key={item.id}> Skills
                    <h2>{item.skills}</h2>
                    <button onClick={() => handleEdit(item, 3)}>Edit</button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this skills entry?')) {
                          deleteSkills(item.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>


      </div>
    </>
  )
}

export default App
