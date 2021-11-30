'use strict';
document.addEventListener('DOMContentLoaded', () => { // в начале загружается DOM-структура, а после оставшийся код
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    let adv = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        poster = document.querySelector('.promo__bg'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'), //получаем доступ к форме отправки просмотренного фильма
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]'); //получаем доступ к checkbox прямо через атрибут

    addForm.addEventListener('submit', (event) => { //назнач обработчик события на форму, чтобы отследить отправку исп submit
        event.preventDefault(); //отменяем перезагрузку страницы после отправки формы "Подтвердить"
        let newFilm = addInput.value; //обращаемся к addInput и проверяем его значение, чтобы понять ввел ли что-то пользователь
        let favorite = checkbox.checked; // получаем отмечен checkbox или нет

        // movieDB.movies.push(newFilm); //при помощи метода push() помещаем новый полученый фильм в заданную переменную
        // sortArr(movieDB.movies); //по алфавиту
        // createMovieList(movieDB.movies, movieList);

        if (newFilm.length > 21) { //ограничиваем кол-во вводимых символов 
            newFilm = `${newFilm.substring(0, 22)}...`; //выводим текст начиная с 0 символа и заканчивая 22, но не включая его
        }

        if (favorite) { //если true выводим надпись в консоль
            console.log("Добавляем новый фильм");
        }

        if (newFilm) { //условие при котором в список не будет попадать пустая строка(если newFilm не содержит какой-то value)
            movieDB.movies.push(newFilm); //при помощи метода push() помещаем новый полученый фильм в заданную переменную
            sortArr(movieDB.movies); //по алфавиту
            createMovieList(movieDB.movies, movieList);
        }
        addForm.reset(); //очищаем форму после отправки
    });


    adv.forEach(item => {
        item.remove();
    });

    let makeChanges = () => {
        genre.textContent = 'драма'; //меняем текст

        poster.style.backgroundImage = 'url("img/bg.jpg")'; //меняем задний фон
    };
    makeChanges();

    let sortArr = (arr) => { //сортируем массив по алфавиту
        arr.sort();
    };
    sortArr(movieDB.movies);

    function createMovieList(films, parent) {
        parent.innerHTML = ''; //очищаем список просмотренных фильмов
        films.forEach((film, i) => { // film-это каждый отдельный эл в массиве, i-порядковый номер
            parent.innerHTML += ` 
                <li class="promo__interactive-item">${i+1} ${film}
                    <div class="delete"></div>
                </li>
            `; // динамически создаем список фильмов на странице
        });

        document.querySelectorAll('.delete').forEach((btn, i) => { //обращаемся к классу delete(сущ в css)
            btn.addEventListener('click', () => { //при помощи forEach перебираем, 
                btn.parentElement.remove(); //обращаемся к родительскому эл и удаляем через remove()
                movieDB.movies.splice(i, 1); // при помощи splice вырезаем эл из базы данных(i-номер с которого начинаем счет)

                createMovieList(movieDB.movies, movieList); //вызываем функцию внутри себя(рекурсия), при удалении фильма из списка будет заново формироваться список с оставшимися фильмами на странице и нумерация не будет сбиваться
            });
        });
    }
    createMovieList(movieDB.movies, movieList); //при создании функции films-это movieDB.moviesб а parent-это movieList
});