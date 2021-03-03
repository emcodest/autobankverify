function Client() {}
Client.prototype.Error = function (t, e) {
    // toastr.options = {
    //     closeButton: !0,
    //     debug: !1,
    //     newestOnTop: !1,
    //     progressBar: !0,
    //     positionClass: "toast-top-right",
    //     preventDuplicates: !1,
    //     onclick: null,
    //     showDuration: "5000",
    //     hideDuration: "5000",
    //     timeOut: "5000",
    //     extendedTimeOut: "5000",
    //     showEasing: "swing",
    //     hideEasing: "linear",
    //     showMethod: "fadeIn",
    //     hideMethod: "fadeOut"
    // }, toastr.error(e, t)
    vtoast("fa fa-warning", "", t, "error", "topRight")
}, Client.prototype.Success = function (t, e) {
    // toastr.options = {
    //     closeButton: !0,
    //     debug: !1,
    //     newestOnTop: !1,
    //     progressBar: !0,
    //     positionClass: "toast-top-right",
    //     preventDuplicates: !1,
    //     onclick: null,
    //     showDuration: "5000",
    //     hideDuration: "5000",
    //     timeOut: "5000",
    //     extendedTimeOut: "5000",
    //     showEasing: "swing",
    //     hideEasing: "linear",
    //     showMethod: "fadeIn",
    //     hideMethod: "fadeOut"
    // }, toastr.success(e, t)
    vtoast("fa fa-warning", "", t, "success", "topRight")
}, Client.prototype.Info = function (t, e) {
    // toastr.options = {
    //     closeButton: !0,
    //     debug: !1,
    //     newestOnTop: !1,
    //     progressBar: !1,
    //     positionClass: "toast-top-right",
    //     preventDuplicates: !1,
    //     onclick: null,
    //     showDuration: "5000",
    //     hideDuration: "5000",
    //     timeOut: "5000",
    //     extendedTimeOut: "5000",
    //     showEasing: "swing",
    //     hideEasing: "linear",
    //     showMethod: "fadeIn",
    //     hideMethod: "fadeOut"
    // }, toastr.info(e, t)
    vtoast("fa fa-warning", "", t, "info", "topRight")
}, Client.prototype.Ajax = function (t, e, o, n) {
    var i = 0;
    $.ajax({
        type: "POST",
        url: t,
        data: e,
        dataType: o,
        beforeSend: function () {
            _lb.loading = !0
            //window.timerout = setInterval(function () {
            // (i += 10) > 120 && (
            //  alert("Timeout. Reloading"), window.location.href = window.location.href.//toString())
            // }, 1e4)
        },
        completed: function () {
            _lb.loading = !1
        },
        success: function (t) {
            clearInterval(window.timerout), _lb.loading = !1, n(t), t.error ? _app.Error(t.message) : t.success && _app.Success(t.message)
        },
        error: function (t) {}
    })
}, Client.prototype.Dialog = function (t, e) {
    $(".modal-body").load(t, function (t) {
        $("#modal-id").modal("show"), e(t)
    })
}, Client.prototype.GetAPI = function (t, e) {
    return "/server/" + t + "/" + e
}, Client.prototype.GetAuthURL = function (t, e) {
    return "/server/auth/" + t + "/" + e
}, Client.prototype.ArrayDiff = function (t, e) {
    for (var o = [], n = [], i = 0; i < t.length; i++) o[t[i]] = !0;
    for (i = 0; i < e.length; i++) o[e[i]] ? delete o[e[i]] : o[e[i]] = !0;
    for (var a in o) n.push(a);
    return n
}, Client.prototype.ListDT = function (t, e) {
    return $.fn.dataTable.isDataTable("#" + e.id) && $("#" + e.id).DataTable().destroy(), $("#" + e.id).DataTable({
        order: [
            [0, "desc"]
        ],
        ajax: {
            url: t,
            type: "post",
            dataSrc: "source",
            data: e.data
        },
        columns: e.cols
    })
}, Client.prototype.Wait = function (t) {
    $(".message").html(t)
}, Client.prototype.unWait = function () {
    $(".message").html("")
}, Client.prototype.ListDToffline = function (t) {
    $.fn.dataTable.isDataTable("#" + t.id) && $("#" + t.id).DataTable().destroy(), $("#" + t.id).DataTable({
        data: t.data,
        columnDefs: [t.col_width],
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            className: "btn-sm btn-primary",
            titleAttr: "copy to clipboard",
            text: "Copy to clipboard",
            init: function (t, e, o) {
                $(e).removeClass("dt-button")
            }
        }, {
            extend: "csvHtml5",
            className: "btn-sm btn-success",
            titleAttr: "export to csv",
            text: "Export",
            init: function (t, e, o) {
                $(e).removeClass("dt-button")
            }
        }]
    })
}, $(document).on("click", ".click", function (ex) {
    var t = $(this).attr("func"),
        e = $(this).attr("params"),
        o = methods[t];
    "function" == typeof o ? o.apply(null, [e, $(this), ex]) : alert("Not Implemented")
});
$(document).on("change", ".change", function (ex) {
    //alert(dashboard_x)
    var func = $(this).attr("func")
    var params = $(this).attr("params")
    //var fn = window[func]
    var fn = methods[func]
    if (typeof fn != "function") {
        alert("Not Implemented")
        return
    }
    fn.apply(null, [params, $(this), ex])

})

