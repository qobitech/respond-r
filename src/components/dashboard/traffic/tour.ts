
export const TOUR_STEPS = [
    {
        target: ".ham-container",
        content: "This is the icon used to open the side menu.",
        disableBeacon: true // This makes the tour to start automatically without click
    },
    {
        target: ".actions",
        content: "This is a button to see a list of quick actions.",
    },
    {
        target: ".card-section",
        content: "These are the overview cards for quick information about your organization.",
    },
    {
    target: ".add-app",
    content:
        "This is a button to create an application"
    },
    {
    target: ".view-all-apps",
    content: "This is a link to view all your applications"
    },
    {
        target: window.innerWidth > 756 ? ".overview-icon" : '.bomboclat',
        content: "This is the overview icon that links to the overview page",
    },
    {
    target:  window.innerWidth > 756 ? ".org-icon": '.bomboclat',
    content:
        "This is the organization icon that links to the organization page"
    },
    {
    target:  window.innerWidth > 756 ? ".desktop-icon": '.bomboclat',
    content: "This is the application icon that links to the application page"
    },
]