window.onload = function () {
    var urlBody = 'https://swapi.co/api/people/?page=';
    var count = 1;
    var namesList = document.getElementById("list");

    var nextBtn = document.querySelector("#next");
    var backBtn = document.querySelector("#back");

    var table = document.querySelector(".table");
    var td = document.querySelectorAll(".userInfo");
    var filmsList = document.querySelector(".filmsList");

    getNames();

    function getNames() {
        fetch(urlBody + count)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                if (count === 1) {
                    backBtn.setAttribute("disabled", "true");
                    backBtn.style.backgroundColor = "rgba(30, 30, 30, 0.93)";
                } else if (count === 9) {
                    nextBtn.setAttribute("disabled", "true");
                    nextBtn.style.backgroundColor = "rgba(30, 30, 30, 0.93)";
                } else {
                    backBtn.removeAttribute("disabled");
                    nextBtn.removeAttribute("disabled");
                    backBtn.style.backgroundColor = "rgba(13, 13, 13, 0.93)";
                    nextBtn.style.backgroundColor = "rgba(13, 13, 13, 0.93)";
                }

                for (let item of data.results) {
                    let li = document.createElement("LI");
                    li.classList.add("names");
                    li.style.listStyleType = "none";
                    namesList.appendChild(li);
                    li.innerHTML = item.name;
                    li.addEventListener("click", getInfo);
                }
            });
    }

    function getInfo(e) {
        let findUrl = "https://swapi.co/api/people/?search=";
        let findUser = e.target.innerHTML;
        fetch(findUrl + findUser)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                for (let item of data.results) {
                    td[0].innerHTML = item.name;
                    td[1].innerHTML = item.birth_year;
                    td[2].innerHTML = item.gender;

                    for (let film of item.films) {
                        fetch(film)
                            .then(function (response) {
                                return response.json()
                            })
                            .then(function (data) {
                                let filmTitle = document.createElement("LI");
                                filmTitle.style.listStyleType = "none";
                                filmTitle.classList.add("names");
                                filmsList.appendChild(filmTitle);
                                filmTitle.innerHTML = data.title;
                            })
                    }

                    fetch(item.homeworld)
                        .then(function (response) {
                            return response.json()
                        })
                        .then(function (data) {
                            td[4].innerHTML = data.name;
                        });

                    fetch(item.species)
                        .then(function (response) {
                            return response.json()
                        })
                        .then(function (data) {
                            td[5].innerHTML = data.name;
                        });
                }
            });
        table.classList.remove("hidden");
    }

    nextBtn.addEventListener("click", getNextPage);
    backBtn.addEventListener("click", getBackPage);

    function getNextPage() {
        while (namesList.firstChild) {
            namesList.removeChild(namesList.firstChild);
        }
        count++;
        getNames();
    }

    function getBackPage() {
        while (namesList.firstChild) {
            namesList.removeChild(namesList.firstChild);
        }
        count--;
        getNames();
    }

    let backToList = document.querySelector("#backToList");
    backToList.addEventListener("click", removeTable);

    function removeTable() {
        while (filmsList.firstChild) {
            filmsList.removeChild(filmsList.firstChild);
        }
        table.classList.add("hidden");
    }
};