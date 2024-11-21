\\===================Ссылка в меню срабатывает со 2 раза =====================

	1)Добавить ссылкам data - count;
2)При клике получать атрибут у e.target.dataset.count;
3)Проверка if (e.target.dataset.count <= 1) {
	e.preventDefault()
};



/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
===================================================Отправка формы POST через ajax (jquery)=======================================
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

// получаем урл этй же страницы
let thisURL = `https://integrate.chameleon-games.ru${window.location.pathname}`;

// ===========получаем форму или инпут================
$(".table__header-search").on("input", function (event) {
	event.prevaentDefault();
	// получаем параметры для передачи
	let name = $(this).attr("name");
	let value = $(this).val();
	sendData = {
		[name]: value
	};
	// передаем через ajax
	$.ajax({
		url: `${thisURL}`,
		method: 'post',
		dataType: 'html',
		data: sendData,
		success: function () {
			console.log('ajax search- ok');
		}
	});
});


/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
===================================================Получить php массив в js=======================================
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

<script>
	const arResult = <?= json_encode($arListCompare); ?>;
</script>


/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
===================================================Подключение яндекс карты по бесплатному api=======================================
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

// ------------- cdn подключение ------------------
<script src="https://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU"></script>

// ------------- html оболочка для карты ------------------
<div id="map" style="width: 100%; height: 400px"></div>

// ------------- инициализация карты ------------------
<script>
	ymaps.ready(init);
	var myMap,
		myPlacemark;

	function init() {
		// ---Создает карту------
		myMap = new ymaps.Map("map", {
			center: [55.646569, 37.670339],
			zoom: 16,
		});

		// ---регистрация метки------- 
		myPlacemark = new ymaps.Placemark([55.646569, 37.670339], { hintContent: "ООО «Услуги для бизнеса»", balloonContent: "ООО «Услуги для бизнеса»" });

		// ---Добавление метки на карту------- 
		myMap.geoObjects.add(myPlacemark);
	}

</script>


/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
===================================================Навигация для статьи блога js=======================================
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

$(document).ready(function () {
	function getLinkSidbar() {
		let pageUrl = window.location.href;
		let media = window.matchMedia('(max-width: 992px)')


		if (pageUrl.includes('/s4b.diusrajon.tw1.ru/blog/')) {
			let block = $(".aside__list");
			let arrLink = $(".article-content-col>h2");

			arrLink.each(function () {
				if ($(this).attr("id") != "") {
					let name = $(this).text();
					if (name != "") {
						let id = translit(name);
						$(this).attr("id", `${id}`)
					}
				}
			})




			arrLink.each(function () {
				block.append(`
                    <li class="aside__list-item">
                    <a href="#${$(this).attr("id")}" class="aside__list-link">${$(this).text()}</a>
                    </li>
                    `)
			})
		}

		if (media.match) {

		} else {
			$(".nav_show").on("click", function () {
				$(".news-aside__title-wrap").toggleClass("active")
				$(".news-aside").toggleClass("show");
			})
		}

	};
	getLinkSidbar();

	function translit(word) {
		var answer = '';
		var converter = {
			'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
			'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
			'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
			'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
			'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
			'ш': 'sh', 'щ': 'sch', 'ь': '_', 'ы': 'y', 'ъ': '_',
			'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '_',

			'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
			'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
			'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
			'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
			'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch',
			'Ш': 'Sh', 'Щ': 'Sch', 'Ь': '_', 'Ы': 'Y', 'Ъ': '_',
			'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
		};

		for (var i = 0; i < word.length; ++i) {
			if (converter[word[i]] == undefined) {
				answer += word[i];
			} else {
				answer += converter[word[i]];
			}
		}

		return answer;
	}
});