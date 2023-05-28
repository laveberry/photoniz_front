import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Alert,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Developer() {
  const notificationAlert = React.useRef();
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Now UI Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7
    };
    notificationAlert.current.notificationAlert(options);
  };
  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h2 className="title">개발자</h2>
            <p className="category">
              Please Checkout{" "}
              <a
                href="https://github.com/creativetimofficial/react-notification-alert"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Full Documentation
              </a>
              .
            </p>
          </div>
        }
      />
      <div className="content">
        <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col md={6} xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">김다혜</CardTitle>
              </CardHeader>
              <CardBody>
                <Alert color="info">
                  <span>010-9901-****</span>
                </Alert>
                <Alert
                  color="info"
                  className="alert-with-icon"
                  isOpen={true}
                  toggle={() => {}}
                >
                  <span
                    data-notify="icon"
                    className="now-ui-icons ui-1_bell-53"
                  />
                  <span data-notify="message">
                    여기다가 적어볼까요
                    기획 / 프론트개발 <br />
                    작업페이지
                  </span>
                </Alert>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">김성준</CardTitle>
              </CardHeader>
              <CardBody>
                가나다라마바사 <br />
                인프라 세팅 등등등등

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Developer;