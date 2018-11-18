import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import HomeIcon from "mdi-react/HomeOutlineIcon";

import "../reducers/view";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const styles = {
  root: {
    height: "100vh",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    background: "#F5F5F5"
  },
  container: {
    paddingLeft: 20
  },
  title: {
    // paddingTop: 10,
    marginBottom: 5
  },
  subTitle: {
    marginTop: 20,
    marginBottom: 20
  },
  spacer: {
    marginRight: 10
  }
};

class Error404 extends Component {
  render() {
    const classes = this.props.classes;

    const show = true;

    return (
      <div id="error-404-view" className={classes.root}>
        {show && (
          <div id="error-404-container" className={classes.container}>
            <h2 className={classes.title}>Error 404 - Page Not Found</h2>
            <h3 className={classes.subTitle}>Go Gators or Go Home</h3>
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.props.history.push("/")}
              >
                <HomeIcon /> Home
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Error404.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Error404));
