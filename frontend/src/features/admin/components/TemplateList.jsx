const formatDate = (date) => {
    if (!date) return 'Not available';
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(date));
};

const getTypeLabel = (type) => type
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Not specified';

export default function TemplateList({ templates, loading, error, onEdit, onToggle, togglingId }) {
    if (loading) {
        return <div className="template-state">Loading templates...</div>;
    }

    if (error) {
        return <div className="template-state template-error" role="alert">{error}</div>;
    }

    if (!templates.length) {
        return <div className="template-state">No templates yet. Create the first certificate template above.</div>;
    }

    return (
        <div className="template-table-wrap">
            <table className="template-table">
                <thead>
                    <tr>
                        <th>Template</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Updated</th>
                        <th><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody>
                    {templates.map((template) => {
                        const isActive = template.status === 'active';
                        return (
                            <tr key={template._id}>
                                <td>
                                    <strong>{template.templateName}</strong>
                                    <small>{template.templateCode || 'Certificate template'}</small>
                                </td>
                                <td>{getTypeLabel(template.certificateType)}</td>
                                <td>
                                    <span className={`template-status ${isActive ? 'active' : 'inactive'}`}>
                                        {template.status || 'draft'}
                                    </span>
                                </td>
                                <td>{formatDate(template.updatedAt || template.createdAt)}</td>
                                <td className="template-actions">
                                    <button type="button" className="btn-action outline" onClick={() => onEdit(template)}>
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-action secondary"
                                        onClick={() => onToggle(template._id)}
                                        disabled={togglingId === template._id}
                                    >
                                        {togglingId === template._id ? 'Updating...' : isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
