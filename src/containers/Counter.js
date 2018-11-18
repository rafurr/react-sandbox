import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { TitleBar, LeftDrawer } from "../components";

import { openLeftDrawer, closeLeftDrawer } from "../reducers/view";

import { increment, decrement, toggleDescription } from "../reducers/counter";

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
  leftDrawerOpen: state.view.leftDrawerOpen,
  showDescription: state.counter.showDescription
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openLeftDrawer,
      closeLeftDrawer,
      increment,
      decrement,
      toggleDescription
    },
    dispatch
  );

const styles = {
  root: {
    height: "100vh",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    background: "#F5F5F5"
  },
  fixedTop: {
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1000
  },
  scrollableContainer: {
    top: 0,
    left: 0,
    marginTop: 56,
    position: "absolute",
    width: "100%",
    background: "#F5F5F5"
  },
  container: {
    margin: 10,
    background: "#F5F5F5"
  },
  button: {
    marginRight: 10,
    width: 180
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    cursor: "pointer"
  }
};

class Counter extends Component {
  handleToggleDescriptionClick = () => {
    this.props.toggleDescription();
  };

  render() {
    const classes = this.props.classes;
    // console.log(this.props);

    const tb = (
      <div className={classes.fixedTop}>
        <TitleBar title="Counter" onOpenDrawer={this.props.openLeftDrawer} />
      </div>
    );

    const ld = (
      <LeftDrawer
        open={this.props.leftDrawerOpen}
        history={this.props.history}
        onRequestClose={this.props.closeLeftDrawer}
        onClick={this.props.closeLeftDrawer}
      />
    );

    return (
      <div className={classes.root}>
        {tb}
        <div className={classes.scrollableContainer}>
          <div className={classes.container}>
            <h2
              className={classes.title}
              onClick={this.handleToggleDescriptionClick}
            >
              Counter
            </h2>
            {this.props.showDescription && (
              <div>
                <p>
                  Counter demonstrates how to use Redux to update state data.
                </p>
              </div>
            )}
            <p>Count: {this.props.count}</p>

            <p>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={this.props.increment}
              >
                Increment
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={this.props.decrement}
              >
                Decrement
              </Button>
            </p>
          </div>
        </div>
        {ld}
      </div>
    );
  }
}

Counter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Counter));
