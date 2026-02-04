import { useState } from 'react'
import Input from './Input';

export default function Education({ onClose, addEducationInfo, initialData }) {
    const [formData, setFormData] = useState({
        id: initialData?.id || '',
        school: initialData?.school || '',
        degree: initialData?.degree || '',
        startDate: initialData?.startDate || '',
        graduationYear: initialData?.graduationYear || '',
        city: initialData?.city || '',
        country: initialData?.country || ''
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
        if (formData.degree.trim() && formData.school.trim() && formData.startDate.trim() && formData.graduationYear.trim() && formData.city.trim() && formData.country.trim()) {
            addEducationInfo(formData);
            onClose();
        }
    };
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Education</h2>
                <Input label="Degree(s)" name='degree' value={formData.degree} onChange={handleChange} type="text" />
                <Input label="Name of school/ institution" name='school' value={formData.school} onChange={handleChange} type="text" />
                <Input label="Start Date" name='startDate' value={formData.startDate} onChange={handleChange} type="date" />
                <Input label="Graduation year" name='graduationYear' value={formData.graduationYear} onChange={handleChange} type="date" />
                <Input label="Location (City, State)" name='city' value={formData.city} onChange={handleChange} type="text" />
                <button> + Add another</button>
                <button type='submit'>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

