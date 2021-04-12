const parseDate = require('date-fns/parse')
const formatDate = require('date-fns/format')

module.exports = (date = new Date(), format = 'dd MMM yyyy') => {
	return formatDate(date, format)
}