"use client";

import { useState, useEffect } from "react";
import AddFamilyMemberModal from "@/components/AddFamilyMemberModal";
import AddQualificationModal from "@/components/AddQualificationModal";
import UploadDocumentModal from "@/components/UploadDocumentModal";
import ViewDocumentModal from "@/components/ViewDocumentModal";
import AddWorkExperienceModal from "@/components/AddWorkExperienceModal";
import AddAccomplishmentModal from "@/components/AddAccomplishmentModal";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("Personal");
	const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);
	const [isAddQualificationOpen, setIsAddQualificationOpen] = useState(false);
	const [isUploadDocumentOpen, setIsUploadDocumentOpen] = useState(false);
	const [isViewDocumentOpen, setIsViewDocumentOpen] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState(null);
	const [isAddWorkExperienceOpen, setIsAddWorkExperienceOpen] = useState(false);
	const [isAddAccomplishmentOpen, setIsAddAccomplishmentOpen] = useState(false);

	// Accomplishments state (empty by default)
	const [accomplishments, setAccomplishments] = useState([
		// Example entry (comment out or remove for empty state)
		{
			type: "Certification",
			title: "Google UI/UX Certified",
			issuer: "Google",
			issueDate: "Jan 2026",
			expiryDate: "Nov 2028",
			credentialId: "FFY62337VDSY",
			credentialUrl: "#",
			description: "Certified in UI/UX design principles",
			status: "Pending Verification",
		},
	]);

	// Work Experience state
	const [workExperiences, setWorkExperiences] = useState([
		// Example entry (you can remove or keep for testing)
		{
			jobTitle: "Trainee Software Engineer",
			company: "Limark Technologies",
			location: "Colombo",
			startDate: "Invalid Date",
			endDate: "Invalid Date",
			currentlyWorking: false,
			type: "Full-time",
			description:
				"Drove the development as the sole backend engineer, leading all server-side development for the project",
			status: "Pending Verification",
		},
	]);

	const [documents, setDocuments] = useState([
		{
			name: "NIC Copy",
			type: "ID Document",
			date: "2023-07-20",
			status: "Verified",
			statusColor: "bg-green-100 text-green-800",
		},
		{
			name: "Degree Certificate",
			type: "Education",
			date: "2023-07-20",
			status: "Verified",
			statusColor: "bg-green-100 text-green-800",
		},
		{
			name: "Bank Statement",
			type: "Financial",
			date: "2023-07-22",
			status: "Verified",
			statusColor: "bg-green-100 text-green-800",
		},
	]);

	const tabs = [
		"Personal",
		"Work",
		"Contact",
		"Education & Skills",
		"Work Experience",
		"Accomplishments",
		"Documents",
		"Timeline",
	];

	const timelineEvents = [
		{
			title: "Joined as Software Engineer",
			date: "2023-07-23",
			icon: "user-plus",
			color: "bg-green-100 text-green-600",
		},
		{
			title: "Confirmed as Permanent Employee",
			date: "2023-07-23",
			icon: "check-double",
			color: "bg-blue-100 text-blue-600",
		},
		{
			title: "Assigned to Peercore Cloud Team",
			date: "2023-08-01",
			icon: "users",
			color: "bg-purple-100 text-purple-600",
		},
	];

	const [skills, setSkills] = useState(["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git"]);

	// Qualifications state (editable)
	const [qualifications, setQualifications] = useState([
		{
			type: "Academic",
			title: "BEng. Software Engineering",
			institution: "University of Ruhuna",
			years: "2019 - 2023",
			status: "Completed",
		},
	]);

	// Delete skill handler
	const deleteSkill = (skillToDelete) => {
		setSkills(skills.filter((s) => s !== skillToDelete));
	};

	// Delete qualification handler
	const deleteQualification = (index) => {
		setQualifications(qualifications.filter((_, i) => i !== index));
	};

	useEffect(() => {
		document.title = "My Profile | HRMS Portal";
	}, []);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-2xl">
						VC
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Malimbada Gamage Vaijth Chamuditha</h1>
						<p className="text-sm text-gray-600">Software Engineer</p>
						<p className="text-xs text-gray-500 mt-1">Development Team • EMP-0381 • Joined Jul 23, 2023 • Colombo 03</p>
					</div>
				</div>
				<span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1">
					<i className="fas fa-circle text-xs"></i> Active
				</span>
			</div>

			{/* Tabs */}
			<div className="border-b border-gray-200">
				<div className="flex overflow-x-auto">
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`px-5 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
								activeTab === tab
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}>
							{tab}
						</button>
					))}
				</div>
			</div>

			{/* Personal Tab Content */}
			{activeTab === "Personal" && (
				<div className="space-y-8">
					{/* Personal Information */}
					<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
							<i className="fas fa-user text-blue-600"></i>
							Personal Information
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div>
								<p className="text-sm font-medium text-gray-700">Initials</p>
								<p className="text-gray-900 mt-1">M G V</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">First Name</p>
								<p className="text-gray-900 mt-1">Vaijth</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Surname</p>
								<p className="text-gray-900 mt-1">Chamuditha</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Middle Name</p>
								<p className="text-gray-500 mt-1">Not specified</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Full Name</p>
								<p className="text-gray-900 mt-1">Malimbada Gamage Vaijth Chamuditha</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Known As</p>
								<p className="text-gray-500 mt-1">Not specified</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Date of Birth</p>
								<p className="text-gray-900 mt-1">20/08/1999</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Gender</p>
								<p className="text-gray-900 mt-1">Male</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Marital Status</p>
								<p className="text-gray-900 mt-1">Single</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Blood Group</p>
								<p className="text-gray-500 mt-1">Not specified</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Title</p>
								<p className="text-gray-900 mt-1">Mr.</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Place of Birth</p>
								<p className="text-gray-500 mt-1">Not specified</p>
							</div>
						</div>
					</div>

					{/* Identification Information */}
					<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
							<i className="fas fa-id-card text-blue-600"></i>
							Identification Information
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div>
								<p className="text-sm font-medium text-gray-700">NIC Number</p>
								<p className="text-gray-500 mt-1">Not specified</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Passport Number</p>
								<p className="text-gray-500 mt-1">Not specified</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">NIC License Number</p>
								<p className="text-gray-500 mt-1">Not specified</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Ethnicity</p>
								<p className="text-gray-900 mt-1">No</p>
							</div>
						</div>
					</div>

					{/* Family Details */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Father's Details */}
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<i className="fas fa-user-tie text-blue-600"></i>
								Father&apos;s Details
							</h2>
							<div className="space-y-4">
								<div className="flex justify-between">
									<p className="text-sm font-medium text-gray-700">Name</p>
									<p className="text-gray-500">Not specified</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm font-medium text-gray-700">Date of Birth</p>
									<p className="text-gray-500">N/A</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm font-medium text-gray-700">Occupation</p>
									<p className="text-gray-500">Not specified</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm font-medium text-gray-700">Contact Number</p>
									<p className="text-gray-500">Not specified</p>
								</div>
							</div>
						</div>

						{/* Mother&apos;s Details */}
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
								<i className="fas fa-user-tie text-blue-600"></i>
								Mother&apos;s Details
							</h2>
							<div className="space-y-4">
								<div className="flex justify-between">
									<p className="text-sm font-medium text-gray-700">Name</p>
									<p className="text-gray-500">Not specified</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm font-medium text-gray-700">Date of Birth</p>
									<p className="text-gray-500">N/A</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm font-medium text-gray-700">Occupation</p>
									<p className="text-gray-500">Not specified</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm font-medium text-gray-700">Contact Number</p>
									<p className="text-gray-500">Not specified</p>
								</div>
							</div>
						</div>
					</div>

					{/* Spouse & Children */}
					<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
						<div className="flex items-center justify-between mb-5">
							<h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
								<i className="fas fa-heart text-red-600"></i>
								Spouse & Children
							</h2>
							<button
								onClick={() => setIsAddFamilyOpen(true)}
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer">
								<i className="fas fa-plus"></i>
								Add Family Member
							</button>
						</div>

						<div className="text-center py-8 text-gray-500">
							<i className="fas fa-user-circle text-6xl text-gray-300 mb-4"></i>
							<p>No spouse/children added</p>
							<button
								onClick={() => setIsAddFamilyOpen(true)}
								className="mt-4 text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
								+ Add Family Member
							</button>
						</div>
					</div>
				</div>
			)}

			{activeTab === "Timeline" && (
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
						<i className="fas fa-stream text-blue-600"></i>
						Employment Timeline
					</h2>

					<div className="relative pl-20 space-y-8">
						{/* Vertical rail centered */}
						<div className="absolute left-8 top-10 bottom-0 w-px bg-gray-200"></div>

						{timelineEvents.map((event, index) => (
							<div key={index} className="relative">
								{/* Icon centered on rail and vertically aligned to card */}
								<div className="absolute left-0 -translate-x-17 top-1/2 -translate-y-1/2 z-10">
									<div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm ${event.color}`}>
										<i className={`fas fa-${event.icon}`}></i>
									</div>
								</div>

								{/* Connector from rail to card */}
								<div className="absolute left-8 top-1/2 -translate-x-16 -translate-y-1/2 w-8 h-px bg-gray-300"></div>

								{/* Event content */}
								<div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
									<p className="text-base font-medium text-gray-900 mb-1">{event.title}</p>
									<p className="text-sm text-gray-600">
										<i className="fas fa-calendar-alt mr-1 text-gray-400"></i>
										{event.date}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{activeTab === "Education & Skills" && (
				<div className="space-y-8">
					{/* Qualifications */}
					<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
								<i className="fas fa-graduation-cap text-blue-600"></i>
								Qualifications
							</h2>
							<button
								onClick={() => setIsAddQualificationOpen(true)}
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer">
								<i className="fas fa-plus"></i>
								Add Qualification
							</button>
						</div>

						{qualifications.length === 0 ? (
							<div className="p-10 text-center">
								<div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
									<i className="fas fa-graduation-cap text-4xl"></i>
								</div>
								<p className="text-lg font-medium text-gray-900 mt-4">No qualifications added</p>
								<p className="text-sm text-gray-500">Add your academic qualifications</p>
								<div className="flex justify-center">
									<button
										onClick={() => setIsAddQualificationOpen(true)}
										className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2">
										<i className="fas fa-plus"></i>
										Add Your First Qualification
									</button>
								</div>
							</div>
						) : (
							<div className="space-y-4 ">
								{qualifications.map((qual, index) => (
									<div
										key={index}
										className="group relative  rounded-lg p-5 border border-gray-200 hover:border-gray-300 bg-blue-50">
										<div className="flex items-start justify-between gap-4">
											<div className="flex  gap-4">
												<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700 text-white-600">
													<i className="fas fa-university text-2xl"></i>
												</div>
												<div>
													<span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 mb-1">
														{qual.type}
													</span>
													<p className="text-sm font-medium text-gray-900">{qual.title}</p>
													<p className="text-xs text-gray-600">{qual.institution}</p>
													<p className="text-xs text-gray-500 mt-1">{qual.years}</p>
												</div>
											</div>

											<div className="flex items-center gap-3">
												<span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
													{qual.status}
												</span>
												{/* Bin icon on hover */}
												<button
													onClick={() => deleteQualification(index)}
													className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-800 cursor-pointer">
													<i className="fas fa-trash-alt"></i>
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Skills */}
					<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
								<i className="fas fa-code text-blue-600"></i>
								Skills
							</h2>
							<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
								<i className="fas fa-plus"></i>
								Add Skill
							</button>
						</div>

						{skills.length === 0 ? (
							<div className="p-10 text-center">
								<div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
									<i className="fas fa-code text-4xl"></i>
								</div>
								<p className="text-lg font-medium text-gray-900 mt-4">No skills added</p>
								<p className="text-sm text-gray-500">Add your primary technical skills</p>
								<button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2">
									<i className="fas fa-plus"></i>
									Add Your First Skill
								</button>
							</div>
						) : (
							<div className="flex flex-wrap gap-3">
								{skills.map((skill) => (
									<div
										key={skill}
										className="group relative px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-800 flex items-center gap-2 hover:bg-gray-200 transition-colors">
										{skill}
										{/* Bin icon on hover */}
										<button
											onClick={() => deleteSkill(skill)}
											className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-800 cursor-pointer">
											<i className="fas fa-trash-alt text-sm"></i>
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}

			{/* Work Experience Tab */}
			{activeTab === "Work Experience" && (
				<div className="space-y-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
							<i className="fas fa-briefcase text-blue-600"></i>
							Work Experience
						</h2>
						<button
							onClick={() => setIsAddWorkExperienceOpen(true)}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
							<i className="fas fa-plus"></i>
							Add Experience
						</button>
					</div>

					{workExperiences.length === 0 ? (
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
							<div className="flex flex-col items-center gap-4">
								<div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
									<i className="fas fa-briefcase text-4xl"></i>
								</div>
								<p className="text-lg font-medium text-gray-900">No previous work experience added</p>
								<p className="text-sm text-gray-500">Add your previous employment history</p>
								<button
									onClick={() => setIsAddWorkExperienceOpen(true)}
									className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2">
									<i className="fas fa-plus"></i>
									Add Your First Experience
								</button>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							{workExperiences.map((exp, index) => (
								<div
									key={index}
									className="bg-blue-50 rounded-xl border border-blue-100 shadow-sm p-6 hover:shadow-md transition-shadow">
									<div className="flex items-start justify-between gap-4">
										<div className="flex items-center gap-4">
											<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
												<i className="fas fa-briefcase text-2xl"></i>
											</div>
											<div>
												<p className="text-base font-medium text-gray-900">{exp.jobTitle}</p>
												<p className="text-sm text-gray-700 mt-1">{exp.company}</p>
												<div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
													<div className="flex items-center gap-1">
														<i className="fas fa-calendar-alt"></i>
														<span>
															{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
														</span>
													</div>
													<div className="flex items-center gap-1">
														<i className="fas fa-map-marker-alt"></i>
														<span>{exp.location}</span>
													</div>
													<div className="flex items-center gap-1">
														<i className="fas fa-clock"></i>
														<span>{exp.type}</span>
													</div>
												</div>
											</div>
										</div>

										<div className="flex items-center gap-3">
											<span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
												{exp.status}
											</span>
											<button
												onClick={() => setWorkExperiences((prev) => prev.filter((_, i) => i !== index))}
												className="text-red-600 hover:text-red-800 cursor-pointer"
												title="Delete"
												aria-label="Delete work experience">
												<i className="fas fa-trash-alt"></i>
											</button>
										</div>
									</div>

									<p className="mt-4 text-sm text-gray-700">{exp.description}</p>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{/* ... (keep your other tabs: Personal, Education & Skills, Timeline, etc.) ... */}

			<AddWorkExperienceModal
				open={isAddWorkExperienceOpen}
				onClose={() => setIsAddWorkExperienceOpen(false)}
				onSave={(exp) => setWorkExperiences((prev) => [exp, ...prev])}
			/>

			{/* Accomplishments Tab */}
			{activeTab === "Accomplishments" && (
				<div className="space-y-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
					<div className="flex justify-between">
						<h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
							<i className="fas fa-award text-blue-600"></i>
							Accomplishments
						</h2>
						{/* Add Button */}
						<div className="flex justify-end">
							<button
								onClick={() => setIsAddAccomplishmentOpen(true)}
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
								<i className="fas fa-plus"></i>
								Add Accomplishment
							</button>
						</div>
					</div>
					{/* Badges Overview */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-200">
							<div className="flex justify-center mb-3">
								<div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
									<i className="fas fa-trophy text-orange-600 text-2xl"></i>
								</div>
							</div>
							<p className="text-sm font-medium text-gray-700">Awards</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">0</p>
						</div>

						<div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
							<div className="flex justify-center mb-3">
								<div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
									<i className="fas fa-certificate text-blue-600 text-2xl"></i>
								</div>
							</div>
							<p className="text-sm font-medium text-gray-700">Certifications</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">1</p>
						</div>

						<div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
							<div className="flex justify-center mb-3">
								<div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
									<i className="fas fa-star text-green-600 text-2xl"></i>
								</div>
							</div>
							<p className="text-sm font-medium text-gray-700">Recognition</p>
							<p className="text-2xl font-bold text-gray-900 mt-1">0</p>
						</div>
					</div>

					{/* Empty or Content */}
					{accomplishments?.length === 0 ? (
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
							<div className="flex flex-col items-center gap-4">
								<div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
									<i className="fas fa-trophy text-5xl"></i>
								</div>
								<p className="text-lg font-medium text-gray-900">No accomplishments added yet</p>
								<p className="text-sm text-gray-500">Add your awards, certifications, and recognition</p>
								<button
									onClick={() => setIsAddAccomplishmentOpen(true)}
									className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2">
									<i className="fas fa-plus"></i>
									Add Your First Accomplishment
								</button>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							{accomplishments.map((acc, index) => (
								<div key={index} className="bg-blue-50 rounded-xl border border-blue-100 shadow-sm p-6 relative">
									{/* Top right status + delete */}
									<div className="absolute right-4 top-4 flex items-center gap-3">
										<span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
											{acc.status}
										</span>
										<button
											onClick={() => deleteAccomplishment(index)}
											className="text-red-600 hover:text-red-800 cursor-pointer"
											title="Delete accomplishment"
											aria-label="Delete accomplishment">
											<i className="fas fa-trash-alt"></i>
										</button>
									</div>

									<div className="flex items-start gap-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
											<i className="fas fa-award"></i>
										</div>
										<div className="flex-1">
											<span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 mb-2">
												{acc.type}
											</span>
											<p className="text-base font-medium text-gray-900">{acc.title}</p>
											<p className="text-sm text-gray-700">{acc.issuer}</p>

											<div className="mt-3 space-y-1 text-sm">
												<div className="flex items-center gap-2 text-gray-700">
													<i className="fas fa-calendar-alt text-gray-500"></i>
													<span>{acc.issuedDate}</span>
													<span className="mx-2">•</span>
													<i className="fas fa-calendar text-gray-500"></i>
													<span>Expires {acc.expiresDate}</span>
												</div>
												<div className="flex items-center gap-2 text-gray-700">
													<i className="fas fa-id-badge text-gray-500"></i>
													<span>Credential ID: {acc.credentialId}</span>
												</div>
												<a
													href={acc.credentialUrl}
													className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
													<i className="fas fa-external-link-alt"></i>
													View Credential
												</a>
											</div>

											<p className="mt-3 text-sm text-gray-700">{acc.description}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{/* ... (keep your other tabs) ... */}

			<AddAccomplishmentModal
				open={isAddAccomplishmentOpen}
				onClose={() => setIsAddAccomplishmentOpen(false)}
				onSave={(accomp) => setAccomplishments((prev) => [accomp, ...prev])}
			/>

			{/* Documents Tab */}
			{activeTab === "Documents" && (
				<div className="space-y-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
							<i className="fas fa-folder text-blue-600"></i>
							Documents
						</h2>
						<button
							onClick={() => setIsUploadDocumentOpen(true)}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
							<i className="fas fa-upload"></i>
							Upload Document
						</button>
					</div>

					{documents.length === 0 ? (
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
							<div className="flex flex-col items-center gap-4">
								<div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
									<i className="fas fa-file-alt text-4xl"></i>
								</div>
								<p className="text-lg font-medium text-gray-900">No documents uploaded</p>
								<p className="text-sm text-gray-500">Upload your important documents</p>
								<button
									onClick={() => setIsUploadDocumentOpen(true)}
									className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2">
									<i className="fas fa-upload"></i>
									Upload Your First Document
								</button>
							</div>
						</div>
					) : (
						<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-100">
										<tr>
											<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												DOCUMENT
											</th>
											<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												TYPE
											</th>
											<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												DATE
											</th>
											<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												STATUS
											</th>
											<th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
												ACTIONS
											</th>
										</tr>
									</thead>
									<tbody className="bg-blue-50 rounded-xl border border-blue-100 shadow-sm divide-y divide-gray-200">
										{documents.map((doc, index) => (
											<tr key={index} className="hover:bg-gray-100 transition-colors cursor-pointer">
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center gap-3">
														<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
															<i className="fas fa-file-alt"></i>
														</div>
														<span className="text-sm font-medium text-gray-900">{doc.name}</span>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{doc.type}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{doc.date}</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className={`px-3 py-1 rounded-full text-xs font-medium ${doc.statusColor}`}>
														{doc.status}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<div className="flex items-center justify-end gap-4">
														<button
															className="text-blue-600 hover:text-blue-800"
															onClick={() => {
																setSelectedDocument(documents[index]);
																setIsViewDocumentOpen(true);
															}}>
															<i className="fas fa-eye"></i>
														</button>
														<button className="text-blue-600 hover:text-blue-800">
															<i className="fas fa-download"></i>
														</button>
														<button
															className="text-red-600 hover:text-red-800 cursor-pointer"
															title="Delete"
															aria-label="Delete document"
															onClick={() => setDocuments((prev) => prev.filter((_, i) => i !== index))}>
															<i className="fas fa-trash-alt"></i>
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			)}

			{/* Upload Document Modal */}
			<UploadDocumentModal
				open={isUploadDocumentOpen}
				onClose={() => setIsUploadDocumentOpen(false)}
				onSave={(doc) =>
					setDocuments((prev) => [
						{
							name: doc.title,
							type: doc.type,
							date: doc.uploadedAt,
							status: doc.status,
							statusColor: doc.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800",
							files: doc.files,
						},
						...prev,
					])
				}
			/>

			{/* View Document Modal */}
			<ViewDocumentModal
				open={isViewDocumentOpen}
				onClose={() => setIsViewDocumentOpen(false)}
				document={selectedDocument}
			/>

			<AddQualificationModal open={isAddQualificationOpen} onClose={() => setIsAddQualificationOpen(false)} />

			{/* Modal Components */}
			<AddFamilyMemberModal open={isAddFamilyOpen} onClose={() => setIsAddFamilyOpen(false)} />
		</div>
	);
}
