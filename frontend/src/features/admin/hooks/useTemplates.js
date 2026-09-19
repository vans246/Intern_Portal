import { useEffect, useState } from 'react';
import {
    createTemplate,
    getAllTemplates,
    toggleTemplateActive,
    updateTemplate,
} from '../services/admin.service';

const getMessage = (error) => {
    if (typeof error === 'string') return error;
    return error?.message || error?.errors?.[0]?.msg || 'Something went wrong.';
};

export default function useTemplates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTemplates = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getAllTemplates();
            setTemplates(data.templates || []);
        } catch (requestError) {
            setError(getMessage(requestError));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let cancelled = false;

        getAllTemplates()
            .then((data) => {
                if (!cancelled) {
                    setTemplates(data.templates || []);
                }
            })
            .catch((requestError) => {
                if (!cancelled) {
                    setError(getMessage(requestError));
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const create = async (data) => {
        setError(null);
        try {
            const response = await createTemplate(data);
            if (response.template) {
                setTemplates((current) => [response.template, ...current]);
            }
            return response;
        } catch (requestError) {
            const message = getMessage(requestError);
            setError(message);
            throw new Error(message, { cause: requestError });
        }
    };

    const update = async (id, data) => {
        setError(null);
        try {
            const response = await updateTemplate(id, data);
            if (response.template) {
                setTemplates((current) => current.map((template) => (
                    template._id === id ? response.template : template
                )));
            }
            return response;
        } catch (requestError) {
            const message = getMessage(requestError);
            setError(message);
            throw new Error(message, { cause: requestError });
        }
    };

    const toggle = async (id) => {
        setError(null);
        try {
            const response = await toggleTemplateActive(id);
            if (response.template) {
                setTemplates((current) => current.map((template) => (
                    template._id === id ? response.template : template
                )));
            }
            return response;
        } catch (requestError) {
            const message = getMessage(requestError);
            setError(message);
            throw new Error(message, { cause: requestError });
        }
    };

    return {
        templates,
        loading,
        error,
        fetchTemplates,
        createTemplate: create,
        updateTemplate: update,
        toggleTemplateActive: toggle,
    };
}
