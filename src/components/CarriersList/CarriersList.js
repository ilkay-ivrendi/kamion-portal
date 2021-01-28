import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./CarriersList.module.css";
import AvatarLogo from "../../assets/kamion.png";
import CarriersService from "../../services/CarriersService";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { Input, List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

const { Search } = Input;

const CarriersList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    CarriersService.getAllCarriers().then((response) =>
      setItems(response.data.data)
    );
  }, []);

  console.log("Items", items);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const onSearch = (value) => {
    console.log(items.filter((item) => item.first_name == value));
    let filteredItem = items.filter((item) => item.first_name == value);
    setItems(filteredItem);
    if (filteredItem.length === 0) {
      console.log("item is null", filteredItem);
      setItems(items);
    }
  };

  return (
    <div className={styles.CarriersList}>
      <Search
        placeholder="Kamyoncu Ismi ile Ara"
        style={{ marginTop: 16, width: 400 }}
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        style={{ marginTop: 16 }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
              <IconText
                icon={EditOutlined}
                text={
                  <Link to={{ pathname: "carrier/" + item.id, carrier: item }}>
                    Edit
                  </Link>
                }
                key="list-vertical-edit"
              />,
            ]}
            extra={<img width={272} alt="logo" src={AvatarLogo} />}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href={item.href}>{item.id}</a>}
              description={item.description}
            />
            <p style={{ width: 300, marginTop: 20 }}>
              {item.first_name} {item.last_name} <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </List.Item>
        )}
      />
    </div>
  );
};

CarriersList.propTypes = {};

CarriersList.defaultProps = {};

export default CarriersList;
