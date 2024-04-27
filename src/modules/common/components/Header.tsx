import React from 'react';
import { Link } from "react-router-dom";
import '../assets/header.scss';

function Header() {
  
  return (
    <header id="root-header" className="header-page">
      <div className="container header-container">
        {/* <Row justify="space-between" align="middle"> */}
          {/* <Col span={4}><img className="header-logo" src="https://static.mediacdn.vn/VCCorp/Images/vccorp-15b8528c47c28f0b.png" alt="logo" /></Col>
          <Col span={20}>
            <Row justify="end" align="middle" gutter={16}>
              <Col flex="100px">
                <Link to="/"  className="header-link">Đề bài</Link>
              </Col>
              <Col flex="100px">
                <Link to="/demo" className="header-link">Demo</Link>
              </Col>
            </Row>
          </Col> */}
        {/* </Row> */}
      </div>
    </header>
  );
}

export default React.memo(Header);