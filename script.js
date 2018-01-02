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
    var span = document.createElement('span');
    span.classList.add('title');
    var hr = document.createElement('hr');
    span.textContent = value;
    container.appendChild(span);
    container.appendChild(hr);

    createNodesSkills(container, array);
};

var createLi = function (value) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    span.textContent = value;
    li.appendChild(span);
    return li;
};

var createNodesSkills = function (container, array) {
    var ul = document.createElement('ul');
    container.appendChild(ul);

    for (var index = 0; index < array.length; index++) {
        var li = createLi(array[index].name);
        ul.appendChild(li);

        if (array[index].skills) {
            li.classList.add('opened');
            createNodesSkills(li, array[index].skills);
        }
    }
};

var drawDataRocketsTree = function (node) {
    createNodes(node.name, node.skills);
};
drawDataRocketsTree(jsonTree);

container.addEventListener('click', function closeOpenBranch (event) {
    var element = event.target;

    if (element.tagName === 'SPAN' && element.parentNode.classList.contains('opened')) {
        element.parentNode.classList.toggle('closed');
        element.classList.toggle('dashed');
    }
});

container.addEventListener('contextmenu', function addNewElement (event) {
    var element = event.target;

    if (element.tagName === 'SPAN') {
        event.preventDefault();
        var newCategory = prompt('Add new category', '');

        if (newCategory !== '' && newCategory !== null) {
            var li = createLi(newCategory);

            if (element.nextSibling) {
                element.nextSibling.appendChild(li);
            } else {
                element.parentNode.classList.add('opened');
                var ul = document.createElement('ul');
                ul.appendChild(li);
                element.parentNode.appendChild(ul) ;
            }
        }
    }
});