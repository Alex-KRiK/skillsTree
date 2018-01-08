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

var branchIndicesArray = [];
var container = document.querySelector('.container');

var getDateInSessionStorage = function () {
    if (sessionStorage.getItem('newJsonTree')) {
        jsonTree = JSON.parse(sessionStorage.getItem('newJsonTree'));
    }
};
getDateInSessionStorage();

var createNodes = function (value, array) {
    var span;
    var hr;
    span = document.createElement('span');
    span.classList.add('title');
    hr = document.createElement('hr');
    span.textContent = value;
    container.appendChild(span);
    container.appendChild(hr);

    createNodesSkills(container, array);
};

var createNodeLi = function (value) {
    var li;
    var span;
    li = document.createElement('li');
    span = document.createElement('span');
    span.textContent = value;
    li.appendChild(span);
    return li;
};

var createNodesSkills = function (container, arraySkills) {
    var ul;
    var li;
    var index;
    ul = document.createElement('ul');
    ul.classList.add('skills');
    container.appendChild(ul);

    for (index = 0; index < arraySkills.length; index++) {
        li = createNodeLi(arraySkills[index].name);
        ul.appendChild(li);

        if (arraySkills[index].skills) {
            li.classList.add('opened');
            li.firstChild.classList.add('pointer');
            createNodesSkills(li, arraySkills[index].skills);
        }
    }
};

var drawDataRocketsTree = function (node) {
    createNodes(node.name, node.skills);
};
drawDataRocketsTree(jsonTree);

container.addEventListener('click', function closeAndOpenBranch(event) {
    var element;
    element = event.target;
    if (element.tagName === 'SPAN' && element.parentNode.classList.contains('opened')) {
        element.parentNode.classList.toggle('closed');
        element.classList.toggle('dashed');
    }
});

container.addEventListener('contextmenu', function addNewElement(event) {
    var element;
    var nameNewBranch;
    var li;
    var ul;
    element = event.target;
    if (element.tagName === 'SPAN') {
        event.preventDefault();
        nameNewBranch = prompt('Enter the name of the new tree branch ', '');

        if (nameNewBranch !== '' && nameNewBranch !== null) {
            li = createNodeLi(nameNewBranch);

            if (element.nextSibling) {
                element.nextSibling.appendChild(li);
            } else {
                element.classList.toggle('pointer', true);
                element.parentNode.classList.add('opened');
                ul = document.createElement('ul');
                ul.classList.add('skills');
                ul.appendChild(li);
                element.parentNode.appendChild(ul);
            }
            indicesLiInTree(li, nameNewBranch);
        }
    }
});

var searchIndexLi = function (nodeLi) {
    var indexLi;
    var parentNodeArray;
    parentNodeArray = Array.prototype.slice.call(nodeLi.parentElement.children);
    indexLi = parentNodeArray.indexOf(nodeLi);
    branchIndicesArray.unshift(indexLi);
};

var indicesLiInTree = function (nodeLi, nameNewBranch) {
    if (nodeLi && nodeLi.parentElement) {
        if (nodeLi.parentElement.classList.contains('skills')) {
            searchIndexLi(nodeLi);
        }
        indicesLiInTree(nodeLi.parentElement.parentElement, nameNewBranch);
        return;
    }
    saveChangesInJsonTree(branchIndicesArray, nameNewBranch);
};

var saveChangesInJsonTree = function (branchIndicesArray, nameNewBranch) {
    var rootNode = jsonTree;
    var index;
    var indexBranch;
    for (index = 0; index < branchIndicesArray.length; index++) {
        if (index < branchIndicesArray.length - 1) {
            indexBranch = branchIndicesArray[index];
            rootNode = rootNode.skills[indexBranch];
        } else if (!rootNode.skills) {
            indexBranch = branchIndicesArray[index - 1];
            rootNode['skills'] = [{name: nameNewBranch}];
        } else {
            indexBranch = branchIndicesArray[index];
            rootNode.skills[indexBranch] = {name: nameNewBranch};
        }
    }
    branchIndicesArray.splice(0, branchIndicesArray.length);
    addChangeInSessionStorage();
};

var addChangeInSessionStorage = function () {
    sessionStorage.setItem('newJsonTree', JSON.stringify(jsonTree));
};