import Timer from './Timer'
import $ from './$'

/**
 * Класс реализует виджет поиска
 * @class
 */
class SearchWidget {
	/**
	 * Создаёт экземпляр SearchWidget
	 * @constructs
	 * @param {HTMLElement} el - Родительский элемент
	 * @param {String[]} data - Данные для поиска
	 * @param {Number} maxToSearch - Максимальное количество данных для поиска
	 */
	constructor (el, data, maxToSearch = Number.MAX_VALUE) {
		this.$el = el
		this.$input = $('.input', el)
		this.$list = $('.list', el)
		this.$help = $('.help', el)
		this.$log = $('.log', el)

		this._data = data
		this._maxToSearch = maxToSearch
		this._timer = new Timer()

		this.$input.addEventListener('input', event => this._onInput(event.target.value), false)
	}

	/**
	 * Устанавливает данные для элемента с результатом поиска
	 * @param  {String[]|Set} data - Данные для с результатом поиска
	 * @return {SearchWidget} Возвращает текущий экземпляр класса
	 */
	setList (data) {
		if (data && (data.length > 0 || data.size > 0)) {
			this.$list.innerHTML = `<li>${[...data].join('</li><li>')}</li>`
		} else {
			this.$list.innerHTML = ''
		}

		return this
	}

	/**
	 * Устанавливает данные для элемента с информацией
	 * @param  {String} text - Информационный текст
	 * @return {SearchWidget} Возвращает текущий экземпляр класса
	 */
	setHelp (text) {
		this.$help.innerHTML = text

		return this
	}

	/**
	 * Устанавливает данные для элемента с логами
	 * @param  {String} text - Текст логов
	 * @return {SearchWidget} Возвращает текущий экземпляр класса
	 */
	setLog (text) {
		this.$log.innerHTML = text

		return this
	}

	/**
	 * Функцияя обратного вызова для события input, элемента input
	 * @private
	 * @param  {String} value - Введённые данные
	 */
	_onInput (value) {
		if (!value) {
			this.setList(null)
			return
		}

		const query = value.toLowerCase()
		const maxToSearch = this._maxToSearch
		const data = this._data
		const list = new Set()
		const len = data.length
		let numFound = 0

		this._timer.start()

		for (let i = 0; i < len; ++ i) {
			if (data[i].toLowerCase().indexOf(query) >= 0) {
				list.add(data[i])

				numFound += 1

				if (numFound >= maxToSearch) {
					break
				}
			}
		}

		const time = this._timer.end()

		this
			.setLog(`${time}ms`)
			.setList(list)
	}
}

export default SearchWidget