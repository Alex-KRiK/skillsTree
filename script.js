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
    span.classList.contains('visible');
    span.setAttribute('tabIndex', '1');
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

var drawSkillsTree = function (node) {
    createNodes(node.name, node.skills);
};
drawSkillsTree(jsonTree);

container.addEventListener('click', function closeAndOpenBranch(event) {
    var element;
    element = event.target;
    if (element.tagName === 'SPAN' && element.parentNode.classList.contains('opened')) {
        element.parentNode.classList.toggle('closed');
        element.classList.toggle('dashed');
    }

    var searchChildren = function (node) {
        if (node.firstElementChild) {
            for (var i = 0; i < node.children.length; i++) {
                if (node.children[i].tagName === "SPAN") {
                    node.children[i].classList.add('closeSpan');
                } else if (node.children[i].length) {
                    searchChildren()
                }

                    }
        }
    };

    if (element.nextSibling && element.nextSibling.tagName === 'UL') {
        searchChildren(element.nextSibling);
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
    var rootNode;
    var index;
    var indexBranch;
    rootNode = jsonTree;
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

var focusFirstElementTree = function () {
    var firstElementTree;
    firstElementTree = document.getElementsByTagName('span');
    firstElementTree[1].focus();
    //console.log(firstElementTree);
};
focusFirstElementTree();

/*var keyboardNavigation = function () {
 var spaneCollection;
 var spaneArray;
 var index;
 spaneCollection = document.getElementsByTagName('span');
 spaneArray = Array.prototype.slice.call(spaneCollection);
 for (index = 0; index < spaneArray.length; index++) {

 }
 console.log(spaneCollection);
 console.log(spaneArray);

 };
 keyboardNavigation();*/

container.addEventListener('keydown', function (event) {
    var spaneCollection;
    var spaneArray;
    var curElement;
    var indexSpan;

    curElement = document.activeElement;
    spaneCollection = document.getElementsByTagName('span');
    spaneArray = Array.prototype.slice.call(spaneCollection);
   indexSpan = spaneArray.indexOf(curElement);
    if (event.keyCode === 38 && indexSpan !== 1) {
        spaneArray[indexSpan - 1].focus();
 /*       console.log('childNodes = ', curElement.parentElement.children);
        console.log('spaneArray = ', spaneArray);
        console.log('indexSpan = ', indexSpan);
        console.log('curElement = ', curElement);*/
    } else if (event.keyCode === 38 && indexSpan === 1) {
        spaneArray[spaneArray.length - 1].focus();
/*        console.log('spaneArray = ', spaneArray);
        console.log('indexSpan = ', indexSpan);
        console.log('curElement = ', curElement);*/
    } else if (event.keyCode === 40 && indexSpan !== spaneArray.length - 1) {
        spaneArray[indexSpan + 1].focus();
/*        console.log('spaneArray = ', spaneArray);
        console.log('indexSpan = ', indexSpan);
        console.log('curElement = ', curElement);*/
    } else if (event.keyCode === 40 && indexSpan === spaneArray.length - 1) {
        spaneArray[1].focus();
/*        console.log('spaneArray = ', spaneArray);
        console.log('indexSpan = ', indexSpan);
        console.log('curElement = ', curElement);*/
    }
});
