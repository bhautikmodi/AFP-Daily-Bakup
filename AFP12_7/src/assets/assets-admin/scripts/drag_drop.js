'use strict';

		var CONTACTS = [
		
		];

		CKEDITOR.disableAutoInline = true;

		// Implements a simple widget that represents contact details (see http://microformats.org/wiki/h-card).
		CKEDITOR.plugins.add( 'hcard', {
			requires: 'widget',

			init: function( editor ) {
				editor.widgets.add( 'hcard', {
					allowedContent: 'span(!h-card)',
					requiredContent: 'span(h-card)',
					pathName: 'hcard',

					upcast: function( el ) {
						return el.name == 'span' && el.hasClass( 'h-card' );
					}
				} );

				// This feature does not have a button, so it needs to be registered manually.
				editor.addFeature( editor.widgets.registered.hcard );

				// Handle dropping a contact by transforming the contact object into HTML.
				// Note: All pasted and dropped content is handled in one event - editor#paste.
				editor.on( 'paste', function( evt ) {
					var contact = evt.data.dataTransfer.getData( 'contact' );
					if ( !contact ) {
						return;
					}

					evt.data.dataValue =
						'' +
							'' + contact.name + '' +
							' ' + '';
				} );
			}
		} );

		CKEDITOR.on( 'instanceReady', function() {
			// When an item in the contact list is dragged, copy its data into the drag and drop data transfer.
			// This data is later read by the editor#paste listener in the hcard plugin defined above.
			CKEDITOR.document.getById( 'contactList' ).on( 'dragstart', function( evt ) {
				// The target may be some element inside the draggable div (e.g. the image), so get the div.h-card.
				var target = evt.data.getTarget().getAscendant( 'div', true );

				// Initialization of the CKEditor data transfer facade is a necessary step to extend and unify native
				// browser capabilities. For instance, Internet Explorer does not support any other data type than 'text' and 'URL'.
				// Note: evt is an instance of CKEDITOR.dom.event, not a native event.
				CKEDITOR.plugins.clipboard.initDragDataTransfer( evt );

				var dataTransfer = evt.data.dataTransfer;

				// Pass an object with contact details. Based on it, the editor#paste listener in the hcard plugin
				// will create the HTML code to be inserted into the editor. You could set 'text/html' here as well, but:
				// * It is a more elegant and logical solution that this logic is kept in the hcard plugin.
				// * You do not know now where the content will be dropped and the HTML to be inserted
				// might vary depending on the drop target.
				dataTransfer.setData( 'contact', CONTACTS[ target.data( 'contact' ) ] );

				// You need to set some normal data types to backup values for two reasons:
				// * In some browsers this is necessary to enable drag and drop into text in the editor.
				// * The content may be dropped in another place than the editor.
				dataTransfer.setData( 'text/html', target.getText() );

				
			} );
		} );

		// Initialize the editor with the hcard plugin.
		CKEDITOR.inline( 'editor1', {
			extraPlugins: 'hcard,sourcedialog,justify'
		} );