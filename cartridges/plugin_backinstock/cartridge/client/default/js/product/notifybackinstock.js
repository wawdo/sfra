'use strict';
module.exports = function () {
    $('form.modal-subscribe-form').submit(function (e) {
        var form = $(this);
        e.preventDefault();
        var url = form.attr('action');
        form.spinner().start();
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: form.serialize(),
            success: function (data) {
                form.spinner().stop();
                if (data.error) {
                    $('.invalid-feedback').empty().append(data.msg).show();
                } else {
                    $('.invalid-feedback').empty();
                    $('.succ-msg').empty().append(data.msg).show();
                }
            },
            error: function (err) {
                form.spinner().stop();
            }
        });
        return false;
    });
};
