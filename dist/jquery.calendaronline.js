/*
 *  calendarOnline - v1.0.0
 *  A simple easy to use online booking/event calendar..
 *  http://www.lukehillonline.co.uk/
 *
 *  Made by Luke Hill
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'calendarOnline',
        defaults = {
			months: 12
        },
        now = moment(),
		date = moment().date(),
		dayOfYear = moment().dayOfYear(),
		month = moment().month(),
		year = moment().year(),
		daysInMonth = moment().daysInMonth();

    // The actual plugin constructor
    function calendarOnline( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    calendarOnline.prototype.init = function () {
        
        if(options.months) {
			addMonths(options.months);
		} else {
			addMonths(12);
		}

		if(options.events) {
			displayEvents(options.events)
		}

    };

    calendarOnline.prototype.addMonths = function(numMonths) {
		var i = 0;
		var current_month = month;
		var current_year = year;
		var content = "";

		// loop through number of months to display (starting from current month)
		while(i < numMonths) {
			// create a month
			var currentYearMonth = moment([current_year, current_month]);
			var begin = currentYearMonth.clone().startOf('isoWeek').isoWeekday(1);

			content += addTitle(currentYearMonth);
			content += addDaysOfWeek();
			content += addDaysOfMonth(begin, current_month);

			if (current_month == 11) {
				++current_year;
				current_month = 0;
			} else {
				++current_month;
			}

			++i;
		}

		displayMonths(content);
	}

	calendarOnline.prototype.addTitle = function(currentYearMonth) {
		return '<p>'+currentYearMonth.format('MMMM YYYY')+'</p>';
	}

	calendarOnline.prototype.addDaysOfWeek = function() {
		return '<table border=1><thead><tr><td>Mon</td><td>Tues</td><td>Wed</td><td>Thur</td><td>Fri</td><td>Sat</td><td>Sun</td></thead>';
	}

	calendarOnline.prototype.addDaysOfMonth = function(begin, current_month) {
		var monthContent = "<tbody>"
		for (var w=0; w < 5; w++) {
			monthContent += '<tr>';
			// loop through days of week
			for (var d=0; d<7; d++) {
				monthContent += '<td data-date="'+begin.format('DD-MM-YYYY')+'">';
				if (begin.month() == current_month) {
					monthContent += begin.format('DD');
				}
				monthContent += '</td>';
				begin.add('d', 1);
			}
			monthContent += '</tr>';
		}
		monthContent += "</tr></tbody></table>";

		return monthContent;
	}

	calendarOnline.prototype.displayMonths = function(content) {
		target.html(content);
	}

	calendarOnline.prototype.displayEvents = function(events) {
		for(var e=0;e<events.length;e++) {
			var eventStartDate = events[e].startDate,
				eventEndDate = events[e].endDate,
				eventClassName = events[e].className;

			console.log(moment(eventStartDate, "DD-MM-YYYY"));
			var nextDay = moment(eventStartDate, "DD-MM-YYYY").add('days', 1);
			console.log(moment(nextDay, "DD-MM-YYYY"));
			console.log(moment(eventEndDate, "DD-MM-YYYY"));
			console.log(moment(eventEndDate, "DD-MM-YYYY").diff(moment(eventStartDate, "DD-MM-YYYY"), 'days'));

			target.find('[data-date="'+eventStartDate+'"]').addClass(eventClassName);
			target.find('[data-date="'+eventEndDate+'"]').addClass(eventClassName);
		}
	}

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[calendarOnline] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );