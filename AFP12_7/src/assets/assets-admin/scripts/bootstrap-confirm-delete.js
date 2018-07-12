/**
 * Bootstrap Confirm Delete
 * Author: Tom Kaczocha <tom@rawphp.org>
 * Licensed under the MIT license
 */

;
( function ( $, window, document, undefined )
{
    var bootstrap_confirm_delete = function ( element, options )
    {
        this.element = $( element );
        this.settings = $.extend(
            {
                debug: false,
                heading: 'Delete',
                message: 'Are You Sure You Want To Remove This Row?',
                btn_ok_label: 'Yes',
                btn_cancel_label: 'No',
                data_type: null,
                callback: null,
                delete_callback: null,
                cancel_callback: null
            }, options || {}
        );

        this.onDelete = function ( event )
        {
            event.preventDefault();

            var plugin = $( this ).data( 'bootstrap_confirm_delete' );

            if ( undefined !== $( this ).attr( 'data-type' ) )
            {
                var name = $( this ).attr( 'data-type' );

                plugin.settings.heading = 'Delete ' + name[ 0 ].toUpperCase() + name.substr( 1 );
                plugin.settings.message = 'Are You Sure You Want To Remove This ' + name + '?';
            }

            if ( null === document.getElementById( 'bootstrap-confirm-delete-container' ) )
            {
                $( 'body' ).append( '<div id="bootstrap-confirm-delete-container"><div id="bootstrap-confirm-dialog" class="modal fade" data-backdrop="static" data-keyboard="false"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-body"><p id="bootstrap-confirm-dialog-text"></p></div><div class="modal-footer"><a id="bootstrap-confirm-dialog-delete-btn" type="button" class="btn next_btn">Yes</a><button id="bootstrap-confirm-dialog-cancel-delete-btn" type="button" class="btn back_btn" data-dismiss="modal">Cancel</button></div></div></div></div></div>' );
            }

            $( '#bootstrap-confirm-dialog-heading' ).html( plugin.settings.heading );
            $( '#bootstrap-confirm-dialog-text' ).html( plugin.settings.message );
            $( '#bootstrap-confirm-dialog-delete-btn' ).html( plugin.settings.btn_ok_label );
            $( '#bootstrap-confirm-dialog-cancel-delete-btn' ).html( plugin.settings.btn_cancel_label );
            $( '#bootstrap-confirm-dialog' ).modal( 'toggle' );

            var deleteBtn = $( 'a#bootstrap-confirm-dialog-delete-btn' );
            var cancelBtn = $( 'a#bootstrap-confirm-dialog-cancel-delete-btn' );
            var hasCallback = false;

            if ( null !== plugin.settings.callback )
            {
                if ( $.isFunction( plugin.settings.callback ) )
                {
                    deleteBtn.attr( 'data-dismiss', 'modal' ).off('.bs-confirm-delete').on( 'click.bs-confirm-delete', { originalObject: $( this ) }, plugin.settings.callback );
                    hasCallback = true;
                }
                else
                {
                    console.log( plugin.settings.callback + ' is not a valid callback' );
                }
            }
            if ( null !== plugin.settings.delete_callback )
            {
                if ( $.isFunction( plugin.settings.delete_callback ) )
                {
                    deleteBtn.attr( 'data-dismiss', 'modal' ).off('.bs-confirm-delete').on( 'click.bs-confirm-delete', { originalObject: $( this ) }, plugin.settings.delete_callback );
                    hasCallback = true;
                }
                else
                {
                    console.log( plugin.settings.delete_callback + ' is not a valid callback' );
                }
            }
            if ( !hasCallback &&  '' !== event.currentTarget.href )
            {
                deleteBtn.attr( 'href', event.currentTarget.href );
            }

            if ( null !== plugin.settings.cancel_callback )
            {
                cancelBtn.off('.bs-confirm-delete').on( 'click.bs-confirm-delete', { originalObject: $( this ) }, plugin.settings.cancel_callback );
            }
        };
    };

    $.fn.bootstrap_confirm_delete = function ( options )
    {
        return this.each( function ()
        {
            var element = $( this );

            if ( element.data( 'bootstrap_confirm_delete' ) )
            {
                return element.data( 'bootstrap_confirm_delete' );
            }

            var plugin = new bootstrap_confirm_delete( this, options );

            element.data( 'bootstrap_confirm_delete', plugin );
            element.off('.bs-confirm-delete').on( 'click.bs-confirm-delete', plugin.onDelete );

            return plugin;
        } );
    };
}( jQuery, window, document, undefined ));
