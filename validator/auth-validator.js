const { z } = require("zod");

const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters long" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email must be less than 255 characters" }),
    phone: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .length(10, { message: "Phone number must be exactly 10 digits" })
        .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 characters long" })
        .max(255, { message: "Password must be less than 255 characters" }),
});

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email must be less than 255 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 characters long" })
        .max(255, { message: "Password must be less than 255 characters" }),
});

module.exports = { signupSchema, loginSchema };
