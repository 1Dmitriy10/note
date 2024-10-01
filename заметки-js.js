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