/**
 * Класс генерирует дерево для оптимизации поиска из переданных данных
 * и реализует поиск по нему
 * @class
 */
class SearchTree {
	/**
	 * Создаёт экземпляр SearchTree
	 * @constructs
	 */
	constructor () {
		this._maxToSearch = null
		this._tree = null
		this._suffixes = null
	}

	/**
	 * Запускает построение дерева
	 * @param {String[]} data - Данные для генерации дерева
	 * @param {Number} maxToSearch - Максимальное количество данных для поиска;
	 * Используется для генерации дерева
	 * @return {SearchTree} Возвращает текущий экземпляр класса
	 */
	build (data, maxToSearch = Number.MAX_VALUE) {
		this._maxToSearch = maxToSearch
		this._tree = new Map()
		this._suffixes = new Map()

		const len = data.length

		// Построение массива суффиксов
		for (let i = 0; i < len; ++ i) {
			this._parseString(data[i])
		}

		// Построение дерева
		this._suffixes.forEach((strings, suffix) => {
			this._parseSuffix(suffix, strings)
		})

		return this
	}

	/**
	 * Разбирает строку на суффиксы
	 * @private
	 * @example
	 * abcdef
	 * abcde
	 * abcd
	 * abc
	 * ab
	 * a
	 * @param {String} string - строка
	 */
	_parseString (string) {
		const suffixes = this._suffixes
		const lowerString = string.toLowerCase()
		const len = lowerString.length
		let suffix

		for (let i = 0; i < len; ++ i) {
			suffix = lowerString.slice(i)

			if (!suffixes.has(suffix)) {
				suffixes.set(suffix, new Set())
			}

			suffixes.get(suffix).add(string)
		}
	}

	/**
	 * Добавляет суффиксы в дерево
	 * @private
	 * @param {String} suffix - суффикс
	 * @param {Set} strings - связанные слова
	 */
	_parseSuffix (suffix, strings) {
		const len = suffix.length
		let current = this._tree
		let char, node

		for (let i = 0; i < len; ++ i) {
			char = suffix.charAt(i)

			if (!current.has(char)) {
				node = {
					strings: new Set(strings),
					next: new Map()
				}

				current.set(char, node)
			} else {
				node = current.get(char)

				const iterator = strings[Symbol.iterator]()
				const maxToSearch = this._maxToSearch
				let next, string

				/* eslint-disable-next-line no-cond-assign */
				while (
					node.strings.size < maxToSearch &&
					(next = iterator.next()) &&
					!next.done
				) {
					string = next.value

					if (!node.strings.has(string)) {
						node.strings.add(string)
					}
				}
			}

			current = node.next
		}
	}

	/**
	 * Ищет строки из списка, содержащие переданную подстроку
	 * @param  {String} value - строка для поиска
	 * @return {Set} Возвращает список найденных слов или null
	 */
	search (value) {
		if (value === '') {
			return null
		}

		const query = String(value).toLowerCase()
		const len = query.length
		let next = this._tree
		let char, node

		for (let i = 0; i < len; ++ i) {
			char = query.charAt(i)

			if (next && next.has(char)) {
				node = next.get(char)
				next = node && node.next
			} else {
				return null
			}
		}

		return node ? new Set(node.strings) : null
	}
}

module.exports = SearchTree