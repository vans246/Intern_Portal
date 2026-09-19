import { defaultCertificateHtml } from './certificatePreview.constants';

export default function CertificatePreview({ content = defaultCertificateHtml }) {
    return (
        <div className="certificate-preview-frame">
            <iframe
                title="Certificate preview"
                srcDoc={content || defaultCertificateHtml}
                sandbox=""
            />
        </div>
    );
}
