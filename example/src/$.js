/**
 * Метод для работы с DOM-дереом,
 * ищет элемент по селектору
 * @param  {String} selector - селектор для поиска
 * @param  {HTMLElement} target - root элемент в котором выполнится поиск
 * @return {HTMLElement|null} Возвращает найденный элемент или null
 */
export default (selector, target) => (target || document).querySelector(selector)