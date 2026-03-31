export const initialData = {
  meta: {
    skillTrack: "Frontend",
    level: "Advanced",
    language: "Turkish",
    startDate: "2026/03/02",
    endDate: "2026/05/31",
    teamLead: "Nurşah",
  },
  members: [
    { id: "m1", name: "Nurşah",  avatar: "🧑‍💻", role: "Team Lead" },
    { id: "m2", name: "Ayşe",    avatar: "👩‍💼", role: "Developer" },
    { id: "m3", name: "Mehmet",  avatar: "👨‍🎨", role: "Designer" },
    { id: "m4", name: "Zeynep",  avatar: "👩‍🔬", role: "Tester" },
  ],
  columns: {
    todo: {
      id: "todo", title: "To Do", color: "#e53e3e",
      cards: [
        { id: "JA-4",  title: "Apply responsiveness to the Header Component", type: "Story", priority: "medium", assigneeId: "m1", resources: true,  figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-5",  title: "Implement the Search Component in the Header",  type: "Story", priority: "medium", assigneeId: "m1", resources: true,  figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-8",  title: "Implement the Range Settings Section",           type: "Story", priority: "high",   assigneeId: null, resources: true,  figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-16", title: "Create the Recommended Cars section",            type: "Story", priority: "low",    assigneeId: null, resources: true,  figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-17", title: "Make the recommended Cars section responsive",   type: "Story", priority: "medium", assigneeId: null, resources: false, figmaLink: "", liveLink: "", prLink: "" },
      ],
    },
    inprogress: {
      id: "inprogress", title: "In Progress", color: "#d69e2e",
      cards: [
        { id: "JA-2",  title: "Apply base styles",                    type: "Story", priority: "medium", assigneeId: "m2", resources: false, figmaLink: "", liveLink: "", prLink: "", comments: 1 },
        { id: "JA-3",  title: "Implement the Header Component",       type: "Story", priority: "medium", assigneeId: "m2", resources: true,  figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-12", title: "Implement The Popular Cars section",   type: "Story", priority: "medium", assigneeId: "m3", resources: true,  figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-13", title: "Make the Popular Cars section responsive", type: "Story", priority: "medium", assigneeId: "m3", resources: true, figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-14", title: "Create the Product Card Component",    type: "Story", priority: "high",   assigneeId: "m3", resources: true,  figmaLink: "", liveLink: "", prLink: "" },
      ],
    },
    review: {
      id: "review", title: "Code Review", color: "#6b46c1",
      cards: [
        { id: "JA-9",  title: "Implement Range Picker Component",                    type: "Story", priority: "medium", assigneeId: "m4", resources: true, figmaLink: "", liveLink: "", prLink: "https://github.com/org/repo/pull/9" },
        { id: "JA-11", title: "Apply responsiveness to the Range Settings Section",  type: "Story", priority: "medium", assigneeId: "m4", resources: true, figmaLink: "", liveLink: "", prLink: "https://github.com/org/repo/pull/11" },
      ],
    },
    done: {
      id: "done", title: "Done", color: "#276749",
      cards: [
        { id: "JA-1",  title: "Initialise Project",                      type: "Story", priority: "high",   assigneeId: "m1", resources: false, figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-6",  title: "Implement the Hero Section",              type: "Story", priority: "medium", assigneeId: "m1", resources: true,  figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-7",  title: "Implement the Hero Promo Cards",          type: "Story", priority: "medium", assigneeId: "m1", resources: true,  figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-10", title: "Apply responsiveness for the hero section", type: "Story", priority: "medium", assigneeId: "m1", resources: true, figmaLink: "", liveLink: "", prLink: "" },
        { id: "JA-18", title: "Create the Footer Component",             type: "Story", priority: "low",    assigneeId: "m2", resources: true,  figmaLink: "", liveLink: "", prLink: "" },
      ],
    },
  },
  columnOrder: ["todo", "inprogress", "review", "done"],
};