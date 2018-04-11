import SearchTree from 'search-tree'
import SearchWidget from './SearchWidget'

/**
 * Класс реализует виджет быстрого поиска
 * @class
 */
class FastSearchWidget extends SearchWidget {
	/**
	 * Создаёт экземпляр FastSearchWidget
	 * @constructs
	 * @param {HTMLElement} el - Родительский элемент
	 * @param {String[]} data - Данные для поиска
	 * @param {Number} maxToSearch - Максимальное количество данных для поиска
	 */
	constructor (el, data, maxToSearch) {
		super(el, data, maxToSearch)

		this._tree = new SearchTree()

		// Инициализация дерева и замер затраченного времени
		this._timer.start()
		this._tree.build(data, maxToSearch)
		const time = this._timer.end()

		// Вывод затраченного времени
		this.setHelp(`Дерево построено за:<br><strong>${time}ms</strong>`)
	}

	/**
	 * @inheritDoc
	 */
	_onInput (value) {
		if (!value) {
			this.setList(null)
			return
		}

		this._timer.start()

		const list = this._tree.search(value)
		const time = this._timer.end()

		this
			.setLog(`${time}ms`)
			.setList(list)
	}
}

export default FastSearchWidget