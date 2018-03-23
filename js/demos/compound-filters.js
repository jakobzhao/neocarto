'use strict';

var Shuffle = window.Shuffle;

var Demo = function (element) {
  this.types = Array.from(document.querySelectorAll('.js-types input'));
  this.charts = Array.from(document.querySelectorAll('.js-charts button'));

  this.shuffle = new Shuffle(element, {
    easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
    sizer: '.the-sizer',
  });

  this.filters = {
    types: [],
    charts: [],
  };

  this._bindEventListeners();
};

/**
 * Bind event listeners for when the filters change.
 */
Demo.prototype._bindEventListeners = function () {
  this._onTypeChange = this._handleTypeChange.bind(this);
  this._onChartChange = this._handleChartChange.bind(this);

  this.types.forEach(function (input) {
    input.addEventListener('change', this._onTypeChange);
  }, this);

  this.charts.forEach(function (button) {
    button.addEventListener('click', this._onChartChange);
  }, this);
};

/**
 * Get the values of each checked input.
 * @return {Array.<string>}
 */
Demo.prototype._getCurrentTypeFilters = function () {
  return this.types.filter(function (input) {
    return input.checked;
  }).map(function (input) {
    return input.value;
  });
};

/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
Demo.prototype._getCurrentChartFilters = function () {
  return this.charts.filter(function (button) {
    return button.classList.contains('active');
  }).map(function (button) {
    return button.getAttribute('data-value');
  });
};

/**
 * A type input check state changed, update the current filters and filte.r
 */
Demo.prototype._handleTypeChange = function () {
  this.filters.types = this._getCurrentTypeFilters();
  this.filter();
};

/**
 * A chart button was clicked. Update filters and display.
 * @param {Event} evt Click event object.
 */
Demo.prototype._handleChartChange = function (evt) {
  var button = evt.currentTarget;

  // Treat these buttons like radio buttons where only 1 can be selected.
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    this.charts.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
  }

  this.filters.charts = this._getCurrentChartFilters();
  this.filter();
};

/**
 * Filter shuffle based on the current state of filters.
 */
Demo.prototype.filter = function () {
  if (this.hasActiveFilters()) {
    this.shuffle.filter(this.itemPassesFilters.bind(this));
  } else {
    this.shuffle.filter(Shuffle.ALL_ITEMS);
  }
};

/**
 * If any of the arrays in the `filters` property have a length of more than zero,
 * that means there is an active filter.
 * @return {boolean}
 */
Demo.prototype.hasActiveFilters = function () {
  return Object.keys(this.filters).some(function (key) {
    return this.filters[key].length > 0;
  }, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */
Demo.prototype.itemPassesFilters = function (element) {
  var types = this.filters.types;
  var charts = this.filters.charts;
  var type = element.getAttribute('data-type');
  var chart = element.getAttribute('data-chart');

  // If there are active type filters and this type is not in that array.
  if (types.length > 0 && !types.includes(type)) {
    return false;
  }

  // If there are active chart filters and this chart is not in that array.
  if (charts.length > 0 && !charts.includes(chart)) {
    return false;
  }

  return true;
};

document.addEventListener('DOMContentLoaded', function () {
  window.demo = new Demo(document.querySelector('.js-shuffle'));
});
