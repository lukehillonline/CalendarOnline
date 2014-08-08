$(function() {
	
	function calendaronline(options) {

		var now = moment();
		var date = moment().date();
		var dayOfYear = moment().dayOfYear();
		var month = moment().month();
		var year = moment().year();
		var daysInMonth = moment().daysInMonth();

		var target = $(options.container);

		if(options.months) {
			addMonths(options.months);
		} else {
			addMonths(6);
		}

		function addMonths(numMonths) {
			var i = 0;
			var current_month = month;
			var current_year = year;

			// loop through number of months to display (starting from current month)
			while(i < numMonths) {
				// create a month
				var curr = moment([current_year, current_month]);
				var begin = curr.clone().startOf('isoWeek').isoWeekday(1);

				var content = '<p>'+curr.format('MMMM YYYY')+'</p>'
							+ '<table border=1><thead><tr><td>Mon</td><td>Tues</td><td>Wed</td><td>Thur</td><td>Fri</td><td>Sat</td><td>Sun</td></thead><tbody>';

				for (var w=0; w < 5; w++) {
					content += '<tr>';
					// loop through days of week
					for (var d=0; d<7; d++) {
						content += '<td>';
						if (begin.month() == current_month) {
							content += begin.format('DD MM YYYY');
						}
						content += '</td>';
						begin.add('d', 1);
					}
					content += '</tr>';
				}

				content += '</tr></tbody></table>';

				target.append(content);

				if (current_month == 11) {
					++current_year;
					current_month = 0;
				} else {
					++current_month;
				}

				++i;
			}
		}
	}

	calendaronline({
		months: 6,
		container: '#calendar'
	})

});