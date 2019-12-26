var urlBody = 'https://swapi.co/api/people/?page=';
var count = 1;
var list = document.querySelectorAll(".userName");

fetch(urlBody + count)
    .then(function (resp) {
        return resp.json()
    })
    .then(function (data) {
        for (let item of Object.keys(data)) {
            for (let i = 0; i < list.length; i++) {
                list[i].innerHTML = item.name;
            } {

            }
        }
    });