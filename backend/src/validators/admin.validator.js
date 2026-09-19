import { body, validationResult } from "express-validator";

function validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
}

const allowedStatuses = ["active", "inactive"];

export const createTemplateValidator = [
    body("templateName")
        .trim()
        .notEmpty()
        .withMessage("Template name is required"),
    body("certificateType")
        .trim()
        .notEmpty()
        .withMessage("Certificate type is required"),
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Template content is required"),
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty"),
    body("status")
        .optional()
        .isIn(allowedStatuses)
        .withMessage("Status must be active or inactive"),
    validate
];

export const updateTemplateValidator = [
    body("templateName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Template name cannot be empty"),
    body("certificateType")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Certificate type cannot be empty"),
    body("content")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Template content cannot be empty"),
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty"),
    body("status")
        .optional()
        .isIn(allowedStatuses)
        .withMessage("Status must be active or inactive"),
    body().custom((value) => {
        const editableFields = [
            "templateName",
            "certificateType",
            "content",
            "title",
            "status"
        ];
        const hasEditableField = editableFields.some((field) =>
            Object.prototype.hasOwnProperty.call(value, field)
        );

        if (!hasEditableField) {
            throw new Error("At least one editable field is required");
        }

        return true;
    }),
    validate
];
