import { useState, useRef } from 'react'
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import './App.css'
import General from './components/General'
import Professional from './components/Professional'
import Education from './components/Education'
import Skills from './components/Skills'


function App() {
  const targetRef = useRef();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [generalInfo, setGeneralInfo] = useState([]);
  const [professionalInfo, setProfessionalInfo] = useState([]);
  const [educationInfo, setEducationInfo] = useState([]);
  const [skillsInfo, setSkillsInfo] = useState([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [editingItem, setEditingItem] = useState(null);

  const downloadResume = () => {
    generatePDF(targetRef, {
      filename: 'resume.pdf',
      method: 'save',
      canvas: {
        qualityRatio: 1 // Улучшает четкость
      },
      page: {
        margin: Margin.MEDIUM,
        format: 'A4',
      }
    });
  };


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
      <button className='downloadButton' onClick={downloadResume}>Download CV</button>
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
        <div className="preview-section" ref={targetRef}>
          {isPreviewVisible && (
            <div className="preview-content">
              {/* HEADER SECTION */}
              {generalInfo.map((item) => (
                <div key={item.id} className="cv-header">
                  <h1>{item.firstName} {item.lastName}</h1>
                  <div className="cv-contact-info">
                    <span>{item.email}</span> | <span>{item.phone}</span> | <span>{item.city}, {item.country}</span>
                  </div>
                  <div className="item-actions">
                    <button className="edit-mini-btn" onClick={() => handleEdit(item, 0)}>Edit</button>
                  </div>
                </div>
              ))}

              {/* EDUCATION SECTION */}
              {educationInfo.length > 0 && <div className="cv-section-title">Education</div>}
              {educationInfo.map((item) => (
                <div key={item.id} className="cv-item">
                  <div className="cv-item-header">
                    <span>{item.school}</span>
                    <span>{item.startDate} — {item.graduationYear}</span>
                  </div>
                  <div className="cv-item-sub">
                    <span>{item.degree}</span>
                    <span>{item.city}</span>
                  </div>
                  <div className="item-actions">
                    <button className="edit-mini-btn" onClick={() => handleEdit(item, 1)}>Edit</button>
                    <button className="delete-mini-btn" onClick={() => deleteEducation(item.id)}>Delete</button>
                  </div>
                </div>
              ))}

              {/* PROFESSIONAL SECTION */}
              {professionalInfo.length > 0 && <div className="cv-section-title">Experience</div>}
              {professionalInfo.map((item) => (
                <div key={item.id} className="cv-item">
                  <div className="cv-item-header">
                    <span>{item.company}</span>
                    <span>{item.startDate} — {item.endDate}</span>
                  </div>
                  <div className="cv-item-sub">
                    <span>{item.title}</span>
                    <span>{item.city}</span>
                  </div>
                  <p className="cv-item-desc">{item.functions}</p>
                  <div className="item-actions">
                    <button className="edit-mini-btn" onClick={() => handleEdit(item, 2)}>Edit</button>
                    <button className="delete-mini-btn" onClick={() => deleteProfessional(item.id)}>Delete</button>
                  </div>
                </div>
              ))}

              {/* SKILLS SECTION */}
              {skillsInfo.length > 0 && <div className="cv-section-title">Skills</div>}
              {skillsInfo.map((item) => (
                <div key={item.id} className="cv-item">
                  <p>{item.skills}</p>
                  <div className="item-actions">
                    <button className="edit-mini-btn" onClick={() => handleEdit(item, 3)}>Edit</button>
                    <button className="delete-mini-btn" onClick={() => deleteSkills(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>
    </>
  )
}

export default App
