/* eslint-disable no-console */
import FastSearchWidget from './FastSearchWidget'
import SearchWidget from './SearchWidget'
import roads from './roads'
import $ from './$'

// Максимальное количество результатов
const maxToSearch = 10

// Инициализация виджетов
new SearchWidget($('#search1'), roads, maxToSearch)
new FastSearchWidget($('#search2'), roads, maxToSearch)