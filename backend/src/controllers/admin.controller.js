import crypto from "crypto";
import mongoose from "mongoose";
import certificateTemplateModel from "../models/CertificateTemplate.js";

const editableFields = [
    "templateName",
    "certificateType",
    "content",
    "title",
    "status"
];

function getEditableFields(body) {
    return editableFields.reduce((fields, field) => {
        if (Object.prototype.hasOwnProperty.call(body, field)) {
            fields[field] = body[field];
        }
        return fields;
    }, {});
}

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

function handleError(res, error) {
    if (error?.code === 11000) {
        return res.status(409).json({
            message: "A template with the same unique value already exists"
        });
    }

    if (error?.name === "ValidationError") {
        return res.status(400).json({
            message: error.message
        });
    }

    return res.status(500).json({
        message: "Internal server error"
    });
}

function generateTemplateCode() {
    return `TPL-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function createTemplate(req, res) {
    try {
        const { templateName, certificateType, content, title, status } = req.body;

        const template = await certificateTemplateModel.create({
            templateCode: generateTemplateCode(),
            templateName,
            certificateType,
            content,
            title: title || templateName,
            status: status || "active",
            createdBy: req.user.id
        });

        return res.status(201).json({
            message: "Certificate template created successfully",
            template
        });
    } catch (error) {
        return handleError(res, error);
    }
}

export async function getTemplates(req, res) {
    try {
        const templates = await certificateTemplateModel
            .find()
            .sort({ createdAt: -1 });

        return res.status(200).json({ templates });
    } catch (error) {
        return handleError(res, error);
    }
}

export async function getTemplateById(req, res) {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "Invalid template ID" });
    }

    try {
        const template = await certificateTemplateModel.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ message: "Certificate template not found" });
        }

        return res.status(200).json({ template });
    } catch (error) {
        return handleError(res, error);
    }
}

export async function updateTemplate(req, res) {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "Invalid template ID" });
    }

    try {
        const template = await certificateTemplateModel.findByIdAndUpdate(
            req.params.id,
            getEditableFields(req.body),
            {
                new: true,
                runValidators: true
            }
        );

        if (!template) {
            return res.status(404).json({ message: "Certificate template not found" });
        }

        return res.status(200).json({
            message: "Certificate template updated successfully",
            template
        });
    } catch (error) {
        return handleError(res, error);
    }
}

export async function toggleTemplateStatus(req, res) {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "Invalid template ID" });
    }

    try {
        const template = await certificateTemplateModel.findById(req.params.id);

        if (!template) {
            return res.status(404).json({ message: "Certificate template not found" });
        }

        if (!["active", "inactive"].includes(template.status)) {
            return res.status(400).json({
                message: "Only active or inactive templates can be toggled"
            });
        }

        template.status = template.status === "active" ? "inactive" : "active";
        await template.save();

        return res.status(200).json({
            message: "Certificate template status updated successfully",
            template
        });
    } catch (error) {
        return handleError(res, error);
    }
}
