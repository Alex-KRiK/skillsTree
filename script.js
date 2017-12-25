var jsonTree = {
    name: "Frontend",
    skills: [
        {
            name: "HTML & CSS",
            skills: [
                {
                    name: "Understanding block, inline and table models"
                },
                {
                    name: "Stylesheets",
                    skills: [
                        {
                            name: "Positioning",
                            skills: [
                                {
                                    name: "static, relative and absolute, fixed, sticky"
                                }
                            ]
                        },
                        {
                            name: "Understanding of box model"
                        },
                        {
                            name: "Understanding floating"
                        }
                    ]
                }
            ]
        },
        {
            name: "JavaScript",
            skills: [
                {
                    name: "Core",
                    skills: [
                        {
                            name: "DOM"
                        },
                        {
                            name: "Events"
                        },
                        {
                            name: "Data structures",
                            skills: [
                                {
                                    name: "Primitives and limitations"
                                },
                                {
                                    name: "Object"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Approaches",
                    skills: [
                        {
                            name: "OOP",
                            skills: [
                                {
                                    name: "class"
                                },
                                {
                                    name: "Prototypes"
                                }
                            ]
                        },
                        {
                            name: "Asynchronous programming"
                        }
                    ]
                },
                {
                    name: "Frameworks & libraries",
                    skills: [
                        {
                            name: "React"
                        },
                        {
                            name: "jQuery"
                        }
                    ]
                }
            ]
        }
    ]
};

var container = document.querySelector('.container');

var drawDataRocketsTree2 = function (node) {
    createNodes(node.name, node.skills);
};
drawDataRocketsTree2(jsonTree);

var createNodes = function (value, array) {
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.textContent = value;
    ul.appendChild(li);
    container.appendChild(ul);

    createNodesSkills(li, array);
};

var createNodesSkills = function (li, array) {
    var ul = document.createElement('ul');
    li.appendChild(ul);

    for (var index = 0; index < array.length; index++) {
        li = document.createElement('li');
        li.textContent = array[index].name;
        ul.appendChild(li);

        if (array[index].skills) {
            createNodesSkills(li, array[index].skills);
        }
    }
};


