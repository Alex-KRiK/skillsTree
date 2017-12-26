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

var createNodes = function (value, array) {
    container.innerHTML = '<spane>' + value + '</spane>' + '<hr>';

    createNodesSkills(container, array);
};

var createNodesSkills = function (container, array) {
    var ul = document.createElement('ul');
    ul.style.display = 'block';
    container.appendChild(ul);

    for (var index = 0; index < array.length; index++) {
        var li = document.createElement('li');
        li.textContent = array[index].name;
        ul.appendChild(li);

        if (array[index].skills) {
            li.className = 'menu';

            createNodesSkills(li, array[index].skills);
        }
    }
};

var drawDataRocketsTree2 = function (node) {
    createNodes(node.name, node.skills);
};

drawDataRocketsTree2(jsonTree);

container.addEventListener('click', function (event) {
    var element = event.target;

    if ((element.className) && (element.firstElementChild.style.display === 'block')) {
        element.firstElementChild.style.display = 'none';
    } else if ((element.className) && (element.firstElementChild.style.display === 'none')) {
        element.firstElementChild.style.display = 'block';
    }
});





