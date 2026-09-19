import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import CertificatePreview from '../components/CertificatePreview';
import { defaultCertificateHtml } from '../components/certificatePreview.constants';
import '../admin.css';

export default function CertificateReviewPage() {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();
    const [content, setContent] = useState(defaultCertificateHtml);
    const [notice, setNotice] = useState('');

    const displayName = user?.fullName || user?.email || 'Administrator';
    const initials = displayName
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const handleSave = () => {
        setNotice('Draft saved locally for this review session.');
    };

    const handleReview = () => {
        setNotice('Review marked as ready for the next workflow step.');
    };

    const handleLogoutAndNavigate = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout admin-dashboard review-page">
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
                    <Link className="nav-item" to="/admin/dashboard">
                        <span>▣</span>
                        Templates
                    </Link>
                    <span className="nav-item active">
                        <span>◫</span>
                        Certificate review
                    </span>
                </nav>
                <button type="button" className="nav-item logout-btn" onClick={handleLogoutAndNavigate}>
                    <span>↪</span>
                    Sign out
                </button>
            </aside>

            <main className="dashboard-main">
                <div className="dashboard-content">
                    <div className="review-breadcrumb">
                        <Link to="/admin/dashboard">Templates</Link>
                        <span>/</span>
                        <span>Certificate review</span>
                    </div>

                    <section className="welcome-section review-heading">
                        <h1>Certificate review</h1>
                        <p>Review certificate content and preview the final layout before the generation workflow is connected.</p>
                    </section>

                    <section className="review-layout" aria-label="Certificate review workspace">
                        <div className="template-panel review-editor-panel">
                            <div className="template-panel-header">
                                <div>
                                    <h2>Certificate content</h2>
                                    <p>Use HTML to define the certificate body and layout.</p>
                                </div>
                                <span className="review-status">Draft</span>
                            </div>
                            <label className="template-field">
                                <span>HTML content</span>
                                <textarea
                                    value={content}
                                    onChange={(event) => {
                                        setContent(event.target.value);
                                        setNotice('');
                                    }}
                                    rows="25"
                                    spellCheck="false"
                                />
                            </label>
                            <div className="template-form-actions review-actions">
                                <button type="button" className="btn-action secondary" onClick={handleSave}>
                                    Save draft
                                </button>
                                <button type="button" className="btn-action primary" onClick={handleReview}>
                                    Mark ready for review
                                </button>
                            </div>
                            {notice && <p className="review-notice" role="status">{notice}</p>}
                        </div>

                        <div className="template-panel review-preview-panel">
                            <div className="template-panel-header">
                                <div>
                                    <h2>Preview</h2>
                                    <p>Live preview of the current HTML content.</p>
                                </div>
                            </div>
                            <CertificatePreview content={content} />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
