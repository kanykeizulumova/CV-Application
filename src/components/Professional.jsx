import { useState } from 'react'
import Input from './Input';

export default function Professional({ onClose, addProfessionalInfo, initialData }) {
    const [formData, setFormData] = useState({
        id: initialData?.id || '',
        title: initialData?.title || '',
        company: initialData?.company || '',
        startDate: initialData?.startDate || '',
        endDate: initialData?.endDate || '',
        functions: initialData?.functions || '',
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
        if (formData.title.trim() && formData.company.trim() && formData.startDate.trim() && formData.endDate.trim() && formData.functions.trim() && formData.city.trim() && formData.country.trim()) {
            addProfessionalInfo(formData);
            onClose();
        }
    };
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Professional Experience</h2>
                <Input label="Title/Position" name='title' value={formData.title} onChange={handleChange} type="text" />
                <Input label="Company" name='company' value={formData.company} onChange={handleChange} type="text" />
                <Input label="Start Date" name='startDate' value={formData.startDate} onChange={handleChange} type="date" />
                <Input label="End Date" name='endDate' value={formData.endDate} onChange={handleChange} type="date" />
                <Input label="Functions and achievements" name='functions' value={formData.functions} onChange={handleChange} type="text" />
                <Input label="Location (City, State)" name='city' value={formData.city} onChange={handleChange} type="text" />
                <button> + Add another</button>
                <button type='submit'>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
