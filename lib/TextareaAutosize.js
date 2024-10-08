'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * <TextareaAutosize />
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactProptypes = require('react-proptypes');

var _reactProptypes2 = _interopRequireDefault(_reactProptypes);

var _calculateNodeHeight = require('./calculateNodeHeight');

var _calculateNodeHeight2 = _interopRequireDefault(_calculateNodeHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var emptyFunction = function emptyFunction() {};

var TextareaAutosize = (_temp = _class = function (_React$Component) {
  _inherits(TextareaAutosize, _React$Component);

  function TextareaAutosize(props) {
    _classCallCheck(this, TextareaAutosize);

    var _this = _possibleConstructorReturn(this, (TextareaAutosize.__proto__ || Object.getPrototypeOf(TextareaAutosize)).call(this, props));

    _this.state = {
      height: null,
      minHeight: -Infinity,
      maxHeight: Infinity
    };
    _this._rootDOMNode = null;
    _this._onChange = _this._onChange.bind(_this);
    _this._resizeComponent = _this._resizeComponent.bind(_this);
    _this._onRootDOMNode = _this._onRootDOMNode.bind(_this);
    return _this;
  }

  _createClass(TextareaAutosize, [{
    key: 'render',
    value: function render() {
      // Remove unsupported <textarea> props
      var _props = this.props,
          valueLink = _props.valueLink,
          useCacheForDOMMeasurements = _props.useCacheForDOMMeasurements,
          minRows = _props.minRows,
          onHeightChange = _props.onHeightChange,
          props = _objectWithoutProperties(_props, ['valueLink', 'useCacheForDOMMeasurements', 'minRows', 'onHeightChange']);

      props = _extends({}, props);
      if ((typeof valueLink === 'undefined' ? 'undefined' : _typeof(valueLink)) === 'object') {
        props.value = this.props.valueLink.value;
      }
      props.style = _extends({}, props.style, {
        height: this.state.height
      });
      var maxHeight = Math.max(props.style.maxHeight ? props.style.maxHeight : Infinity, this.state.maxHeight);
      if (maxHeight < this.state.height) {
        props.style.overflow = 'hidden';
      }
      return _react2.default.createElement('textarea', _extends({}, props, {
        onChange: this._onChange,
        ref: this._onRootDOMNode
      }));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._resizeComponent(this.props.value);
      window.addEventListener('resize', this._resizeComponent);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Re-render with the new content then recalculate the height as required.
      this._resizeComponent(nextProps.value);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // Invoke callback when old height does not equal to new one.
      if (this.state.height !== prevState.height) {
        this.props.onHeightChange(this.state.height);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove any scheduled events to prevent manipulating the node after it's
      // been unmounted.
      window.removeEventListener('resize', this._resizeComponent);
    }
  }, {
    key: '_onRootDOMNode',
    value: function _onRootDOMNode(node) {
      this._rootDOMNode = node;
    }
  }, {
    key: '_onChange',
    value: function _onChange(e) {
      this._resizeComponent(this.props.value);
      var _props2 = this.props,
          valueLink = _props2.valueLink,
          onChange = _props2.onChange;

      if (valueLink) {
        valueLink.requestChange(e.target.value);
      } else {
        onChange(e);
      }
    }
  }, {
    key: '_resizeComponent',
    value: function _resizeComponent(newValue) {
      var useCacheForDOMMeasurements = this.props.useCacheForDOMMeasurements;

      var calc = (0, _calculateNodeHeight2.default)(this._rootDOMNode, newValue, useCacheForDOMMeasurements, this.props.rows || this.props.minRows, this.props.maxRows);
      this.setState(calc);
    }

    /**
     * Read the current value of <textarea /> from DOM.
     */

  }, {
    key: 'focus',


    /**
     * Put focus on a <textarea /> DOM element.
     */
    value: function focus() {
      this._rootDOMNode.focus();
    }

    /**
     * Shifts focus away from a <textarea /> DOM element.
     */

  }, {
    key: 'blur',
    value: function blur() {
      this._rootDOMNode.blur();
    }
  }, {
    key: 'value',
    get: function get() {
      return this._rootDOMNode.value;
    }

    /**
     * Set the current value of <textarea /> DOM node.
     */
    ,
    set: function set(val) {
      this._rootDOMNode.value = val;
    }

    /**
     * Read the current selectionStart of <textarea /> from DOM.
     */

  }, {
    key: 'selectionStart',
    get: function get() {
      return this._rootDOMNode.selectionStart;
    }

    /**
     * Set the current selectionStart of <textarea /> DOM node.
     */
    ,
    set: function set(selectionStart) {
      this._rootDOMNode.selectionStart = selectionStart;
    }

    /**
     * Read the current selectionEnd of <textarea /> from DOM.
     */

  }, {
    key: 'selectionEnd',
    get: function get() {
      return this._rootDOMNode.selectionEnd;
    }

    /**
     * Set the current selectionEnd of <textarea /> DOM node.
     */
    ,
    set: function set(selectionEnd) {
      this._rootDOMNode.selectionEnd = selectionEnd;
    }
  }]);

  return TextareaAutosize;
}(_react2.default.Component), _class.propTypes = {
  /**
   * Current textarea value.
   */
  value: _reactProptypes2.default.string,

  /**
   * Callback on value change.
   */
  onChange: _reactProptypes2.default.func,

  /**
   * Callback on height changes.
   */
  onHeightChange: _reactProptypes2.default.func,

  /**
   * Try to cache DOM measurements performed by component so that we don't
   * touch DOM when it's not needed.
   *
   * This optimization doesn't work if we dynamically style <textarea />
   * component.
   */
  useCacheForDOMMeasurements: _reactProptypes2.default.bool,

  /**
   * Minimal numbder of rows to show.
   */
  rows: _reactProptypes2.default.number,

  /**
   * Alias for `rows`.
   */
  minRows: _reactProptypes2.default.number,

  /**
   * Maximum number of rows to show.
   */
  maxRows: _reactProptypes2.default.number
}, _class.defaultProps = {
  onChange: emptyFunction,
  onHeightChange: emptyFunction,
  useCacheForDOMMeasurements: false
}, _temp);
exports.default = TextareaAutosize;
