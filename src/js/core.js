/**
 *
 * @param {Object} options  - initial options
 *
 * @property {Object}         _options              - properties of SelectableTable
 * @property {string}         _options.overlay      - all elements which can be selected
 * @property {boolean}        _options.overlayAuto  - all elements which can be selected
 * @property {Array.<Object>} _options.messages     - all elements which can be selected
 *
 * @constructor
 */
function TwbsAlertOverlay(options)
{
	this._options = $.extend(TwbsAlertOverlay.DEFAULTS, options || {});

	if( this._options.messages.length === 0 )
	{
		return;
	}

	this.$_overlay = null;

	this._createOverlay = function()
	{
		let selector_parts = this._options.overlay.split(" ");

		let last_selector = selector_parts[selector_parts.length - 1];

		let tag = "div";
		let id = "";
		let classes = "";

		if( last_selector.search(/^[^#\.]+/g) > -1 )
		{
			tag = last_selector.match(/^[^#\.]+/g);
		}

		let $overlay = $(document.createElement(tag));

		if( last_selector.search(/#[^#\.\s]+/g) > -1 )
		{
			let ids = last_selector.match(/#[^#\.\s]+/g).map(function(_id)
			{
				return _id.substring(1);
			});

			if( ids.length > 1 )
			{
				throw new Error("Multiple ids in option overlay: " + this._options.overlay);
			}

			$overlay.attr("id", ids[0]);
		}

		if( last_selector.search(/\.[^#\.\s]+/g) > -1 )
		{
			classes = last_selector.match(/\.[^#\.\s]+/g).map(function(_id)
			{
				return _id.substring(1);
			});

			$overlay.attr("class", classes.join(" "));
		}

		$overlay.css("display", "none");

		$overlay.append($(document.createElement('div')));

		return $overlay;
	};

	this._appendOverlay = function()
	{
		let selector_parts = this._options.overlay.split(" ");
		selector_parts.pop();

		let selector = selector_parts.join(" ");

		if( selector === "" )
		{
			selector = "body";
		}

		let $append_to = $(selector);

		if( $append_to.length < 1 )
		{
			throw new Error("No element found to append overlay: " + this._options.overlay);
		}

		this.$_overlay.appendTo($append_to);
	};

	this._initializeOverlay = function()
	{
		// jQuery Selctor mit der ID füllen
		this.$_overlay = $(this._options.overlay);

		// globales Overlay initalisiern (falls es verwendet werden soll und noch nicht existiert)
		if( this.$_overlay.length === 0 )
		{
			if( !this._options.overlayAuto && window.console && console.warn )
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

		$("body").addClass("alert-overlay-open");
		this.$_overlay.html(this._getAlertsElement()).show();
	};

	this._destroy = function()
	{
		$("body").removeClass("alert-overlay-open");
		this.$_overlay.hide();
	};

	/**
	 * @private
	 */
	this._getAlertsElement = function()
	{
		let $element = $('<div class="container"></div>');

		this._options.messages.forEach(function(_message)
		{
			this._getAlertElement(_message.type, _message.content).appendTo($element);
		}.bind(this));

		return $element;
	};

	this._getAlertElement = function(type, content)
	{
		return $('<div class="alert alert-' + type + '" role="alert">' + content + '</div>');
	};

	this._initializeOverlay();
}

TwbsAlertOverlay.DEFAULTS = {
	overlay: "#alert-overlay",
	overlayAuto: true,
	messages: []
};