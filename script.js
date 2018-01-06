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

var createNodeLi = function (value) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    span.textContent = value;
    li.appendChild(span);
    return li;
};

var createNodesSkills = function (container, arraySkills) {
    var ul = document.createElement('ul');
    ul.classList.add('skills');
    container.appendChild(ul);

    for (var index = 0; index < arraySkills.length; index++) {
        var li = createNodeLi(arraySkills[index].name);
        ul.appendChild(li);

        if (arraySkills[index].skills) {
            li.classList.add('opened');
            createNodesSkills(li, arraySkills[index].skills);
        }
    }
};

var drawDataRocketsTree = function (node) {
    createNodes(node.name, node.skills);
};
drawDataRocketsTree(jsonTree);

container.addEventListener('click', function closeAndOpenBranch(event) {
    var element = event.target;
    if (element.tagName === 'SPAN' && element.parentNode.classList.contains('opened')) {
        element.parentNode.classList.toggle('closed');
        element.classList.toggle('dashed');
    }
});

container.addEventListener('contextmenu', function addNewElement(event) {
    var element = event.target;
    if (element.tagName === 'SPAN') {
        event.preventDefault();
        var nameNewBranch = prompt('Enter new branch name', '');

        if (nameNewBranch !== '' && nameNewBranch !== null) {
            var li = createNodeLi(nameNewBranch);

            if (element.nextSibling) {
                element.nextSibling.appendChild(li);
            } else {
                element.parentNode.classList.add('opened');
                var ul = document.createElement('ul');
                ul.classList.add('skills');
                ul.appendChild(li);
                element.parentNode.appendChild(ul);
            }
            indicesLiInTree(li, nameNewBranch);
        }
    }
});

var branchIndicesArray = [];

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
    var newJsonTree = jsonTree;
    var index;
    var indexBranch;
    for (index = 0; index < branchIndicesArray.length; index++) {
        if (index !== branchIndicesArray.length - 1) {
            indexBranch = branchIndicesArray[index];
            newJsonTree = newJsonTree.skills[indexBranch];
        } else if (!newJsonTree.skills) {
            indexBranch = branchIndicesArray[index - 1];
            newJsonTree['skills'] = [{name: nameNewBranch}];
        } else {
            indexBranch = branchIndicesArray[index];
            newJsonTree.skills[indexBranch] = {name: nameNewBranch};
        }
    }
    branchIndicesArray.splice(0, branchIndicesArray.length);
};


/*
 var saveNewNodeInTree = function (newJsonTree, levelBranch, enterText) {
 if (newJsonTree.skills[levelBranch + 1]) {
 newJsonTree.name =
 }
 //console.log(newJsonTree.skills.length);
 };
 */

//console.log(jsonTree['skills'][0]['skills'][0]['name']);
//console.log(jsonTree.skills[0].skills[1].skills[0].skills[0].name);
/*

 var x = JSON.stringify(jsonTree['skills'][0]['skills']);
 //x = x + '["name"]';
 console.log('x = ', x);
 x = JSON.parse(x);
 console.log('x = ', x);

 */



/*var addNewElementInJsonTree = function () {


 newJsonTree = ;
 };*/
//localStorage.setItem('dataRocketsSkillsTree', JSON.stringify(newJsonTree));

//jsonTree = localStorage.getItem('dataRocketsSkillsTree');

//localStorage.clear();


//localStorage.setItem('myStorage', 'KRiK-storage');
//localStorage.setItem('myStorage2', 'KRiK-storage2');
//localStorage.setItem('myStorage3', 'KRiK-storage3');
//localStorage.removeItem('myStorage3');
//localStorage.clear();

//console.log(localStorage.getItem('myStorage'));


/*localStorage.setItem('dataRocketsSkillsTree', JSON.stringify(jsonTree));
 console.log(localStorage.getItem('dataRocketsSkillsTree'));
 var obj = JSON.parse(localStorage.getItem('dataRocketsSkillsTree'));
 console.dir(obj);*/


/*sessionStorage.setItem('newStorage2', 'KRiK-X');
 sessionStorage.setItem('newStorage', 'KRiK-2');*/







