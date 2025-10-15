import React from "react";
import { InitialStatus, PriorityLevel } from "./enums";

export const statusProgressFields = [
	{
		name: "initialStatus",
		label: "Initial Status",
		type: "select",
		options: Object.values(InitialStatus),
	},
	{
		name: "priorityLevel",
		label: "Priority Level",
		type: "select",
		options: Object.values(PriorityLevel),
	},
	{
		name: "progress",
		label: "Progress(%) *",
		type: "number",
		onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (["e", "E", ".", "+", "-"].includes(e.key)) {
				e.preventDefault();
			}
		},
	},
];

export const financialTimelineFields = [
	{
		name: "budget",
		label: "Budget($)*",
		type: "number",
		placeholder: "",
		onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (["e", "E", ".", "+", "-"].includes(e.key)) {
				e.preventDefault();
			}
		},
	},
	{
		name: "startDate",
		label: "Start Date*",
		type: "date",
	},
	{
		name: "dueDate",
		label: "Due Date*",
		type: "date",
	},
];

export const basicInfoFields = [
	{
		name: "title",
		label: "Project Title*",
		type: "text",
		placeholder: "Enter a clear, descriptive title for your project",
	},
	{
		name: "clientName",
		label: "Client*",
		type: "text",
		placeholder: "Enter client or company name",
	},
	{
		name: "description",
		label: "Description*",
		type: "textarea",
		placeholder:
			"Describe the goals, scope, and key deliverables of your project",
	},
];
