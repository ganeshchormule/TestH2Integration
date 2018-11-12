//@<COPYRIGHT>@
//==================================================
//Copyright 2015.
//Siemens Product Lifecycle Management Software Inc.
//All Rights Reserved.
//==================================================
//@<COPYRIGHT>@

/***********************************************************************************/
/** Customizing and overriding functions from (jquery.noty.js)                    **/
/***********************************************************************************/
(function($){
    var notyOutsideClick = function(evt) {
        if( !$(evt.target).closest('#noty_bottom_layout_container').length ) {
            // close all the notifications which are clicked
            $.each($.noty.getClickedNotifications(), function (i, value) {
                value.close();
            });
        }
    };

    $(document).on( "click touchstart", notyOutsideClick );

    // notification popup's array which are clicked by user
    $.noty.notificationsClicked = [];

    // get notification popups which are 'clicked' by user to stay
    $.noty.getClickedNotifications = function () {
        return $.noty.notificationsClicked;
    };

    // set notification popups which are 'clicked' by user to stay
    $.noty.setClickedNotifications = function (arg) {
        $.noty.notificationsClicked.push(arg);
    };

    var old_show = $.notyRenderer.show;
    var old_createModalFor = $.notyRenderer.createModalFor;

    customizedShow = function (notification) {
        var self = notification;

        // adding new css class if buttons are present
        if (self.options.buttons) {
            self.$bar.find('.noty_message').addClass('message_with_buttons');
        }

        (self.options.custom) ? self.options.custom.find(self.options.layout.container.selector).append(self.$bar) : $(self.options.layout.container.selector).append(self.$bar);

        if (self.options.theme && self.options.theme.style)
            self.options.theme.style.apply(self);

        ($.type(self.options.layout.css) === 'function') ? notification.options.layout.css.apply(self.$bar) : self.$bar.css(notification.options.layout.css || {});

        self.$bar.addClass(self.options.layout.addClass);

        self.options.layout.container.style.apply($(self.options.layout.container.selector));

        self.showing = true;

        if (self.options.theme && self.options.theme.style)
            self.options.theme.callback.onShow.apply(notification);

        if ($.inArray('click', self.options.closeWith) > -1)
            self.$bar.css('cursor', 'pointer').one('click', function (evt) {
                self.stopPropagation(evt);
                if (self.options.callback.onCloseClick) {
                    self.options.callback.onCloseClick.apply(self);
                }
                self.close();
            });

        if ($.inArray('hover', self.options.closeWith) > -1)
            self.$bar.one('mouseenter', function () {
                self.close();
            });

        if ($.inArray('button', self.options.closeWith) > -1)
            self.$closeButton.one('click', function (evt) {
                self.stopPropagation(evt);
                self.close();
            });

        // feature which makes the popup to stay when user clicks on it
        if ($.inArray('stayOnClick', self.options.closeWith) > -1)
            self.$bar.one('click', function (evt) {
                self.stopPropagation(evt);
                clearTimeout(self.$timeout);
                // set the popup which are clicked
                $.noty.setClickedNotifications(self);
            });

        if ($.inArray('button', self.options.closeWith) === -1)
            self.$closeButton.remove();

        if (self.options.callback.onShow)
            self.options.callback.onShow.apply(self);

        self.$bar.animate(
            self.options.animation.open,
            self.options.animation.speed,
            self.options.animation.easing,
            function () {
                if (self.options.callback.afterShow) self.options.callback.afterShow.apply(self);
                self.showing = false;
                self.shown = true;
            });

        // If noty is have a timeout option
        if (self.options.timeout)
            self.$timeout = setTimeout(function () {
                self.close();
            }, self.options.timeout);

        return notification;
    };

    // overriding show method of '$.notyRenderer'
    $.notyRenderer.show = function (notification) {
        if (notification.options.modal) {
            $.notyRenderer.createModalFor(notification);
            $.notyRenderer.setModalCount(+1);
        }

        // Where is the container?
        if (notification.options.custom) {
            if (notification.options.custom.find(notification.options.layout.container.selector).length === 0) {
                notification.options.custom.append($(notification.options.layout.container.object).addClass('layoutContainer'));
            } else {
                notification.options.custom.find(notification.options.layout.container.selector).removeClass('layoutContainer');
            }
        } else {
            if ($(notification.options.layout.container.selector).length === 0) {
                $('body').append($(notification.options.layout.container.object).addClass('layoutContainer'));
            } else {
                $(notification.options.layout.container.selector).removeClass('layoutContainer');
            }
        }

        $.notyRenderer.setLayoutCountFor(notification, +1);

        // customized show method
        customizedShow(notification);
    };

    // Fix for 'modal option with custom css theme', which is fixed in release 2.2.2.
    // Remove this once upgraded to Noty 2.2.2
    $.notyRenderer.createModalFor = function (notification) {
        if ($('.noty_modal').length === 0) {
            var modal = $('<div/>').addClass('noty_modal').addClass(notification.options.theme).data('noty_modal_count', 0);

            if (notification.options.theme.modal && notification.options.theme.modal.css)
                modal.css(notification.options.theme.modal.css);

            modal.prependTo($('body')).fadeIn('fast');
        }
    };
})(jQuery);

/*******************************************************************************/
/** Customizing JavaScript for noty bottom layout (bottom.js)                 **/
/*******************************************************************************/
;(function($) {

    $.noty.layouts.bottom = {
        name: 'bottom',
        options: {},
        container: {
            object: '<ul id="noty_bottom_layout_container" />',
            selector: 'ul#noty_bottom_layout_container',
            style: function() {
                $(this).css({
                    //
                });
            }
        },
        parent: {
            object: '<li />',
            selector: 'li',
            css: {}
        },
        css: {
            display: 'none'
        },
        addClass: ''
    };

})(jQuery);