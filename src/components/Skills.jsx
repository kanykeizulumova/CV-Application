import { useState } from 'react'
import Input from './Input';

export default function Skills({ onClose, addSkillsInfo, initialData }) {
    const [formData, setFormData] = useState({
        id: initialData?.id || '',
        skills: initialData?.skills || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.skills.trim()) {
            addSkillsInfo(formData);
            onClose();
        }
    };
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Skills</h2>
                <Input label="Skills" name='skills' value={formData.skills} onChange={handleChange} type="text" />
                <button> + Add another</button>
                <button type='submit'>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
