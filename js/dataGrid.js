/*******************************************
 * File Name : dataGrid.js
 * Author : May
 * Create Date : 2017/4/13
 * Description :
 ******************************************/

(function ($) {
  "use strict";

  //
  var sprintf = function (str) {
    var args = arguments,
      flag = true,
      i = 1;

    str = str.replace(/%s/g, function () {
      var arg = args[i++];

      if (typeof arg === 'undefined') {
        flag = false;
        return '';
      }
      return arg;
    });
    return flag ? str : '';
  };

  /**
   * dataGrid object
   * @param el
   * @param options
   * @constructor
   */
  var DataGrid = function (el, options) {
    this.$el = $(el);
    this.options = options;

    this.init();
  };

  // PRIVATE FUNCTION DEFINITION BEGIN
  // ---------------------------------

  DataGrid.prototype.init = function () {

    this.initContainer();
    this.initHeader();
    this.initBody();

  };

  DataGrid.prototype.initContainer = function () {
    var container = $([
      "<div class=\"t-toolbar\"></div>",
      "<div class=\"t-header\">",
      "<table><thead></thead></table>",
      "</div>",
      "<div class=\"t-body\">",
      "<table><tbody></tbody></table>",
      "</div>",
      "<div class=\"t-loading\"></div>",
      "<div class=\"t-footer\"></div>",
      "<div class=\"t-pagination\"></div>"
    ].join(""));

    this.$el.append(container);
    this.$header = this.$el.find(".t-header");
    this.$body = this.$el.find(".t-body");
    this.$footer = this.$el.find(".t-footer");
    this.$pagination = this.$el.find(".t-pagination");

    this.$el.addClass("t-container");
  };

  DataGrid.prototype.initHeader = function () {
    this.columns = this.options.columns;
    this.$thead = this.$header.find(">table>thead");
    if (!this.columns.length) {
      // TODO: NO COLUMNS
      return;
    }

    var ths = [];

    $.each(this.columns, function (ind, obj) {
      ths.push("<th",
        sprintf(" col-index=%s", ind),
        sprintf(" title='%s'", obj["tooltip"]),
        sprintf(" property='%s'", obj["property"])
      );
      ths.push(">");
      ths.push(obj["text"]);
      ths.push("</th>");
    });

    this.$thead.append(["<tr>",
      ths.join(""),
      "</tr>"].join(""));
  };

  DataGrid.prototype.initBody = function () {
    this.$tbody = this.$body.find(">table>tbody");
    var that = this,
      html = [],
      tbody = this.$tbody;
    if(!this.options.data){
      return;
    }
    $.get(this.options.data,function (result) {
      for (var i = 0; i < result.length; i++) {
        html.push("<tr>");
        for (var j = 0; j < that.columns.length; j++) {
          html.push("<td>",
            result[i][that.columns[j]["property"]],
            "</td>"
          );
        }
        html.push("</tr>");
      }
      tbody.append(html.join(""));
    })
  };

  // -------------------------------
  // PRIVATE FUNCTION DEFINITION END


  $.fn.dataGrid = function (option) {
    return new DataGrid(this, option);
  };

})(jQuery);
