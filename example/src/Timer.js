/**
 * Класс реализует таймер для замеров скорости работы различных частей программы
 * @class
 */
class Timer {
	/**
	 * Создаёт экземпляр Timer
	 * @constructs
	 */
	constructor () {
		this._last = 0
	}

	/**
	 * Возвращает текущее время
	 * @return {Number} - Время в миллисекундах
	 */
	static getTime () {
		if (window.performance && window.performance.now) {
			return window.performance.now()
		}

		return +Date.now()
	}

	/**
	 * Сохраняет текущее время
	 */
	start () {
		this._last = this.constructor.getTime()
	}

	/**
	 * Возвращает количество миллисекунд, прошедших с предыдущей точки сохранения
	 * @return {Number} - Время в миллисекундах
	 */
	end () {
		return this.constructor.getTime() - this._last
	}
}

export default Timer