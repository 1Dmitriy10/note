\\===================Ссылка в меню срабатывает со 2 раза=====================

1)Добавить ссылкам data-count;
2)При клике получать атрибут у e.target.dataset.count;
3)Проверка if (e.target.dataset.count <= 1) {
				e.preventDefault()};