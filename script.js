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
    li.classList.add('node');
    var span = document.createElement('span');
    span.textContent = value;
    li.appendChild(span);
    return li;
};

var createNodesSkills = function (container, array) {
    var ul = document.createElement('ul');
    ul.classList.add('skills');
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

container.addEventListener('click', function closeOpenBranch(event) {
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
        var newCategory = prompt('Add new category', '');

        if (newCategory !== '' && newCategory !== null) {
            var li = createLi(newCategory);

            if (element.nextSibling) {
                element.nextSibling.appendChild(li);
            } else {
                element.parentNode.classList.add('opened');
                var ul = document.createElement('ul');
                ul.classList.add('skills');
                ul.appendChild(li);
                element.parentNode.appendChild(ul);
            }
            linkLi(li);
        }
    }
});

var indexUl = 0;
var xx = [];

var searchIndexLi = function (parentNode, nodeLi) {
    var indexLi;
    var parentNodeArray;


    parentNodeArray = Array.prototype.slice.call(parentNode.children);
    indexLi = parentNodeArray.indexOf(nodeLi);
    console.log('indexLi = ', indexLi);
    xx.unshift(indexLi);
    console.log('xx = ', xx);


};

var linkLi = function (nodeLi) {
    if (nodeLi && nodeLi.parentElement) {
        if (nodeLi.parentElement.classList.contains('skills')) {
            var ul = nodeLi.parentElement;
            console.log('skills = ', nodeLi.parentElement);
            indexUl += 1;
            console.log('indexUl = ' + indexUl);

            searchIndexLi(ul, nodeLi);
        }

        linkLi(nodeLi.parentElement.parentElement);
    }
};


/*

var x = JSON.stringify(jsonTree['skills'][0]['skills']);
//x = x + '["name"]';
console.log('x = ', x);
x = JSON.parse(x);
console.log('x = ', x);

 console.log(jsonTree['skills'][0]['skills'][0]['name']);
 console.log(jsonTree.skills[0].skills[1].skills[0].skills[0].name);
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







