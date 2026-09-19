import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useTemplates from '../../admin/hooks/useTemplates';
import TemplateForm from '../../admin/components/TemplateForm';
import TemplateList from '../../admin/components/TemplateList';
import '../../admin/admin.css';

export default function AdminDashboard() {
  const { user, handleLogout } = useAuth();
  const {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    toggleTemplateActive,
  } = useTemplates();
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setActionError(null);

    try {
      if (editingTemplate) {
        await updateTemplate(editingTemplate._id, data);
      } else {
        await createTemplate(data);
      }
      setEditingTemplate(null);
      setShowForm(false);
    } catch (submitError) {
      setActionError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    setTogglingId(id);
    setActionError(null);

    try {
      await toggleTemplateActive(id);
    } catch (toggleError) {
      setActionError(toggleError.message);
    } finally {
      setTogglingId(null);
    }
  };

  const startCreate = () => {
    setActionError(null);
    setEditingTemplate(null);
    setShowForm(true);
  };

  const startEdit = (template) => {
    setActionError(null);
    setEditingTemplate(template);
    setShowForm(true);
  };

  const cancelForm = () => {
    setEditingTemplate(null);
    setShowForm(false);
    setActionError(null);
  };

  const displayName = user?.fullName || user?.email || 'Administrator';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-layout admin-dashboard">
      <header className="top-navbar">
        <div className="brand">
          <span className="brand-icon">🚀</span>
          <strong>uptoskills</strong>
        </div>
        <div className="header-actions">
          <div className="user-profile">
            <div className="avatar">{initials}</div>
            <div className="user-info">
              <strong>{displayName}</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </header>

      <aside className="sidebar">
        <nav className="sidebar-nav">
          <span className="nav-label">ADMINISTRATION</span>
          <button type="button" className="nav-item active">
            <span>▣</span>
            Templates
          </button>
          <Link to="/admin/certificates/review" className="nav-item">
            <span>◫</span>
            Certificate review
          </Link>
        </nav>
        <button type="button" className="nav-item logout-btn" onClick={handleLogout}>
          <span>↪</span>
          Sign out
        </button>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="welcome-section">
            <h1>Certificate templates</h1>
            <p>Create and maintain the HTML layouts used for issued certificates.</p>
          </section>

          <section className="template-section" aria-labelledby="template-management-heading">
            <div className="template-panel-header">
              <div>
                <h2 id="template-management-heading">Templates</h2>
                <p>{templates.length} template{templates.length === 1 ? '' : 's'} available</p>
              </div>
              {!showForm && (
                <button type="button" className="btn-action primary" onClick={startCreate}>
                  Create template
                </button>
              )}
            </div>

            {showForm && (
              <div className="template-panel">
                <div className="template-panel-header">
                  <div>
                    <h2>{editingTemplate ? 'Edit template' : 'Create template'}</h2>
                    <p>Use HTML content to define the certificate layout.</p>
                  </div>
                </div>
                <TemplateForm
                  key={editingTemplate?._id || 'new-template'}
                  template={editingTemplate}
                  onSubmit={handleSubmit}
                  onCancel={cancelForm}
                  submitting={submitting}
                  error={actionError}
                />
              </div>
            )}

            <div className="template-panel">
              <TemplateList
                templates={templates}
                loading={loading}
                error={error || actionError}
                onEdit={startEdit}
                onToggle={handleToggle}
                togglingId={togglingId}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}