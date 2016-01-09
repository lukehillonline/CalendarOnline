/*
 *  calendarOnline - v1.0.0
 *  A simple easy to use online booking/event calendar..
 *  http://www.lukehillonline.co.uk/
 *
 *  Made by Luke Hill
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {
    
    var pluginName = 'calendarOnline';

    function Plugin ( element, options ) {
        this.element = $(element);
        this._name = pluginName;
        this._defaults = $.fn.calendarOnline.defaults;
        this.options = $.extend( {}, this._defaults, options );

        this.init();
    }

    $.extend(Plugin.prototype, {

		now: moment(),
		date: moment().date(),
		dayOfYear: moment().dayOfYear(),
		month: moment().month(),
		year: moment().year(),
		daysInMonth: moment().daysInMonth(),

        init: function () {
			if(this.options.months) {
				this.addMonths(this.options.months);
			} else {
				this.addMonths(12);
			}

			if(this.options.events) {
				this.displayEvents(this.options.events)
			}
        },

        addMonths: function(numMonths) {
			var i = 0;
			var current_month = this.month;
			var current_year = this.year;
			var content = "";

			// loop through number of months to display (starting from current month)
			while(i < numMonths) {
				// create a month
				var currentYearMonth = moment([current_year, current_month]);
				var begin = currentYearMonth.clone().startOf('isoWeek').isoWeekday(1);

				content += this.addTitle(currentYearMonth);
				content += this.addDaysOfWeek();
				content += this.addDaysOfMonth(begin, current_month);

				if (current_month == 11) {
					++current_year;
					current_month = 0;
				} else {
					++current_month;
				}

				++i;
			}

			this.displayMonths(content);
		},

		addTitle: function(currentYearMonth) {
			return '<p>'+currentYearMonth.format('MMMM YYYY')+'</p>';
		},

		addDaysOfWeek: function() {
			return '<table border=1><thead><tr><td>Mon</td><td>Tues</td><td>Wed</td><td>Thur</td><td>Fri</td><td>Sat</td><td>Sun</td></thead>';
		},

		addDaysOfMonth: function(begin, current_month) {
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
		},

		displayMonths: function(content) {
			this.element.html(content);
		},

		displayEvents: function(events) {
			for(var e=0;e<events.length;e++) {
				var eventStartDate = events[e].startDate,
					eventEndDate = events[e].endDate,
					eventClassName = events[e].className;

				var nextDay = moment(eventStartDate, "DD-MM-YYYY").add('days', 1);

				this.element.find('[data-date="'+eventStartDate+'"]').addClass(eventClassName);
				this.element.find('[data-date="'+eventEndDate+'"]').addClass(eventClassName);
			}
		}

    });

    $.fn.calendarOnline = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };

    $.fn.calendarOnline.defaults = {
        months: 12
    };

})( jQuery, window, document );