var _app = new Client;

function forceDownload(href) {
    var anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = href;
    document.body.appendChild(anchor);
    anchor.click();
}

function TimeZone() {

    return '<select class ="form-control count_zone_x timezone" name="count_zone" class="form-control"><option value="-12.0">(GMT -12:00)</option><option value="-11.0">(GMT -11:00) Midway Island</option><option value="-10.0">(GMT -10:00) Hawaii</option><option value="-9.0">(GMT -9:00)</option><option value="-8.0">(GMT -8:00) Alaska</option><option value="-7.0">(GMT -7:00) Pacific Time (PST)</option><option value="-6.0">(GMT -6:00) Mountain Time(MST), Mexico City</option><option value="-5.0">(GMT -5:00) EST, Central Time, Bogota, Lima</option><option value="-4.0">(GMT -4:00) EDT</option><option value="-3.5">(GMT -3:30)</option><option value="-3.0">(GMT -3:00) Atlantic Time, Brazil Eastern, Buenos Aires</option><option value="-2.0">(GMT -2:00)</option><option value="-1.0">(GMT -1:00)</option><option value="0.0">(GMT/UTC)</option><option value="1.0">(GMT +1:00 hour) BST, London, Brussels, Copenhagen, Madrid, Paris</option><option value="2.0">(GMT +2:00) South Africa</option><option value="3.0">(GMT +3:00) Kaliningrad, Baghdad, Riyadh</option><option value="3.5">(GMT +3:30)</option><option value="4.0">(GMT +4:00) Moscow, Abu Dhabi, Muscat</option><option value="4.5">(GMT +4:30) Tehran, Kabul</option><option value="5.0">(GMT +5:00) Islamabad, Karachi, Tashkent</option><option value="5.5">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option><option value="5.75">(GMT +5:45) Kathmandu</option><option value="6.0">(GMT +6:00) Almaty, Dhaka</option><option value="7.0">(GMT +7:00) Bangkok, Hanoi, Jakarta</option><option value="8.0">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option><option value="9.0">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option><option value="9.5">(GMT +9:30) Adelaide, Darwin</option><option value="10.0">(GMT +10:00) Eastern Australia, Guam</option><option value="11.0">(GMT +11:00) Vladivostok, Magadan, Solomon Islands, New Caledonia</option><option value="12.0">(GMT +12:00) Fiji, Kamchatka</option></select>'
}
function Init(){
    $(".prevent-default").click(function(e){
        e.preventDefault()
    })
}
function Spin(_btn){
    window.__spin = _btn
    window.__unspin = _btn.html()
    _btn.html('<div class="loader"></div>')
}
function UnSpin(){
    window.__spin.html(window.__unspin)
}

$(document).ready(function(){
    
    Init()




})