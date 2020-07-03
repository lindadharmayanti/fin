(function($, gdpr) {
    var gdpr = gdpr || {};

    gdpr.toggle = function() {
        $(document).on('click', '.js-toggle-title, .js-toggle-moreless', function(e) {
            e.preventDefault();
            var $toggle = $(this).closest('.js-toggle');

            $toggle.toggleClass('active');

            if ($toggle.hasClass('active')) {
                $toggle.find('.js-toggle-content').slideDown(300);
                $toggle.find('.js-toggle-moreless').text('Read Less');
            } else {
                $toggle.find('.js-toggle-content').slideUp(300);
                $toggle.find('.js-toggle-moreless').text('Find out more');
            }
        });
    };

    gdpr.submitPopup = function() {
        var $form;
			
		
        function form_submit($form, cbFunc) {
            var id = $form.find('input[name="_wpcf7"]').val();
            var unitTag = $form.find('input[name="_wpcf7_unit_tag"]').val();

            var url = gdpr.site_url + '/wp-json/contact-form-7/v1/contact-forms/' + id + '/feedback';

            $form.find('.wpcf7-not-valid-tip').remove();
            $form.find('#subscribe-result').attr('class', '').html('');

            $form.find('.ajax-loader').css('visibility', 'visible');


            jQuery.post(url,
                $form.serialize() + "&_wpcf7_is_ajax_call=1&_wpcf7=" + id + "&_wpcf7_request_ver=" + jQuery.now(),
                function(data) {

                    if (typeof cbFunc == 'function') {
                        cbFunc(data);
                    }

                }, 'json'
            );
        }

        function showResultForm(data) {
            $(data.into).find('.ajax-loader').css({ 'visibility': 'hidden' });
            var classes = '';
            if (data.status == 'validation_failed') {
                classes = 'error';
                if (data.invalidFields.length) {
                    $.each(data.invalidFields, function(indx, el) {
                        $(el.into, data.into).append('<span role="alert" class="wpcf7-not-valid-tip">The field is required.</span>');
                    });
                }
            } else if (data.status == 'mail_failed') {
                classes = 'error';
            } else if (data.status == 'mail_sent') {
                classes = 'success';
            } else if (data.status == 'spam') {
                classes = 'error';
            }

            $(data.into).find('.dialog .result').removeClass('error success').addClass(classes).html(data.message);

            if (data.status == 'mail_sent') {
                if ($(data.into).find('[name="redirect_url"]').val()) {
                    window.location.href = $(data.into).find('[name="redirect_url"]').val();
                }
            }
        }

        $('.submit-btn').click(function(e) {

            e.preventDefault();


            if ($(this).attr('type') == 'submit')
                return false;

            var button_label = $(this).val();
            $(this).val(button_label + '...');
            var self = this;
            $form = $(self).closest('form');

            form_submit($form, function(data) {
                $(self).val(button_label);

                if (data.hasOwnProperty("invalidFields") && data.invalidFields.length == 1) {
                    // show popup
                    var $dialog = $form.find('.dialog');

                    $dialog.find('.ajax-loader').css({ 'visibility': 'hidden' });

                    $form.find('.dialog').find('.result').html('');

                    $form.find('.dialog').css({ opacity: 0 });

                    $form.find('.dialog').find('[name="user-agree[]"]').next('.wpcf7-list-item-label').html('I agree to <a href="' + gdpr.privacy_url + '" target="_blank">Privacy Policy</a>.')
                    $form.find('.dialog .privacy-btn').attr('href', gdpr.privacy_url).attr('target', '_blank');

					$form.find('.privacy-btn').attr('href', gdpr.privacy_url).attr('target', '_blank');
					
                    $dialog.css({
                        'width': $(window).width(),
                        'height': $(window).height(),
                        'margin-top': -$dialog.position().top + 'px',
                        'margin-left': -$dialog.position().left + 'px',
                    });

                    $form.find('.dialog').removeClass('hide').addClass('show');
					$dialog.css({
					  'width': $(window).width(),
					  'height': $(window).height(),
					  'margin-top' : - $dialog.position().top + 'px',
					  'margin-left' : - $dialog.position().left + 'px',
					});					
					

                    if($form.closest('.description-slide').length) {
                         $dialog.css({
                              'width': $(window).width(),
                              'height': $(window).height(),
                              'margin-top' : - $dialog.position().top + 'px',
                              'margin-left' : - $dialog.position().left + 'px',
            
                          });
                         $('body').css('overflow', 'hidden');
                    }

                    $dialog.css({ opacity: 1 });
                } else {
                    showResultForm(data);
                }

            });

        });

        $('.btn-close', '.dialog').on('click', function() {
            $('.dialog').addClass('hide').removeClass('show');
            $('body').css('overflow', 'auto');
        });

        $('input[type="submit"]', '.dialog').click(function(e) {
            e.preventDefault();

            var self = this;

            $form = $(self).closest('form');

            form_submit($form, function(data) {

                showResultForm(data);

            });

            return false;

        });

        $(document).on('click', function(event) {
            // event.preventDefault();
            var self = this;
            var $currentTarget = $(event.target);

            if ($currentTarget.hasClass('small-dialog') || $currentTarget.closest('.small-dialog').length) {

            } else {
                $('body').find('.dialog.show').addClass('hide').removeClass('show');
                $('body').css('overflow', 'auto');
            }
        });
    };

    $(function(){
      gdpr.toggle();
      gdpr.submitPopup();
    });
})(jQuery, gdpr)
