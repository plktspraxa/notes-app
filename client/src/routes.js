const { default: Notes } = require("pages/notes/Notes");

const routes = [
    {
        name: "Notes",
        route: "/notes",
        component: <Notes/>
    },
]

export default routes;