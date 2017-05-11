/** @preserve Twitter Bootstrap Alert Overlay 0.1.1
 * Available under the MIT license.
 * See https://github.com/Fincallorca/twbs-alert-overlay/ for more information.
 */

/**
 *
 * @property {Object}         _options              - properties of SelectableTable
 * @property {string}         _options.overlay      - all elements which can be selected
 * @property {boolean}        _options.overlayAuto  - all elements which can be selected
 * @property {Array.<Object>} _options.messages     - all elements which can be selected
 */
class TwbsAlertOverlay
{

	/**
	 *
	 * @param {string} type    - one of the bootstrap classes `success`, `info`, `warning` or `danger`
	 * @param {string} content - the text/html content of the alert element
	 * @returns {object}
	 * @private
	 */
	static _GetAlertElement(type, content)
	{
		return $("<div class=\"alert alert-" + type + "\" role=\"alert\">" + content + "</div>");
	};

	/**
	 *
	 * @param {Object} options  - initial options
	 */
	constructor(options)
	{
		this._options = $.extend({}, TwbsAlertOverlay.DEFAULTS, options || {});

		if ( this._options.messages.length === 0 )
		{
			return;
		}

		this.$_overlay = null;

		TwbsAlertOverlay._scrollPosition = {
			top: null,
			left: null
		};

		this._initializeOverlay();
	}

	/**
	 * @returns {object} returns the created jQuery object
	 * @private
	 */
	_createOverlay()
	{
		let selector_parts = this._options.overlay.split(" ");

		let last_selector = selector_parts[ selector_parts.length - 1 ];

		let tag = "div";
		let id = "";
		let classes = "";

		if ( last_selector.search(/^[^#\.]+/g) > -1 )
		{
			tag = last_selector.match(/^[^#\.]+/g);
		}

		let $overlay = $(document.createElement(tag));

		if ( last_selector.search(/#[^#\.\s]+/g) > -1 )
		{
			let ids = last_selector.match(/#[^#\.\s]+/g).map(function (_id)
			{
				return _id.substring(1);
			});

			if ( ids.length > 1 )
			{
				throw new Error("Multiple ids in option overlay: " + this._options.overlay);
			}

			$overlay.attr("id", ids[ 0 ]);
		}

		if ( last_selector.search(/\.[^#\.\s]+/g) > -1 )
		{
			classes = last_selector.match(/\.[^#\.\s]+/g).map(function (_id)
			{
				return _id.substring(1);
			});

			$overlay.attr("class", classes.join(" "));
		}

		$overlay.css("display", "none");

		$overlay.append($(document.createElement("div")));

		return $overlay;
	};

	/**
	 *
	 * @private
	 */
	_appendOverlay()
	{
		let selector_parts = this._options.overlay.split(" ");
		selector_parts.pop();

		let selector = selector_parts.join(" ");

		if ( selector === "" )
		{
			selector = "body";
		}

		let $append_to = $(selector);

		if ( $append_to.length < 1 )
		{
			throw new Error("No element found to append overlay: " + this._options.overlay);
		}

		this.$_overlay.appendTo($append_to);
	};

	/**
	 *
	 * @private
	 */
	_initializeOverlay()
	{
		// jQuery Selctor mit der ID füllen
		this.$_overlay = $(this._options.overlay);

		// globales Overlay initalisiern (falls es verwendet werden soll und noch nicht existiert)
		if ( this.$_overlay.length === 0 )
		{
			if ( !this._options.overlayAuto && window.console && console.warn )
			{
				console.warn("Overlay '" + this._options.overlay + "' for twbsAlertOverlay could not be found!");
			}
			else
			{
				this.$_overlay = this._createOverlay();

				this._appendOverlay();
			}
		}

		this.$_overlay.click(this._destroy.bind(this));

		this._showOverlay();
	};

	/**
	 *
	 * @private
	 */
	_destroy()
	{
		this._hideOverlay();
	};

	/**
	 *
	 * @private
	 */
	_getAlertsElement()
	{
		let $element = $("<div class=\"container\"></div>");

		this._options.messages.forEach(function (_message)
		{
			TwbsAlertOverlay._GetAlertElement(_message.type, _message.content).appendTo($element);
		}.bind(this));

		return $element;
	};

	/**
	 *
	 * @private
	 */
	_showOverlay()
	{
		TwbsAlertOverlay._scrollPosition.top = $(document).scrollY;
		TwbsAlertOverlay._scrollPosition.left = $(document).scrollX;

		let $body = $("body");

		if ( document.body.scrollHeight > document.documentElement.clientHeight )
		{
			$body.css("overflow-y", "scroll");
		}

		if ( document.body.scrollWidth > document.documentElement.clientWidth )
		{
			$body.css("overflow-x", "scroll");
		}

		$body.addClass("alert-overlay-open");

		this.$_overlay.html(this._getAlertsElement()).show();
	};

	/**
	 *
	 * @private
	 */
	_hideOverlay()
	{
		$("body").removeClass("alert-overlay-open");
		this.$_overlay.hide();
	};
}

/**
 *
 * @type {{overlay: string, overlayAuto: boolean, messages: Array}}
 */
TwbsAlertOverlay.DEFAULTS = {
	overlay: "#alert-overlay",
	overlayAuto: true,
	messages: []
};

$(document).on("scroll", function ()
{
	if ( $("body").hasClass("alert-overlay-open") )
	{
		window.scrollTo(TwbsAlertOverlay._scrollPosition.left, TwbsAlertOverlay._scrollPosition.top);
	}
});