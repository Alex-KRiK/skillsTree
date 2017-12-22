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

var createElement = function (value) {
    var newElement = document.createElement('div');
    newElement.textContent = value;
    container.appendChild(newElement);
};

var drawDataRocketsTree = function (node) {
    var keysNode = Object.keys(node);
    for (var index = 0; index < keysNode.length; index++) {
        if (typeof(node[keysNode[index]]) === 'string') {
            createElement(node[keysNode[index]]);
        } else {
            var newNode = node[keysNode[index]];
            drawDataRocketsTree(newNode);
        }
    }
};

//second version
var drawDataRocketsTree2 = function (node) {
    createElement(node.name);
    if (!node.skills) {
        return;
    }
    for (var index = 0; index < node.skills.length; index++) {
        drawDataRocketsTree2(node.skills[index]);
    }
};

drawDataRocketsTree2(jsonTree);