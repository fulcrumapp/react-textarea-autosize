/**
 * <TextareaAutosize />
 */

import React from 'react';
import PropTypes from 'react-proptypes';
import calculateNodeHeight from './calculateNodeHeight';

const emptyFunction = function() {};

export default class TextareaAutosize extends React.Component {

  static propTypes = {
    /**
     * Current textarea value.
     */
    value: PropTypes.string,

    /**
     * Callback on value change.
     */
    onChange: PropTypes.func,

    /**
     * Callback on height changes.
     */
    onHeightChange: PropTypes.func,

    /**
     * Try to cache DOM measurements performed by component so that we don't
     * touch DOM when it's not needed.
     *
     * This optimization doesn't work if we dynamically style <textarea />
     * component.
     */
    useCacheForDOMMeasurements: PropTypes.bool,

    /**
     * Minimal numbder of rows to show.
     */
    rows: PropTypes.number,

    /**
     * Alias for `rows`.
     */
    minRows: PropTypes.number,

    /**
     * Maximum number of rows to show.
     */
    maxRows: PropTypes.number
  }

  static defaultProps = {
    onChange: emptyFunction,
    onHeightChange: emptyFunction,
    useCacheForDOMMeasurements: false
  }

  constructor(props) {
    super(props);
    this.state = {
      height: null,
      minHeight: -Infinity,
      maxHeight: Infinity
    };
    this._rootDOMNode = null;
    this._onChange = this._onChange.bind(this);
    this._resizeComponent = this._resizeComponent.bind(this);
    this._onRootDOMNode = this._onRootDOMNode.bind(this);
  }

  render() {
    // Remove unsupported <textarea> props
    let {valueLink,
         useCacheForDOMMeasurements,
         minRows,
         onHeightChange,
         ...props} = this.props;

    props = {...props};
    if (typeof valueLink === 'object') {
      props.value = this.props.valueLink.value;
    }
    props.style = {
      ...props.style,
      height: this.state.height
    };
    let maxHeight = Math.max(
      props.style.maxHeight ? props.style.maxHeight : Infinity,
      this.state.maxHeight);
    if (maxHeight < this.state.height) {
      props.style.overflow = 'hidden';
    }
    return (
      <textarea
        {...props}
        onChange={this._onChange}
        ref={this._onRootDOMNode}
        />
    );
  }

  componentDidMount() {
    this._resizeComponent(this.props.value);
    window.addEventListener('resize', this._resizeComponent);
  }

  componentWillReceiveProps(nextProps) {
    // Re-render with the new content then recalculate the height as required.
    this._resizeComponent(nextProps.value);
  }

  componentDidUpdate(prevProps, prevState) {
    // Invoke callback when old height does not equal to new one.
    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height);
    }
  }

  componentWillUnmount() {
    // Remove any scheduled events to prevent manipulating the node after it's
    // been unmounted.
    window.removeEventListener('resize', this._resizeComponent);
  }

  _onRootDOMNode(node) {
    this._rootDOMNode = node;
  }

  _onChange(e) {
    this._resizeComponent(this.props.value);
    let {valueLink, onChange} = this.props;
    if (valueLink) {
      valueLink.requestChange(e.target.value);
    } else {
      onChange(e);
    }
  }

  _resizeComponent(newValue) {
    let {useCacheForDOMMeasurements} = this.props;
    const calc = calculateNodeHeight(
      this._rootDOMNode,
      newValue,
      useCacheForDOMMeasurements,
      this.props.rows || this.props.minRows,
      this.props.maxRows);
    this.setState(calc);
  }

  /**
   * Read the current value of <textarea /> from DOM.
   */
  get value(): string {
    return this._rootDOMNode.value;
  }

  /**
   * Set the current value of <textarea /> DOM node.
   */
  set value(val) {
    this._rootDOMNode.value = val;
  }

  /**
   * Read the current selectionStart of <textarea /> from DOM.
   */
  get selectionStart(): number {
    return this._rootDOMNode.selectionStart;
  }

  /**
   * Set the current selectionStart of <textarea /> DOM node.
   */
  set selectionStart(selectionStart: number) {
    this._rootDOMNode.selectionStart = selectionStart;
  }

  /**
   * Read the current selectionEnd of <textarea /> from DOM.
   */
  get selectionEnd(): number {
    return this._rootDOMNode.selectionEnd;
  }

  /**
   * Set the current selectionEnd of <textarea /> DOM node.
   */
  set selectionEnd(selectionEnd: number) {
    this._rootDOMNode.selectionEnd = selectionEnd;
  }

  /**
   * Put focus on a <textarea /> DOM element.
   */
  focus() {
    this._rootDOMNode.focus();
  }

  /**
   * Shifts focus away from a <textarea /> DOM element.
   */
  blur() {
    this._rootDOMNode.blur();
  }

}
