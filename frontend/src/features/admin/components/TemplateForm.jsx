import { useState } from 'react';

const certificateTypes = [
    { value: 'offer-letter', label: 'Offer Letter' },
    { value: 'bonafide', label: 'Bonafide Certificate' },
    { value: 'training', label: 'On-the-Job Training Certificate' },
    { value: 'experience', label: 'Experience Letter' },
    { value: 'completion', label: 'Internship Completion Certificate' },
    { value: 'intern-of-the-month', label: 'Intern of the Month Certificate' },
    { value: 'league-winner', label: 'League Winner Certificate' },
];

const emptyValues = {
    templateName: '',
    certificateType: '',
    content: '',
};

export default function TemplateForm({ template, onSubmit, onCancel, submitting, error }) {
    const [values, setValues] = useState(() => (template ? {
        templateName: template.templateName || '',
        certificateType: template.certificateType || '',
        content: template.content || '',
    } : emptyValues));
    const [validationError, setValidationError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((current) => ({ ...current, [name]: value }));
        setValidationError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!values.templateName.trim() || !values.certificateType || !values.content.trim()) {
            setValidationError('Complete all template fields before saving.');
            return;
        }

        await onSubmit({
            templateName: values.templateName.trim(),
            certificateType: values.certificateType,
            content: values.content.trim(),
        });

        if (!template) {
            setValues(emptyValues);
        }
    };

    const selectedTypeExists = certificateTypes.some((type) => type.value === values.certificateType);

    return (
        <form className="template-form" onSubmit={handleSubmit}>
            <div className="template-form-grid">
                <label className="template-field">
                    <span>Template name</span>
                    <input
                        name="templateName"
                        value={values.templateName}
                        onChange={handleChange}
                        placeholder="e.g. Internship Completion"
                        disabled={submitting}
                    />
                </label>

                <label className="template-field">
                    <span>Certificate type</span>
                    <select
                        name="certificateType"
                        value={values.certificateType}
                        onChange={handleChange}
                        disabled={submitting}
                    >
                        <option value="">Select a certificate type</option>
                        {!selectedTypeExists && values.certificateType && (
                            <option value={values.certificateType}>{values.certificateType}</option>
                        )}
                        {certificateTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </label>
            </div>

            <label className="template-field">
                <span>HTML content</span>
                <textarea
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    placeholder="Paste the certificate HTML template here"
                    rows="12"
                    disabled={submitting}
                />
            </label>

            {(validationError || error) && (
                <p className="template-error" role="alert">{validationError || error}</p>
            )}

            <div className="template-form-actions">
                {onCancel && (
                    <button type="button" className="btn-action secondary" onClick={onCancel} disabled={submitting}>
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn-action primary" disabled={submitting}>
                    {submitting ? 'Saving...' : template ? 'Update template' : 'Create template'}
                </button>
            </div>
        </form>
    );
}
