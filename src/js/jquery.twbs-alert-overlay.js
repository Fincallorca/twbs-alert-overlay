(function($)
	{
		if( $.twbsAlertOverlay == null )
		{
			$.twbsAlertOverlay = function(options)
			{
				return new TwbsAlertOverlay(options);
			}
		}
	}($)
);